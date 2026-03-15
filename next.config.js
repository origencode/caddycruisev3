/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_BOOKING_URL: 'https://order.caddycruise.com/booking/caddycruise',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
      },
    ],
  },
  // headers() not supported with `output: 'export'`
};

module.exports = nextConfig;
