'use client';

import { useState } from 'react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error subscribing:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-padding bg-heritage-lime-slice">
      <div className="container-max">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-gilroy-extrabold text-heritage-dark-green mb-6">
            Stay Connected
          </h2>
          
          <p className="text-xl text-heritage-dark-green font-gilroy-light mb-12 max-w-2xl mx-auto">
            Subscribe to our newsletter for farm updates, seasonal produce availability, community events, and sustainable farming tips.
          </p>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full px-6 py-4 border-2 border-heritage-forest-green rounded-lg focus:border-heritage-dark-green focus:outline-none font-gilroy-light text-heritage-dark-green placeholder-heritage-dark-green placeholder-opacity-60"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || !email}
                className="bg-heritage-forest-green text-white font-gilroy-extrabold px-8 py-4 rounded-lg hover:bg-opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </form>

          {isSubmitted && (
            <div className="mt-6 p-4 bg-heritage-forest-green text-white rounded-lg font-gilroy-light">
              Thank you for subscribing! You'll receive our first newsletter soon.
            </div>
          )}

          <div className="mt-8 text-sm text-heritage-dark-green font-gilroy-light">
            <p>We respect your privacy. Unsubscribe at any time.</p>
            <p className="mt-2">
              Get updates on:
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-3 text-xs">
              <span className="bg-heritage-forest-green text-white px-3 py-1 rounded-full">Seasonal Produce</span>
              <span className="bg-heritage-forest-green text-white px-3 py-1 rounded-full">Farm Tours</span>
              <span className="bg-heritage-forest-green text-white px-3 py-1 rounded-full">Community Events</span>
              <span className="bg-heritage-forest-green text-white px-3 py-1 rounded-full">Farming Tips</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 