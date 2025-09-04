'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutCTA() {
  return (
    <section className="py-16 bg-[#00312D]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-gilroy font-bold text-[#EAFDE7] mb-6">
          Ready to bring heritage flavours home?
        </h2>
        <p className="text-lg font-gilroy text-[#EAFDE7]/80 mb-8 max-w-2xl mx-auto">
          Join our community of customers who trust Heritage Farms for authentic, sustainable heritage crops.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/products" 
            className="inline-flex items-center justify-center bg-[#BFF106] text-[#00312D] font-gilroy font-semibold px-8 py-4 rounded-full hover:bg-opacity-90 transition-all duration-300 text-lg"
          >
            <span>Pre-Order</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center border-2 border-[#BFF106] text-[#BFF106] font-gilroy font-semibold px-8 py-4 rounded-full hover:bg-[#BFF106] hover:text-[#00312D] transition-all duration-300 text-lg"
          >
            <span>Contact Us</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
