'use client';

import { useEffect, useRef, useState } from 'react';

export default function CredibilityMetrics() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counts, setCounts] = useState({
    water: 0,
    carbon: 0,
    yield: 0,
    waste: 0
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Start counting animation
            animateCounts();
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

  const animateCounts = () => {
    const targets = {
      water: 75,
      carbon: 50,
      yield: 90,
      waste: 100
    };

    const duration = 2000;
    const steps = 60;
    const stepValue = Object.keys(targets).reduce((acc, key) => {
      acc[key as keyof typeof targets] = targets[key as keyof typeof targets] / steps;
      return acc;
    }, {} as Record<keyof typeof targets, number>);

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCounts({
        water: Math.min(Math.round(stepValue.water * currentStep), targets.water),
        carbon: Math.min(Math.round(stepValue.carbon * currentStep), targets.carbon),
        yield: Math.min(Math.round(stepValue.yield * currentStep), targets.yield),
        waste: Math.min(Math.round(stepValue.waste * currentStep), targets.waste)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);
  };

  return (
    <section ref={sectionRef} className="py-20 bg-[#F8F7F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-gilroy font-bold text-[#404A3D] mb-4">
            Key Sustainability Metrics
          </h2>
          <p className="text-lg font-gilroy text-gray-600 max-w-2xl mx-auto">
            Measurable impact through water savings, carbon reduction, yield, and waste diversion.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="mt-12 mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Metric 1 - Water */}
          <div className="bg-white rounded-2xl p-10 text-center shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-[#BFF106] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#404A3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <div className="text-4xl md:text-5xl font-gilroy font-bold text-[#BFF106] mb-2" data-count="75">
              {counts.water}%
            </div>
            <h3 className="text-xl font-gilroy font-semibold text-[#404A3D] mb-2">
              Less Water Used
            </h3>
            <p className="text-gray-600 font-gilroy">
              vs. field-grown imports
            </p>
          </div>

          {/* Metric 2 - Carbon */}
          <div className="bg-white rounded-2xl p-10 text-center shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-[#BFF106] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#404A3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="text-4xl md:text-5xl font-gilroy font-bold text-[#BFF106] mb-2" data-count="50">
              {counts.carbon}%
            </div>
            <h3 className="text-xl font-gilroy font-semibold text-[#404A3D] mb-2">
              Lower Carbon Footprint
            </h3>
            <p className="text-gray-600 font-gilroy">
              Food-mile reduction
            </p>
          </div>

          {/* Metric 3 - Yield */}
          <div className="bg-white rounded-2xl p-10 text-center shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-[#BFF106] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#404A3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div className="text-4xl md:text-5xl font-gilroy font-bold text-[#BFF106] mb-2" data-count="90">
              {counts.yield}%
            </div>
            <h3 className="text-xl font-gilroy font-semibold text-[#404A3D] mb-2">
              Year-Round Yield
            </h3>
            <p className="text-gray-600 font-gilroy">
              Greenhouse capacity
            </p>
          </div>

          {/* Metric 4 - Waste */}
          <div className="bg-white rounded-2xl p-10 text-center shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 bg-[#BFF106] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-[#404A3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-4xl md:text-5xl font-gilroy font-bold text-[#BFF106] mb-2" data-count="100">
              {counts.waste}%
            </div>
            <h3 className="text-xl font-gilroy font-semibold text-[#404A3D] mb-2">
              Waste Diverted
            </h3>
            <p className="text-gray-600 font-gilroy">
              Via on-site composting
            </p>
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="text-center mt-12">
          <a href="/sustainability-report" className="bg-[#BFF106] text-[#404A3D] font-gilroy font-semibold px-8 py-4 rounded-full hover:bg-opacity-90 transition-all duration-300 text-base inline-flex items-center space-x-3">
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
