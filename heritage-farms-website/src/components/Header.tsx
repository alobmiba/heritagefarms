'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems, setIsCartOpen } = useCart();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
            <Image
              src="/branding/Logo/SVG/HF white.svg"
              alt="Heritage Farms"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-[#EDDD5E] font-gilroy font-semibold text-sm uppercase tracking-wider transition-colors">Home</Link>
            <Link href="/about" className="text-white hover:text-[#EDDD5E] font-gilroy font-semibold text-sm uppercase tracking-wider transition-colors">About</Link>
            <a href="#contact" className="text-white hover:text-[#EDDD5E] font-gilroy font-semibold text-sm uppercase tracking-wider transition-colors">Contact Us</a>
          </nav>

          {/* Desktop Contact Info */}
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
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative bg-white text-[#404A3D] font-gilroy font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300"
              aria-label="Open shopping cart"
            >
              <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Cart
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#EDDD5E] text-[#404A3D] text-xs font-gilroy-extrabold font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex items-center p-2 text-white hover:text-[#EDDD5E] transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} bg-[#404A3D] rounded-lg mt-2 shadow-lg`}>
          <div className="px-4 py-6 space-y-4">
            <Link 
              href="/" 
              className="block text-white hover:text-[#EDDD5E] font-gilroy font-semibold text-sm uppercase tracking-wider transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="block text-white hover:text-[#EDDD5E] font-gilroy font-semibold text-sm uppercase tracking-wider transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <a 
              href="#contact" 
              className="block text-white hover:text-[#EDDD5E] font-gilroy font-semibold text-sm uppercase tracking-wider transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </a>
            
            {/* Mobile Contact Info */}
            <div className="pt-4 border-t border-gray-600">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-[#EDDD5E] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-[#404A3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-300 font-gilroy">Call us Now</p>
                  <p className="text-sm font-gilroy font-medium text-white">+1(212)255-511</p>
                </div>
              </div>
              
              <Link href="/products" className="block w-full bg-white text-[#404A3D] font-gilroy font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 text-center">
                Shop now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 