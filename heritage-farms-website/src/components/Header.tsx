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

          {/* Desktop Contact & Social */}
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

            {/* Social links */}
            <div className="hidden xl:flex items-center space-x-3">
              <a href="#" aria-label="Facebook" className="text-white/80 hover:text-[#EDDD5E] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className="text-white/80 hover:text-[#EDDD5E] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297z"/></svg>
              </a>
              <a href="#" aria-label="Twitter" className="text-white/80 hover:text-[#EDDD5E] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 