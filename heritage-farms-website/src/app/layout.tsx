import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import ErrorBoundary from '@/components/ErrorBoundary';

const gilroy = localFont({
  src: [
    { path: '../../public/fonts/Gilroy/Gilroy-Light.woff', weight: '300', style: 'normal' },
    { path: '../../public/fonts/Gilroy/Gilroy-Extrabold.woff', weight: '800', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-gilroy',
});

export const metadata: Metadata = {
  title: {
    default: 'Heritage Farms - Authentic West African & Caribbean Produce',
    template: '%s | Heritage Farms'
  },
  description: 'Ontario\'s first Black-led farm specializing in year-round West African and Caribbean greens using sustainable greenhouse technology. Fresh, authentic heritage crops delivered to your community.',
  keywords: [
    'heritage crops',
    'West African produce',
    'Caribbean greens',
    'sustainable farming',
    'Ontario farm',
    'greenhouse farming',
    'callaloo',
    'fluted pumpkin leaves',
    'jute leaves',
    'waterleaf',
    'authentic produce',
    'cultural heritage',
    'local farming',
    'organic produce',
    'fresh vegetables'
  ],
  authors: [{ name: 'Heritage Farms' }],
  creator: 'Heritage Farms',
  publisher: 'Heritage Farms',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://heritagefarms.ca'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://heritagefarms.ca',
    title: 'Heritage Farms - Authentic West African & Caribbean Produce',
    description: 'Ontario\'s first Black-led farm specializing in year-round West African and Caribbean greens using sustainable greenhouse technology.',
    siteName: 'Heritage Farms',
    images: [
      {
        url: '/branding/Images/banner/homebanner.png',
        width: 1200,
        height: 630,
        alt: 'Heritage Farms - Fresh Heritage Crops',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Heritage Farms - Authentic West African & Caribbean Produce',
    description: 'Ontario\'s first Black-led farm specializing in year-round West African and Caribbean greens.',
    images: ['/branding/Images/banner/homebanner.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION_CODE || '',
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
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
          {/* Favicon - prefer app icons in /app over /public to avoid conflicts */}
          <link rel="icon" href="/favicon.png" type="image/png" />
          <link rel="apple-touch-icon" href="/favicon.png" />
        
        {/* Manifest for PWA */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme color */}
        <meta name="theme-color" content="#404A3D" />
        
        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Content Security Policy for Google Maps and site security */}
        <meta httpEquiv="Content-Security-Policy" content="
          default-src 'self';
          script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com https://*.gstatic.com https://*.google.com;
          style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maps.googleapis.com https://*.gstatic.com https://*.google.com;
          img-src 'self' data: https://maps.gstatic.com https://*.googleapis.com https://*.ggpht.com;
          frame-src 'self' https://www.google.com https://*.google.com;
          connect-src 'self' https://maps.googleapis.com https://*.gstatic.com https://*.google.com;
          font-src 'self' https://fonts.gstatic.com;
          object-src 'none';
          base-uri 'self';
          form-action 'self';
          frame-ancestors 'self';
          upgrade-insecure-requests;
        " />
        
        {/* Referrer Policy for external embeds */}
        <meta name="referrer" content="no-referrer-when-downgrade" />
        
        {/* Additional meta tags */}
        <meta name="application-name" content="Heritage Farms" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Heritage Farms" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#404A3D" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={gilroy.className}>
        {/* Skip to main content link for accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#EDDD5E] text-[#404A3D] px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>
        
        <main id="main-content">
          <ErrorBoundary>
            <CartProvider>
              {children}
            </CartProvider>
          </ErrorBoundary>
        </main>
      </body>
    </html>
  );
}
