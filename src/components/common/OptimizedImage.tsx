'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  imageOptimizer, 
  generateBlurPlaceholder 
} from '@/lib/image-optimizer';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty' | 'data:image/...';
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  fill?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  onLoad?: () => void;
  onError?: () => void;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  [key: string]: unknown;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'blur',
  blurDataURL,
  sizes,
  quality = 85,
  fill = false,
  style,
  onClick,
  onLoad,
  onError,
  loading = 'lazy',
  decoding = 'async',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Generate optimized image props
  const optimizedProps = imageOptimizer.optimizeImageProps(
    imgSrc,
    alt,
    width,
    height,
    {
      priority,
      placeholder,
      blurDataURL: blurDataURL || generateBlurPlaceholder(width, height),
    }
  );

  // Handle image load
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Handle image error with fallback
  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc('/branding/Images/placeholders/placeholder.jpg');
      onError?.();
    }
  };

  // Setup lazy loading for non-priority images
  useEffect(() => {
    if (!priority && typeof window !== 'undefined') {
      imageOptimizer.setupLazyLoading();
    }
  }, [priority]);

  // Monitor image performance
  useEffect(() => {
    if (typeof window !== 'undefined') {
      imageOptimizer.monitorImagePerformance();
    }
  }, []);

  // Preload critical images
  useEffect(() => {
    if (priority && typeof window !== 'undefined') {
      imageOptimizer.preloadCriticalImages([optimizedProps]);
    }
  }, [priority, optimizedProps]);

  return (
    <div 
      className={`optimized-image-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
      onClick={onClick}
    >
      <Image
        ref={imgRef}
        src={imgSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={`optimized-image ${isLoaded ? 'loaded' : 'loading'}`}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={optimizedProps.blurDataURL}
        sizes={sizes || optimizedProps.sizes}
        quality={quality}
        fill={fill}
        loading={loading}
        decoding={decoding}
        onLoad={handleLoad}
        onError={handleError}
        style={{
          transition: 'opacity 0.3s ease-in-out',
          opacity: isLoaded ? 1 : 0.8,
        }}
        {...props}
      />
      
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div 
          className="image-placeholder"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
            backgroundSize: '200% 100%',
            animation: 'loading 1.5s infinite',
          }}
        />
      )}
      
      {/* Error state */}
      {hasError && (
        <div 
          className="image-error"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f8f9fa',
            color: '#6c757d',
            fontSize: '0.875rem',
          }}
        >
          <span>Image unavailable</span>
        </div>
      )}
      
      <style jsx>{`
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        
        .optimized-image {
          object-fit: cover;
        }
        
        .optimized-image.loaded {
          opacity: 1;
        }
        
        .optimized-image.loading {
          opacity: 0.8;
        }
      `}</style>
    </div>
  );
};

// Responsive image component
export const ResponsiveImage: React.FC<OptimizedImageProps> = (props) => {
  const { src } = props;
  
  const responsiveProps = {
    ...props,
    sizes: props.sizes || imageOptimizer.generateSizes(),
    srcSet: imageOptimizer.generateSrcSet(src),
  };
  
  return <OptimizedImage {...responsiveProps} />;
};

// Lazy loaded image component
export const LazyImage: React.FC<OptimizedImageProps> = (props) => {
  return (
    <OptimizedImage
      {...props}
      priority={false}
      loading="lazy"
    />
  );
};

// Background image component
export const BackgroundImage: React.FC<OptimizedImageProps & {
  children?: React.ReactNode;
}> = ({ children, src, alt, className, style, ...props }) => {
  return (
    <div
      className={`background-image-container ${className || ''}`}
      style={{
        position: 'relative',
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        ...style,
      }}
    >
      {/* Hidden image for SEO and accessibility */}
      <OptimizedImage
        src={src}
        alt={alt}
        style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
        {...props}
      />
      {children}
    </div>
  );
};

export default OptimizedImage;
