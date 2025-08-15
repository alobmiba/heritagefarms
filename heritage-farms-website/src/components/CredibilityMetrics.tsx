'use client';

import { useRef } from 'react';

export default function CredibilityMetrics() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="py-20 bg-[#EAFDE7]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-gilroy font-bold text-[#00312D] mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg font-gilroy text-gray-600 max-w-3xl mx-auto">
            Join our growing community of customers who trust Heritage Farms for authentic, sustainable heritage crops.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-[#00312D] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#EAFDE7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-gilroy font-semibold text-[#00312D] mb-2">
              10,000+ Happy Customers
            </h3>
            <p className="text-gray-600 font-gilroy">Serving families across Ontario</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-[#00312D] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#EAFDE7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-gilroy font-semibold text-[#00312D] mb-2">
              99.8% Satisfaction Rate
            </h3>
            <p className="text-gray-600 font-gilroy">Consistently high ratings</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-[#00312D] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#EAFDE7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-gilroy font-semibold text-[#00312D] mb-2">
              24/7 Customer Support
            </h3>
            <p className="text-gray-600 font-gilroy">Always here to help you</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-[#00312D] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#EAFDE7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-gilroy font-semibold text-[#00312D] mb-2">
              100% Fresh Guarantee
            </h3>
            <p className="text-gray-600 font-gilroy">Farm-to-table freshness</p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a href="/sustainability-report" className="bg-[#BFF106] text-[#00312D] font-gilroy font-semibold px-8 py-4 rounded-full hover:bg-opacity-90 transition-all duration-300 text-base inline-flex items-center space-x-3">
            <span>See Full Sustainability Report</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 
