'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen bg-[#F8F7F0]">
      {/* Background with multiple slides */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          {/* Slide 1 - Main slide */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 0 ? 'opacity-100' : 'opacity-0'}`}>
            <Image
              src="/branding/Images/banner/homebanner.png"
              alt="Heritage Farms Banner"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          </div>
          
          {/* Slide 2 */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 1 ? 'opacity-100' : 'opacity-0'}`}>
            <Image
              src="/branding/Images/banner/homebanner2.png"
              alt="Heritage Farms Banner 2"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          </div>
          
          {/* Slide 3 */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 2 ? 'opacity-100' : 'opacity-0'}`}>
            <Image
              src="/branding/Images/banner/homebanner.png"
              alt="Heritage Farms Banner 3"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Header/Navigation */}
      <header className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/branding/Logo/SVG/HF white.svg"
                alt="Heritage Farms"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-[#EDDD5E] font-gilroy font-semibold text-sm uppercase tracking-wider transition-colors">Home</Link>
              <Link href="/about" className="text-white hover:text-[#EDDD5E] font-gilroy font-semibold text-sm uppercase tracking-wider transition-colors">About</Link>
              <Link href="/contact" className="text-white hover:text-[#EDDD5E] font-gilroy font-semibold text-sm uppercase tracking-wider transition-colors">Contact Us</Link>
            </nav>

            {/* Contact Info */}
            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-[#EDDD5E] rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#404A3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-white font-gilroy">Call us Now</p>
                  <p className="text-sm font-gilroy font-medium text-white">+1(212)255-511</p>
                </div>
              </div>
              
              <Link href="/products" className="bg-white text-[#404A3D] font-gilroy font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300">
                Shop now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Content */}
      <div className="relative h-full flex items-center z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white space-y-8">
            {/* Main Heading */}
            <h1 className="text-6xl md:text-8xl font-gilroy font-medium leading-tight">
              Your Roots, Nurtured by
              <span className="block">Canadian Soil</span>
            </h1>

            {/* Description */}
            <div className="border-t border-white/30 pt-6">
              <p className="text-lg font-gilroy text-white/90 max-w-2xl mx-auto">
                Reconnecting Caribbean & West African greens with Canadian-grown freshness, every season.
              </p>
            </div>

            {/* CTA Button */}
            <button className="bg-white text-[#404A3D] font-gilroy font-semibold px-8 py-4 rounded-full hover:bg-opacity-90 transition-all duration-300 text-base flex items-center space-x-3 mx-auto">
              <span>Contact Us</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-8 z-30 flex space-x-2">
        <button 
          onClick={() => setCurrentSlide(0)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === 0 ? 'bg-white' : 'bg-white/50'}`}
        ></button>
        <button 
          onClick={() => setCurrentSlide(1)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === 1 ? 'bg-white' : 'bg-white/50'}`}
        ></button>
        <button 
          onClick={() => setCurrentSlide(2)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === 2 ? 'bg-white' : 'bg-white/50'}`}
        ></button>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-32 h-32 bg-[#EDDD5E]/20 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-[#EDDD5E]/20 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#EDDD5E]/20 rounded-full"></div>
      </div>
    </div>
  );
} 