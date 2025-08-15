import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#00312D] text-[#EAFDE7]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <Image
                src="/branding/Logo/PNG/HF full colour.png"
                alt="Heritage Farms Logo"
                width={150}
                height={48}
                className="h-12 w-auto"
              />
            </div>
            <p className="text-lg font-gilroy text-[#EAFDE7] mb-6 leading-relaxed">
              We are preserving traditional flavors and cultural connections.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/heritagefarms"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-[#5B8C51] hover:text-[#EAFDE7] transition-all duration-300"
                aria-label="Visit our Facebook page"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              <a
                href="https://twitter.com/heritagefarms"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-[#5B8C51] hover:text-[#EAFDE7] transition-all duration-300"
                aria-label="Visit our Twitter page"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
              
              <a
                href="https://instagram.com/heritagefarms"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-[#5B8C51] hover:text-[#EAFDE7] transition-all duration-300"
                aria-label="Visit our Instagram page"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-gilroy font-bold text-[#EAFDE7] mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-[#EAFDE7] hover:text-[#BFF106] transition-colors font-gilroy">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#EAFDE7] hover:text-[#BFF106] transition-colors font-gilroy">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-[#EAFDE7] hover:text-[#BFF106] transition-colors font-gilroy">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#EAFDE7] hover:text-[#BFF106] transition-colors font-gilroy">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-gilroy font-bold text-[#EAFDE7] mb-6">
              Contact Info
            </h3>
            <div className="space-y-3">
              <p className="text-[#EAFDE7] font-gilroy">
                <strong>Email:</strong><br />
                heritagefieldsandacreage@gmail.com
              </p>
              <p className="text-[#EAFDE7] font-gilroy">
                <strong>Location:</strong><br />
                Ontario, Canada
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#EAFDE7] font-gilroy text-sm">
              © 2024 Heritage Farms. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-[#EAFDE7] hover:text-[#BFF106] transition-colors font-gilroy text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-[#EAFDE7] hover:text-[#BFF106] transition-colors font-gilroy text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 