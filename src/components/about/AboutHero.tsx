'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface AboutHeroProps {
  heroImage?: string;
}

export default function AboutHero({ heroImage = '/branding/images/about/hero.jpg' }: AboutHeroProps) {
  return (
    <section className="relative h-[75vh] min-h-[500px] max-h-[800px] overflow-hidden">
      {/* Background Image */}
      <Image
        src={heroImage}
        alt="Heritage Farms Greenhouse"
        fill
        className="object-cover"
        priority
      />
      
      {/* Dark Green Overlay */}
      <div className="absolute inset-0 bg-[#00312D] bg-opacity-60"></div>
      
      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-[#EAFDE7] px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-gilroy-extrabold mb-4 md:mb-6 animate-fade-in">
            About Heritage Farms
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-gilroy mb-6 md:mb-8 animate-fade-in-delay max-w-3xl mx-auto">
            Ontario&apos;s first Black-led farm growing West African & Caribbean greens—rooted in heritage, nurtured under Canadian skies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
            <Link 
              href="#team" 
              className="btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 bg-[#BFF106] text-[#00312D] hover:bg-opacity-90 transition-colors font-gilroy font-semibold rounded-full"
            >
              Meet the Team
            </Link>
            <Link 
              href="/contact" 
              className="btn-secondary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 border-2 border-[#BFF106] text-[#BFF106] hover:bg-[#BFF106] hover:text-[#00312D] transition-colors font-gilroy font-semibold rounded-full"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
