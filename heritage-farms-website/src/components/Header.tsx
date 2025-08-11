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
            <Link href="/contact" className="text-white hover:text-[#EDDD5E] font-gilroy font-semibold text-sm uppercase tracking-wider transition-colors">Contact Us</Link>
            <Link href="/products" className="bg-white text-[#404A3D] font-gilroy font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300">
              Shop now
            </Link>
          </nav>

          {/* Desktop Contact & Social */}
          <div className="hidden lg:flex items-center space-x-6">

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
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-white/80 hover:text-[#EDDD5E] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
              </a>
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
            <Link 
              href="/contact" 
              className="block text-white hover:text-[#EDDD5E] font-gilroy font-semibold text-sm uppercase tracking-wider transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
            
            {/* Mobile Contact Info */}
            <div className="pt-4 border-t border-gray-600">
              
              <Link href="/products" className="block w-full bg-white text-[#404A3D] font-gilroy font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition-all duration-300 text-center">
                Shop now
              </Link>
            </div>

            {/* Social links */}
            <div className="flex items-center space-x-3">
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
                  <path d="M16 8.24537V15.5C16 19.0899 13.0899 22 9.5 22C5.91015 22 3 19.0899 3 15.5C3 11.9101 5.91015 9 9.5 9C10.0163 9 10.5185 9.06019 11 9.17393V12.3368C10.5454 12.1208 10.0368 12 9.5 12C7.01472 12 5 14.0147 5 16.5C5 18.9853 7.01472 21 9.5 21C11.9853 21 14 18.9853 14 16.5V2H16V8.24537Z"/>
                </svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-white/80 hover:text-[#EDDD5E] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.2048 2.25H21.5128L14.2858 10.51L22.7878 21.75H16.1308L10.9168 14.933L4.95084 21.75H1.64084L9.37084 12.915L1.21484 2.25H8.04084L12.7538 8.481L18.2048 2.25ZM17.0438 19.77H18.8768L7.04484 4.126H5.07784L17.0438 19.77Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 