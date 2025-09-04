import React, { useState } from 'react';
import Image from 'next/image';

export const useImageFallback = (src: string, fallbackSrc: string = '/branding/Images/placeholders/placeholder.jpg') => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  return { imgSrc, handleError };
};

export const ImageWithFallback: React.FC<{ 
  src: string; 
  fallbackSrc?: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  [key: string]: unknown;
}> = ({ 
  src, 
  fallbackSrc = '/branding/Images/placeholders/placeholder.jpg',
  alt,
  className,
  width = 400,
  height = 300,
  ...props 
}) => {
  const { imgSrc, handleError } = useImageFallback(src, fallbackSrc);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};
