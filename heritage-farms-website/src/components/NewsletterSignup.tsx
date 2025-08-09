'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1000);
  };

  return (
    <section className="py-20 bg-[#F8F7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-gilroy font-bold text-[#404A3D] mb-6">
              Stay Connected
            </h2>
            
            <p className="text-xl font-gilroy text-gray-600 mb-8 max-w-3xl mx-auto">
              Subscribe to our newsletter for the latest updates on crop availability, farm events, community initiatives, and exclusive offers.
            </p>

            {/* Newsletter Form */}
            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg max-w-2xl mx-auto">
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="newsletter-email" className="block text-[#404A3D] font-gilroy font-medium mb-3 text-left">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="newsletter-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EDDD5E] focus:border-transparent font-gilroy"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading || !email}
                    className="w-full bg-[#EDDD5E] text-[#404A3D] font-gilroy font-semibold py-4 px-6 rounded-lg hover:bg-opacity-90 transition-all duration-300 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Subscribing...' : 'Subscribe to Newsletter'}
                  </button>

                  <p className="text-sm text-gray-600 font-gilroy">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              ) : (
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-[#EDDD5E] rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-[#404A3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-gilroy font-bold text-[#404A3D]">
                    Thank You for Subscribing!
                  </h3>
                  <p className="text-gray-600 font-gilroy">
                    You&apos;ll receive our latest updates and exclusive offers in your inbox.
                  </p>
                  <button
                    onClick={() => setIsSubscribed(false)}
                    className="text-[#EDDD5E] font-gilroy font-semibold hover:text-[#404A3D] transition-colors duration-300"
                  >
                    Subscribe Another Email
                  </button>
                </div>
              )}
            </div>

            {/* Benefits */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-[#EDDD5E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#404A3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-gilroy font-semibold text-[#404A3D] mb-2">
                  Weekly Updates
                </h3>
                <p className="text-gray-600 font-gilroy text-sm">
                  Get the latest news about crop availability and farm developments.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-[#EDDD5E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#404A3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-gilroy font-semibold text-[#404A3D] mb-2">
                  Exclusive Offers
                </h3>
                <p className="text-gray-600 font-gilroy text-sm">
                  Be the first to know about special promotions and seasonal deals.
                </p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-[#EDDD5E] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-[#404A3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-lg font-gilroy font-semibold text-[#404A3D] mb-2">
                  Community Events
                </h3>
                <p className="text-gray-600 font-gilroy text-sm">
                  Stay informed about farm tours, workshops, and community gatherings.
                </p>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-12">
              <h3 className="text-xl font-gilroy font-semibold text-[#404A3D] mb-6">
                Follow Us on Social Media
              </h3>
              <div className="flex justify-center space-x-6">
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center hover:bg-[#EDDD5E] hover:text-[#404A3D] transition-all duration-300"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center hover:bg-[#EDDD5E] hover:text-[#404A3D] transition-all duration-300"
                  aria-label="Instagram"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z"/>
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center hover:bg-[#EDDD5E] hover:text-[#404A3D] transition-all duration-300"
                  aria-label="Twitter"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 