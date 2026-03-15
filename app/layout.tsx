import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { BOOKING_URL } from '@/lib/constants';
import { LOGO_URL } from '@/lib/constants';

// Preload lists for CDN media
const HERO_VIDEO_MP4 = 'https://ik.imagekit.io/l1mhaygkv/Caddy%20Cruise%20Hero%20Video.mp4/ik-video.mp4?updatedAt=1755624198810';
const CDN_PRELOAD_IMAGES: string[] = [
  // Global/logo
  LOGO_URL,
  // Our Story hero background
  'https://ik.imagekit.io/l1mhaygkv/DJI_0676%202.webp?updatedAt=1755624142125',
  // Our Story content images
  'https://ik.imagekit.io/l1mhaygkv/DJI_0703.webp?updatedAt=1755631250885',
  'https://ik.imagekit.io/l1mhaygkv/DSC_2646%202.webp?updatedAt=1755624137477',
  // Our Story gallery grid images
  'https://ik.imagekit.io/l1mhaygkv/Grid/DJI_0759.webp?updatedAt=1755624098723',
  'https://ik.imagekit.io/l1mhaygkv/Grid/DJI_0783.webp?updatedAt=1755624098417',
  'https://ik.imagekit.io/l1mhaygkv/Grid/DJI_0711.webp?updatedAt=1755624098288',
  'https://ik.imagekit.io/l1mhaygkv/Grid/DJI_0764.webp?updatedAt=1755624098240',
  'https://ik.imagekit.io/l1mhaygkv/Grid/DSC_2542.webp?updatedAt=1755624097974',
  'https://ik.imagekit.io/l1mhaygkv/Grid/DSC_2567.webp?updatedAt=1755624097260',
];

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://cruisecaddy.com'),
  title: 'Caddy Cruise - Pink Cadillac Boat Tours in Sarasota | BYOB Cruise Experience',
  description: 'Experience Sarasota Bay like never before! Join our unique BYOB cruise tours on a pink Cadillac-shaped boat. 2-hour and 4-hour tours available. Book your unforgettable adventure today!',
  keywords: 'Sarasota boat tours, BYOB cruise, pink Cadillac boat, Sarasota Bay, cruise tours Florida, unique boat experience',
  openGraph: {
    title: 'Caddy Cruise - Pink Cadillac Boat Tours in Sarasota',
    description: 'Cruise Sarasota Bay in a unique pink Cadillac boat. BYOB friendly tours with unforgettable views!',
    url: 'https://cruisecaddy.com',
    siteName: 'Caddy Cruise',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://order.caddycruise.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://order.caddycruise.com" />
        {/* Speed up ImageKit-hosted media */}
        <link rel="preconnect" href="https://ik.imagekit.io" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />

        {/* Preload critical CDN images */}
        {Array.from(new Set(CDN_PRELOAD_IMAGES)).map((src) => (
          <link key={src} rel="preload" as="image" href={src} crossOrigin="anonymous" />
        ))}
        {/* Preload hero background video */}
        <link
          rel="preload"
          as="video"
          href={HERO_VIDEO_MP4}
          crossOrigin="anonymous"
          type="video/mp4"
        />
      </head>
      <body className={inter.className}>
        {/* Setmore booking widget script (anchor rendered where needed) */}
        <Script
          id="setmore_script"
          src="https://assets.setmore.com/integration/static/setmoreIframeLive.js"
          strategy="lazyOnload"
        />
        {/* Hidden Setmore anchor to trigger in-page booking popup; href will be overwritten per service */}
        <a
          id="Setmore_button_iframe"
          href="https://order.caddycruise.com/booking/caddycruise"
          style={{ display: 'none' }}
          aria-hidden="true"
        >
          Book with Setmore
        </a>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}