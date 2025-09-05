// Enhanced Image Optimization Utility for Heritage Farms
// Replaces Pexels integration with manual image management

// Performance optimizations are used internally

export interface OptimizedImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  srcset?: string;
  priority?: boolean;
  placeholder?: string;
  blurDataURL?: string;
}

export interface ImageMetadata {
  width: number;
  height: number;
  format: string;
  size: number;
  optimized: boolean;
}

// Image optimization configuration
export const imageConfig = {
  // Quality settings
  quality: 85,
  formats: ['webp', 'avif'] as const,
  
  // Responsive breakpoints
  breakpoints: {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
    large: 1280,
    xlarge: 1920,
  },
  
  // Optimization settings
  optimization: {
    progressive: true,
    mozjpeg: { quality: 85 },
    pngquant: { quality: [0.65, 0.9], speed: 4 },
    webp: { quality: 85 },
    avif: { quality: 85 },
  },
  
  // Caching settings
  cache: {
    maxAge: 31536000, // 1 year
    immutable: true,
  },
};

// Generate responsive image srcset
export const generateSrcSet = (
  basePath: string,
  widths: number[] = [320, 640, 768, 1024, 1280, 1920]
): string => {
  return widths
    .map(width => `${basePath}?w=${width}&q=${imageConfig.quality} ${width}w`)
    .join(', ');
};

// Generate sizes attribute for responsive images
export const generateSizes = (breakpoints: Record<string, number> = imageConfig.breakpoints): string => {
  return `(max-width: ${breakpoints.mobile}px) 100vw, (max-width: ${breakpoints.tablet}px) 50vw, (max-width: ${breakpoints.desktop}px) 33vw, 25vw`;
};

// Preload critical images
export const preloadCriticalImages = (images: OptimizedImage[]): void => {
  if (typeof window === 'undefined') return;
  
  images.forEach(image => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = image.src;
    link.type = 'image/webp';
    document.head.appendChild(link);
  });
};

// Lazy load images with intersection observer
export const setupLazyLoading = (): void => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;
  
  const imageObserver = new IntersectionObserver(
    (entries, observer) => {
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
    },
    {
      rootMargin: '50px 0px',
      threshold: 0.01,
    }
  );
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
};

// Generate blur placeholder for images
export const generateBlurPlaceholder = (width: number, height: number): string => {
  if (typeof window === 'undefined') return '';
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (ctx) {
    // Create a simple gradient placeholder
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#f0f0f0');
    gradient.addColorStop(1, '#e0e0e0');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
  }
  
  return canvas.toDataURL('image/jpeg', 0.1);
};

// Optimize image component props
export const optimizeImageProps = (
  src: string,
  alt: string,
  width: number,
  height: number,
  options: Partial<OptimizedImage> = {}
): OptimizedImage => {
  const srcset = generateSrcSet(src);
  const sizes = generateSizes();
  
  return {
    src,
    alt,
    width,
    height,
    sizes,
    srcset,
    priority: options.priority || false,
    placeholder: options.placeholder || 'blur',
    blurDataURL: options.blurDataURL || generateBlurPlaceholder(width, height),
    ...options,
  };
};

// Image compression utility
export const compressImage = async (
  file: File,
  quality: number = imageConfig.quality
): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
          },
          'image/webp',
          quality / 100
        );
      }
    };
    
    img.src = URL.createObjectURL(file);
  });
};

// Batch image optimization
export const optimizeImageBatch = async (
  images: File[],
  quality: number = imageConfig.quality
): Promise<Blob[]> => {
  const promises = images.map(img => compressImage(img, quality));
  return Promise.all(promises);
};

// Image metadata extraction
export const extractImageMetadata = (file: File): Promise<ImageMetadata> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight,
        format: file.type,
        size: file.size,
        optimized: file.type === 'image/webp' || file.type === 'image/avif',
      });
    };
    img.src = URL.createObjectURL(file);
  });
};

// Performance monitoring for images
export const monitorImagePerformance = (): void => {
  if (typeof window === 'undefined') return;
  
  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'resource' && entry.name.includes('image')) {
        console.log(`Image loaded: ${entry.name} in ${entry.duration}ms`);
      }
    });
  });
  
  observer.observe({ entryTypes: ['resource'] });
};

// Image error handling and fallback
export const handleImageError = (
  event: Event,
  fallbackSrc: string = '/branding/Images/placeholders/placeholder.jpg'
): void => {
  const img = event.target as HTMLImageElement;
  if (img.src !== fallbackSrc) {
    img.src = fallbackSrc;
  }
};

// Export optimized image utilities
export const imageOptimizer = {
  generateSrcSet,
  generateSizes,
  preloadCriticalImages,
  setupLazyLoading,
  generateBlurPlaceholder,
  optimizeImageProps,
  compressImage,
  optimizeImageBatch,
  extractImageMetadata,
  monitorImagePerformance,
  handleImageError,
  config: imageConfig,
};

export default imageOptimizer;
