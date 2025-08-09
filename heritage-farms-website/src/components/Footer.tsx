import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#404A3D] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center mb-6 hover:opacity-80 transition-opacity duration-300">
                <Image
                  src="/branding/Logo/SVG/HF white.svg"
                  alt="Heritage Farms"
                  width={150}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
              
              <p className="text-gray-300 font-gilroy mb-6">
                Ontario&apos;s first Black-led farm focusing on year-round West African and Caribbean greens using sustainable greenhouse, hydroponic, and pasture systems.
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-[#EDDD5E] hover:text-[#404A3D] transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-[#EDDD5E] hover:text-[#404A3D] transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center hover:bg-[#EDDD5E] hover:text-[#404A3D] transition-all duration-300"
                  aria-label="Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-gilroy-extrabold font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-[#EDDD5E] font-gilroy transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-[#EDDD5E] font-gilroy transition-colors duration-300">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-gray-300 hover:text-[#EDDD5E] font-gilroy transition-colors duration-300">
                    Our Products
                  </Link>
                </li>
                <li>
                  <a href="#mission" className="text-gray-300 hover:text-[#EDDD5E] font-gilroy transition-colors duration-300">
                    Our Mission
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-300 hover:text-[#EDDD5E] font-gilroy transition-colors duration-300">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-lg font-gilroy-extrabold font-semibold mb-6">Our Products</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#EDDD5E] font-gilroy transition-colors duration-300">
                    Callaloo (Amaranth)
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#EDDD5E] font-gilroy transition-colors duration-300">
                    Fluted Pumpkin Leaves
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#EDDD5E] font-gilroy transition-colors duration-300">
                    Jute Leaves
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#EDDD5E] font-gilroy transition-colors duration-300">
                    Waterleaf (Gbure)
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#EDDD5E] font-gilroy transition-colors duration-300">
                    Raw Honey
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-gilroy-extrabold font-semibold mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#EDDD5E] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="text-gray-300 font-gilroy">Ontario, Canada</p>
                    <p className="text-gray-300 font-gilroy text-sm">Greater Toronto Area</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#EDDD5E] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="text-gray-300 font-gilroy">info@heritagefarms.ca</p>
                    <p className="text-gray-300 font-gilroy text-sm">We&apos;ll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-[#EDDD5E] mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-gray-300 font-gilroy">Mon - Fri: 9AM - 6PM</p>
                    <p className="text-gray-300 font-gilroy text-sm">Sat: 10AM - 4PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-600 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-gray-300 font-gilroy text-sm">
                © 2024 Heritage Farms. All rights reserved.
              </div>
              
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-300 hover:text-[#EDDD5E] font-gilroy text-sm transition-colors duration-300">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-300 hover:text-[#EDDD5E] font-gilroy text-sm transition-colors duration-300">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-300 hover:text-[#EDDD5E] font-gilroy text-sm transition-colors duration-300">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 