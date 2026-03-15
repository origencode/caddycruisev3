import { test, expect } from '@playwright/test';
import fs from 'fs';
// Add types for TS strict mode
import type { Page, Response } from '@playwright/test';
// Removed devices import; project-level devices are configured via playwright.config

function formatBytes(n: number) {
  if (!n) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.min(Math.floor(Math.log(n) / Math.log(1024)), units.length - 1);
  return `${(n / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

function ext(url: string) {
  try {
    const u = new URL(url);
    const p = u.pathname.split('/').pop() || '';
    const dot = p.lastIndexOf('.');
    return dot >= 0 ? p.slice(dot + 1).toLowerCase() : '';
  } catch {
    const p = url.split('?')[0];
    const dot = p.lastIndexOf('.');
    return dot >= 0 ? p.slice(dot + 1).toLowerCase() : '';
  }
}

async function collectMetrics(page: Page, url: string) {
  await page.addInitScript(() => {
    // @ts-ignore
    window.__perf = { lcp: 0, cls: 0 };
    // LCP
    try {
      // @ts-ignore
      new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const last = entries[entries.length - 1] as any;
        if (last) {
          // @ts-ignore
          window.__perf.lcp = (last.renderTime || last.loadTime || 0);
        }
      }).observe({ type: 'largest-contentful-paint', buffered: true as any });
    } catch {}

    // CLS
    try {
      let clsValue = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as any[]) {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value || 0;
          }
        }
        // @ts-ignore
        window.__perf.cls = clsValue;
      }).observe({ type: 'layout-shift', buffered: true as any });
    } catch {}
  });

  const responses: { url: string; status: number; size: number }[] = [];
  page.on('response', async (resp: Response) => {
    try {
      const url = resp.url();
      const status = resp.status();
      let size = 0;
      // Prefer content-length header if present
      const cl = resp.headers()['content-length'];
      if (cl) {
        size = parseInt(cl, 10) || 0;
      } else {
        // Fallback to body length (may be 0 for some responses or large for binaries)
        const buf = await resp.body().catch(() => undefined);
        if (buf) size = buf.length;
      }
      responses.push({ url, status, size });
    } catch {}
  });

  const t0 = Date.now();
  await page.goto(url, { waitUntil: 'networkidle' });
  // Give late paints a moment to flush
  await page.waitForTimeout(250);
  const t1 = Date.now();

  const nav = await page.evaluate(() => {
    const n = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    const paints = performance.getEntriesByType('paint') as PerformanceEntry[];
    const fcp = paints.find((p) => p.name === 'first-contentful-paint');
    // @ts-ignore
    const lcp = (window.__perf?.lcp as number) || 0;
    // @ts-ignore
    const cls = (window.__perf?.cls as number) || 0;

    return {
      url: location.href,
      type: n?.type,
      dns: n ? n.domainLookupEnd - n.domainLookupStart : undefined,
      connect: n ? n.connectEnd - n.connectStart : undefined,
      ttfb: n ? n.responseStart - n.requestStart : undefined,
      response: n ? n.responseEnd - n.responseStart : undefined,
      domInteractive: n?.domInteractive,
      dcl: n?.domContentLoadedEventEnd,
      load: n?.loadEventEnd,
      fcp: fcp?.startTime,
      lcp,
      cls,
      // Total bytes may be 0 for cross-origin without TAO; most assets here are same-origin
      resourceSummary: (() => {
        const r = performance.getEntriesByType('resource') as any[];
        const totals = r.reduce(
          (acc, e) => {
            acc.count++;
            acc.transferSize += (e.transferSize || e.encodedBodySize || 0);
            acc.encodedBodySize += (e.encodedBodySize || 0);
            acc.decodedBodySize += (e.decodedBodySize || 0);
            return acc;
          },
          { count: 0, transferSize: 0, encodedBodySize: 0, decodedBodySize: 0 }
        );
        return totals;
      })(),
    };
  });

  const transferBytes = responses.reduce((sum, r) => sum + (r.size || 0), 0);
  const byType = responses.reduce<Record<string, number>>((acc, r) => {
    const e = ext(r.url);
    acc[e || ''] = (acc[e || ''] || 0) + (r.size || 0);
    return acc;
  }, {});
  const topAssets = [...responses]
    .sort((a, b) => (b.size || 0) - (a.size || 0))
    .slice(0, 8)
    .map((r) => ({ url: r.url, size: r.size }));

  const metrics = {
    nav,
    transferBytes,
    byType,
    topAssets,
    resourceCount: responses.length,
    wallClockMs: t1 - t0,
    timestamp: new Date().toISOString(),
  };

  return metrics;
}

function logMetrics(pageName: string, m: any) {
  // eslint-disable-next-line no-console
  console.log(`\n[Perf] ${pageName} @ ${m.timestamp}`);
  // eslint-disable-next-line no-console
  console.log(`  Transfer: ${formatBytes(m.transferBytes)} across ${m.resourceCount} requests`);
  // eslint-disable-next-line no-console
  console.log(
    `  TTFB: ${Math.round(m.nav.ttfb || 0)} ms | FCP: ${Math.round(m.nav.fcp || 0)} ms | LCP: ${Math.round(m.nav.lcp || 0)} ms | CLS: ${(m.nav.cls || 0).toFixed(3)}`
  );
  // eslint-disable-next-line no-console
  console.log(
    `  DCL: ${Math.round(m.nav.dcl || 0)} ms | Load: ${Math.round(m.nav.load || 0)} ms | Wall clock: ${Math.round(m.wallClockMs)} ms`
  );
  // eslint-disable-next-line no-console
  console.log('  Top assets:');
  for (const a of m.topAssets) {
    // eslint-disable-next-line no-console
    console.log(`    - ${formatBytes(a.size)}: ${a.url}`);
  }
}

async function writeJsonArtifact(name: string, data: any) {
  const outDir = 'test-results';
  try { fs.mkdirSync(outDir, { recursive: true }); } catch {}
  fs.writeFileSync(`${outDir}/${name}.json`, JSON.stringify(data, null, 2));
}

function applyBudgets(metrics: any, projectName: string, pagePath: string) {
  const isMobile = /mobile/i.test(projectName);
  const MB = 1024 * 1024;

  // Core Web Vitals budgets
  expect(metrics.nav.cls || 0).toBeLessThan(0.10);
  expect(metrics.nav.lcp || 0).toBeLessThan(2500);
  expect(metrics.nav.fcp || 0).toBeLessThan(1500);

  // Transfer budgets
  if (isMobile) {
    // With video gated on small screens, budget should stay low
    expect(metrics.transferBytes).toBeLessThan(3 * MB);
  } else {
    // Desktop: allow current video-heavy payload but cap to prevent regressions
    const desktopBudget = 13 * MB; // current ~12.3MB
    expect(metrics.transferBytes).toBeLessThan(desktopBudget);
  }
}

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Our Story', path: '/our-story' },
];

for (const p of pages) {
  test(`${p.name} performance`, async ({ page, baseURL }, testInfo) => {
    const url = (baseURL || 'http://localhost:3000') + p.path;
    const metrics = await collectMetrics(page, url);
    const project = testInfo.project.name.replace(/\s+/g, '-').toLowerCase();
    logMetrics(`${p.name} [${testInfo.project.name}]`, metrics);
    await writeJsonArtifact(`perf-${project}-${p.name.toLowerCase().replace(/\s+/g, '-')}`, metrics);

    applyBudgets(metrics, testInfo.project.name, p.path);
  });
}
