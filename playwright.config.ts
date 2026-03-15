const { devices } = require('@playwright/test');

module.exports = {
  testDir: 'tests',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
  ],
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    actionTimeout: 0,
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    command: 'npm run build && npm run export && npx --yes serve -s out -l 3000',
    port: 3000,
    timeout: 300000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 5'] } },
  ],
};