import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { performanceOptimizations } from "@/lib/performance-utils";
import AppProviders from "@/components/wrappers/AppProviders";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Heritage Farms - Ontario's First Black-Led Farm",
    template: "%s | Heritage Farms"
  },
  description: "Ontario's first Black-led farm growing West African & Caribbean greens—rooted in heritage, nurtured under Canadian skies.",
  keywords: ["heritage farms", "sustainable agriculture", "West African greens", "Caribbean greens", "Ontario farm", "local produce"],
  authors: [{ name: "Heritage Farms" }],
  creator: "Heritage Farms",
  publisher: "Heritage Farms",
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
    title: "Heritage Farms - Ontario's First Black-Led Farm",
    description: "Ontario's first Black-led farm growing West African & Caribbean greens—rooted in heritage, nurtured under Canadian skies.",
    siteName: 'Heritage Farms',
    images: [
      {
        url: '/branding/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Heritage Farms - Sustainable Agriculture',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Heritage Farms - Ontario's First Black-Led Farm",
    description: "Ontario's first Black-led farm growing West African & Caribbean greens—rooted in heritage, nurtured under Canadian skies.",
    images: ['/branding/images/twitter-image.jpg'],
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
    google: 'your-google-verification-code',
  },
};

// Performance optimization component
function PerformanceOptimizations() {
  if (typeof window !== 'undefined') {
    // Initialize performance monitoring
    performanceOptimizations.performanceMonitoring.measureCoreWebVitals();
    
    // Preload critical resources
    performanceOptimizations.resourceOptimization.preconnect([
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ]);
    
    performanceOptimizations.resourceOptimization.dnsPrefetch([
      'https://maps.googleapis.com',
    ]);
    
    // Preload critical images
    performanceOptimizations.imageOptimization.preloadImages([
      '/branding/images/hero-bg.jpg',
      '/branding/images/about/hero-optimized.jpg',
    ]);
    
    // Preload critical fonts
    performanceOptimizations.fontOptimization.preloadFonts([
      '/fonts/gilroy-regular.woff2',
      '/fonts/gilroy-bold.woff2',
    ]);
  }
  
  return null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Resource hints for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/branding/images/hero-bg.jpg" as="image" />
        <link rel="preload" href="/fonts/gilroy-regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/gilroy-bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Critical CSS inlining */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS for above-the-fold content */
            body { margin: 0; font-family: 'Gilroy', sans-serif; }
            .hero-section { min-height: 100vh; background-size: cover; }
            .header { position: fixed; top: 0; width: 100%; z-index: 1000; }
            .loading { opacity: 0; transition: opacity 0.3s; }
            .loaded { opacity: 1; }
          `
        }} />
        
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Heritage Farms",
              "description": "Ontario's first Black-led farm growing West African & Caribbean greens",
              "url": "https://heritagefarms.ca",
              "logo": "https://heritagefarms.ca/branding/images/logo.png",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ontario",
                "addressCountry": "CA"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "info@heritagefarms.ca"
              },
              "sameAs": [
                "https://facebook.com/heritagefarms",
                "https://instagram.com/heritagefarms"
              ]
            })
          }}
        />
        
        {/* Performance monitoring */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Performance monitoring
              if ('PerformanceObserver' in window) {
                // LCP monitoring
                new PerformanceObserver((list) => {
                  const entries = list.getEntries();
                  const lastEntry = entries[entries.length - 1];
                  console.log('LCP:', lastEntry.startTime);
                }).observe({ entryTypes: ['largest-contentful-paint'] });
                
                // FID monitoring
                new PerformanceObserver((list) => {
                  const entries = list.getEntries();
                  entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                  });
                }).observe({ entryTypes: ['first-input'] });
              }
              
              // Image lazy loading
              if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries, observer) => {
                  entries.forEach(entry => {
                    if (entry.isIntersecting) {
                      const img = entry.target;
                      img.src = img.dataset.src;
                      img.classList.remove('lazy');
                      observer.unobserve(img);
                    }
                  });
                });
                
                document.addEventListener('DOMContentLoaded', () => {
                  document.querySelectorAll('img[data-src]').forEach(img => {
                    imageObserver.observe(img);
                  });
                });
              }
            `
          }}
        />
      </head>
      <body className="antialiased">
        <PerformanceOptimizations />
        <AppProviders>
          {children}
        </AppProviders>
        
        {/* Non-critical CSS is handled by Next.js automatically */}
        
        {/* Enhanced Service Worker registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Enhanced Service Worker registration with performance monitoring
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js', { scope: '/' })
                    .then(registration => {
                      console.log('✅ Service Worker registered successfully');
                      
                      // Handle updates
                      registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;
                        if (newWorker) {
                          newWorker.addEventListener('statechange', () => {
                            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                              console.log('🔄 New Service Worker available');
                              // You can show a notification to the user here
                            }
                          });
                        }
                      });
                    })
                    .catch(error => {
                      console.error('❌ Service Worker registration failed:', error);
                    });
                });
              }
              
              // Enhanced performance monitoring
              if ('PerformanceObserver' in window) {
                // Monitor Core Web Vitals
                const observer = new PerformanceObserver((list) => {
                  list.getEntries().forEach(entry => {
                    if (entry.entryType === 'largest-contentful-paint') {
                      console.log('📊 LCP:', Math.round(entry.startTime), 'ms');
                    } else if (entry.entryType === 'first-input') {
                      console.log('📊 FID:', Math.round(entry.processingStart - entry.startTime), 'ms');
                    } else if (entry.entryType === 'layout-shift') {
                      console.log('📊 CLS:', entry.value);
                    }
                  });
                });
                
                observer.observe({ 
                  entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] 
                });
              }
            `
          }}
        />
      </body>
    </html>
  );
}
