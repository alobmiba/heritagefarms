'use client';

import { useEffect, useRef } from 'react';

export default function OurPurpose() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Section Title */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-gilroy font-bold text-[#404A3D]">
                Our Purpose
              </h2>
              <p className="text-lg font-gilroy text-gray-600">
                We are dedicated to cultivating heritage crops that connect communities to their cultural roots while promoting sustainable farming practices.
              </p>
            </div>

            {/* Purpose Points */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#EDDD5E] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-[#404A3D]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-gilroy font-semibold text-[#404A3D] mb-2">
                    Cultural Connection
                  </h3>
                  <p className="text-gray-600 font-gilroy">
                    Bringing traditional West African and Caribbean crops to Ontario, preserving cultural heritage through agriculture.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#EDDD5E] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-[#404A3D]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-gilroy font-semibold text-[#404A3D] mb-2">
                    Sustainable Innovation
                  </h3>
                  <p className="text-gray-600 font-gilroy">
                    Using advanced greenhouse and hydroponic systems for year-round production while minimizing environmental impact.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-[#EDDD5E] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-4 h-4 text-[#404A3D]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-gilroy font-semibold text-[#404A3D] mb-2">
                    Community Impact
                  </h3>
                  <p className="text-gray-600 font-gilroy">
                    Ontario&apos;s first Black-led farm, creating opportunities and representation in the agricultural sector.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <button className="bg-[#EDDD5E] text-[#404A3D] font-gilroy font-semibold px-8 py-4 rounded-lg hover:bg-opacity-90 transition-all duration-300 text-lg">
              Learn More About Our Mission
            </button>
          </div>

          {/* Right Column - Statistics */}
          <div className="bg-[#F8F7F0] rounded-2xl p-8 lg:p-12">
            <div className="grid grid-cols-2 gap-8">
              {/* Stat 1 */}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-gilroy font-bold text-[#EDDD5E] mb-2">
                  50+
                </div>
                <p className="text-gray-600 font-gilroy font-medium">
                  Heritage Crops
                </p>
              </div>

              {/* Stat 2 */}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-gilroy font-bold text-[#EDDD5E] mb-2">
                  365
                </div>
                <p className="text-gray-600 font-gilroy font-medium">
                  Days of Growth
                </p>
              </div>

              {/* Stat 3 */}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-gilroy font-bold text-[#EDDD5E] mb-2">
                  100%
                </div>
                <p className="text-gray-600 font-gilroy font-medium">
                  Sustainable
                </p>
              </div>

              {/* Stat 4 */}
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-gilroy font-bold text-[#EDDD5E] mb-2">
                  1000+
                </div>
                <p className="text-gray-600 font-gilroy font-medium">
                  Happy Customers
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-8 p-6 bg-white rounded-xl">
              <h4 className="text-xl font-gilroy-extrabold font-semibold text-[#404A3D] mb-3">
                Our Mission
              </h4>
              <p className="text-gray-600 font-gilroy">
                We combine traditional knowledge with modern technology to bring you the freshest, most authentic heritage crops year-round.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 