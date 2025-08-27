// Performance optimization utilities for Heritage Farms

// Enhanced image optimization utilities
export const imageOptimization = {
  // Preload critical images
  preloadImages: (images: string[]) => {
    if (typeof window !== 'undefined') {
      images.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        link.type = 'image/webp';
        document.head.appendChild(link);
      });
    }
  },

  // Lazy load images with intersection observer
  lazyLoadImages: () => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            const srcset = img.dataset.srcset;
            
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
            }
            
            if (srcset) {
              img.srcset = srcset;
              img.removeAttribute('data-srcset');
            }
            
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01,
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  },

  // Generate responsive image srcset
  generateSrcSet: (basePath: string, widths: number[] = [320, 640, 768, 1024, 1280, 1920]) => {
    return widths.map(width => `${basePath}?w=${width}&q=85 ${width}w`).join(', ');
  },

  // Generate sizes attribute
  generateSizes: (breakpoints: Record<string, number> = {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
    large: 1280,
  }) => {
    return `(max-width: ${breakpoints.mobile}px) 100vw, (max-width: ${breakpoints.tablet}px) 50vw, (max-width: ${breakpoints.desktop}px) 33vw, 25vw`;
  },

  // Monitor image performance
  monitorImagePerformance: () => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'resource' && entry.name.includes('image')) {
            console.log(`Image loaded: ${entry.name} in ${entry.duration}ms`);
          }
        });
      });
      
      observer.observe({ entryTypes: ['resource'] });
    }
  },

  // Generate blur placeholder
  generateBlurPlaceholder: (width: number, height: number): string => {
    if (typeof window === 'undefined') return '';
    
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#f0f0f0');
      gradient.addColorStop(1, '#e0e0e0');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    }
    
    return canvas.toDataURL('image/jpeg', 0.1);
  }
};

// Font optimization
export const fontOptimization = {
  // Preload critical fonts
  preloadFonts: (fonts: string[]) => {
    if (typeof window !== 'undefined') {
      fonts.forEach(font => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.href = font;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      });
    }
  },

  // Font display swap for better performance
  fontDisplaySwap: () => {
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Gilroy';
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  }
};

// Bundle optimization
export const bundleOptimization = {
  // Dynamic imports for code splitting
  dynamicImport: (componentName: string) => {
    return import(`@/components/${componentName}`).then(module => module.default);
  },

  // Route-based code splitting
  routeBasedSplitting: {
    about: () => import('@/app/about/page'),
    products: () => import('@/app/products/page'),
    contact: () => import('@/app/contact/page'),
    admin: () => import('@/app/admin/page')
  }
};

// Caching strategies
export const cachingStrategies = {
  // Service worker cache
  serviceWorkerCache: {
    staticAssets: ['/branding/images/', '/fonts/', '/icons/'],
    apiCache: ['/api/products', '/api/orders'],
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  },

  // Browser cache headers
  cacheHeaders: {
    static: 'public, max-age=31536000, immutable', // 1 year
    dynamic: 'public, max-age=3600, s-maxage=86400', // 1 hour browser, 1 day CDN
    api: 'public, max-age=300, s-maxage=3600' // 5 minutes browser, 1 hour CDN
  }
};

// Performance monitoring
export const performanceMonitoring = {
  // Core Web Vitals monitoring
  measureCoreWebVitals: () => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // LCP (Largest Contentful Paint)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // FID (First Input Delay)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach(entry => {
          const fidEntry = entry as PerformanceEntry & { processingStart?: number };
          if (fidEntry.processingStart) {
            console.log('FID:', fidEntry.processingStart - entry.startTime);
          }
        });
      }).observe({ entryTypes: ['first-input'] });

      // CLS (Cumulative Layout Shift)
      new PerformanceObserver((list) => {
        let cls = 0;
        const entries = list.getEntries();
        entries.forEach(entry => {
          const clsEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
          if (!clsEntry.hadRecentInput && clsEntry.value) {
            cls += clsEntry.value;
          }
        });
        console.log('CLS:', cls);
      }).observe({ entryTypes: ['layout-shift'] });
    }
  },

  // Custom performance marks
  mark: (name: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(name);
    }
  },

  measure: (name: string, startMark: string, endMark: string) => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.measure(name, startMark, endMark);
      const measure = performance.getEntriesByName(name)[0];
      console.log(`${name}:`, measure.duration);
    }
  }
};

// Resource optimization
export const resourceOptimization = {
  // Critical CSS inlining
  inlineCriticalCSS: (css: string) => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  },

  // Defer non-critical CSS
  deferNonCriticalCSS: (href: string) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.media = 'print';
    link.onload = () => {
      link.media = 'all';
    };
    document.head.appendChild(link);
  },

  // Preconnect to external domains
  preconnect: (urls: string[]) => {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = url;
      document.head.appendChild(link);
    });
  },

  // DNS prefetch for external resources
  dnsPrefetch: (urls: string[]) => {
    urls.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = url;
      document.head.appendChild(link);
    });
  }
};

// Component optimization
export const componentOptimization = {
  // Memoization for expensive calculations
  memoize: <T extends (...args: unknown[]) => unknown>(fn: T): T => {
    const cache = new Map();
    return ((...args: unknown[]) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = fn(...args);
      cache.set(key, result);
      return result;
    }) as T;
  },

  // Debounce function calls
  debounce: <T extends (...args: unknown[]) => unknown>(func: T, wait: number): T => {
    let timeout: NodeJS.Timeout;
    return ((...args: unknown[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    }) as T;
  },

  // Throttle function calls
  throttle: <T extends (...args: unknown[]) => unknown>(func: T, limit: number): T => {
    let inThrottle: boolean;
    return ((...args: unknown[]) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }) as T;
  }
};

// SEO and accessibility optimization
export const seoOptimization = {
  // Structured data
  generateStructuredData: (data: Record<string, unknown>) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  },

  // Meta tags optimization
  optimizeMetaTags: (meta: Record<string, string>) => {
    Object.entries(meta).forEach(([name, content]) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    });
  }
};

// Export all optimizations
export const performanceOptimizations = {
  imageOptimization,
  fontOptimization,
  bundleOptimization,
  cachingStrategies,
  performanceMonitoring,
  resourceOptimization,
  componentOptimization,
  seoOptimization
};
