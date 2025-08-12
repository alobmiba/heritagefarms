/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com https://*.gstatic.com https://*.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maps.googleapis.com https://*.gstatic.com https://*.google.com; img-src 'self' data: https: https://i.ytimg.com https://*.ggpht.com https://maps.gstatic.com https://*.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://api.pexels.com https://maps.googleapis.com https://*.gstatic.com https://*.google.com; frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com https://www.google.com https://*.google.com https://maps.google.com; media-src 'self' https://*.googlevideo.com;",
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://maps.googleapis.com https://*.gstatic.com https://*.google.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maps.googleapis.com https://*.gstatic.com https://*.google.com; img-src 'self' data: https: https://i.ytimg.com https://*.ggpht.com https://maps.gstatic.com https://*.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://api.pexels.com https://maps.googleapis.com https://*.gstatic.com https://*.google.com; frame-src 'self' https://www.youtube-nocookie.com https://www.youtube.com https://www.google.com https://*.google.com https://maps.google.com; media-src 'self' https://*.googlevideo.com;",
          },
        ],
      },
    ];
  },
  // No custom rewrites needed; Pexels proxy lives at /api/pexels
  productionBrowserSourceMaps: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  compress: true,
  generateEtags: false,
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
};

export default nextConfig;
