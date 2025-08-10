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
                  <p className="text-sm font-gilroy font-medium text-white">+1 (647) 616-2833</p>
                </div>
              </div>
              
              {/* Social links */}
              <div className="hidden xl:flex items-center space-x-3">
                <a href="https://www.instagram.com/heritagefarms.ca" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-white/80 hover:text-[#EDDD5E] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/@HeritageFields" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-white/80 hover:text-[#EDDD5E] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a2.97 2.97 0 00-2.09-2.1C19.6 3.5 12 3.5 12 3.5s-7.6 0-9.408.586a2.97 2.97 0 00-2.09 2.1C0 8 0 12 0 12s0 4 .502 5.814a2.97 2.97 0 002.09 2.1C4.4 20.5 12 20.5 12 20.5s7.6 0 9.408-.586a2.97 2.97 0 002.09-2.1C24 16 24 12 24 12s0-4-.502-5.814zM9.75 15.5v-7l6 3.5-6 3.5z"/>
                  </svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-white/80 hover:text-[#EDDD5E] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-white/80 hover:text-[#EDDD5E] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-white/80 hover:text-[#EDDD5E] transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.2048 2.25H21.5128L14.2858 10.51L22.7878 21.75H16.1308L10.9168 14.933L4.95084 21.75H1.64084L9.37084 12.915L1.21484 2.25H8.04084L12.7538 8.481L18.2048 2.25ZM17.0438 19.77H18.8768L7.04484 4.126H5.07784L17.0438 19.77Z"/>
                  </svg>
                </a>
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
            <Link href="/about" className="bg-white text-[#404A3D] font-gilroy font-semibold w-[221.06px] h-[56px] rounded-full hover:bg-opacity-90 transition-all duration-300 text-base flex items-center justify-center space-x-3 mx-auto">
              <span>Learn More</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
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