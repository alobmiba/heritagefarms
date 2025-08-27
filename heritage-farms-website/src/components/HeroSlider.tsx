'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// Typing effect component
const TypewriterText = ({ text, speed = 100, className = "" }: { text: string; speed?: number; className?: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed]);

  // Reset animation when text changes
  useEffect(() => {
    setDisplayText('');
    setCurrentIndex(0);
  }, [text]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const bannerImages = [
  {
    src: '/branding/Images/banner/homebanner.png',
    alt: 'Heritage Farms banner',
    h1: 'Your Roots, Canadian Nurtured',
    subtitle: 'West African & Caribbean greens—grown sustainably',
    cta: 'Shop Fresh Heritage Greens'
  },
  {
    src: '/branding/Images/banner/homebanner2.png',
    alt: 'Heritage Farms banner 2',
    h1: 'Nostalgic Flavors, Rooted in Heritage',
    subtitle: 'Traditional greens from diaspora gardens, cultivated locally and responsibly',
    cta: 'Learn More'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-[120vh] min-h-[800px] max-h-[1200px] overflow-hidden">
      {bannerImages.map((banner, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={banner.src}
            alt={banner.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-[#EAFDE7] px-4 max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-gilroy-extrabold mb-4 md:mb-6 animate-fade-in">
                {index === 0 ? (
                  <TypewriterText 
                    text={banner.h1} 
                    speed={150} 
                    className="text-4xl md:text-6xl lg:text-7xl font-gilroy-extrabold"
                  />
                ) : (
                  banner.h1
                )}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl font-gilroy mb-6 md:mb-8 animate-fade-in-delay">
                {banner.subtitle}
              </p>
              <button className="btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 bg-[#3A7817] text-[#EAFDE7] hover:bg-[#2A5A12] transition-colors animate-fade-in-delay-2">
                {banner.cta}
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Dots */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 md:space-x-4">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-[#EAFDE7] scale-125'
                : 'bg-[#EAFDE7]/50 hover:bg-[#EAFDE7]/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
} 