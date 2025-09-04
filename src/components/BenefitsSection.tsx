'use client';

import React, { useEffect, useState } from 'react';

export default function CredibilityMetrics() {
  const [counts, setCounts] = useState({
    water: 0,
    carbon: 0,
    yield: 0,
    waste: 0
  });

  useEffect(() => {
    const targets = {
      water: 90,
      carbon: 75,
      yield: 95,
      waste: 100
    };

    const steps = 60;
    const stepValue = {
      water: targets.water / steps,
      carbon: targets.carbon / steps,
      yield: targets.yield / steps,
      waste: targets.waste / steps
    };

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
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[75vh] min-h-[600px] max-h-[900px] overflow-hidden">
      {/* Full Bleed Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <iframe
          className="w-full h-full object-cover pointer-events-none opacity-60 scale-125"
          src="https://www.youtube-nocookie.com/embed/w9eRIGTHKJM?autoplay=1&mute=1&controls=0&start=13&loop=1&playlist=w9eRIGTHKJM&modestbranding=1&rel=0&showinfo=0"
          title="Awesome Farm Drone Footage"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
        
        {/* Black overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content Overlay - Positioned to bottom right with standard padding */}
      <div className="relative z-20 h-full flex items-end justify-end">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-end">
            <div className="max-w-md">
              {/* Section Header */}
              <div className="text-right mb-4 md:mb-6">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-gilroy font-bold text-[#EAFDE7] mb-2 md:mb-3">
                  Sustainability Metrics
                </h2>
                <p className="text-sm md:text-base font-gilroy text-[#EAFDE7]/90">
                  Our innovative farming practices deliver measurable environmental benefits.
                </p>
              </div>

              {/* Metrics Grid - 2x2 Layout */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {/* Water Savings */}
                <div className="bg-[#3A7817]/20 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:bg-[#3A7817]/30 transition-all duration-300">
                  <div className="text-3xl md:text-4xl mb-2 md:mb-3">💧</div>
                  <div className="text-2xl md:text-3xl font-gilroy font-bold text-[#EAFDE7] mb-1 md:mb-2">
                    {counts.water}%
                  </div>
                  <h3 className="text-base md:text-lg font-gilroy font-semibold text-[#EAFDE7] mb-1">
                    Water Saved
                  </h3>
                  <p className="text-[#EAFDE7]/80 font-gilroy text-sm">
                    vs. field-grown imports
                  </p>
                </div>

                {/* Carbon Reduction */}
                <div className="bg-[#3A7817]/20 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:bg-[#3A7817]/30 transition-all duration-300">
                  <div className="text-3xl md:text-4xl mb-2 md:mb-3">🌎</div>
                  <div className="text-2xl md:text-3xl font-gilroy font-bold text-[#EAFDE7] mb-1 md:mb-2">
                    {counts.carbon}%
                  </div>
                  <h3 className="text-base md:text-lg font-gilroy font-semibold text-[#EAFDE7] mb-1">
                    Lower Carbon
                  </h3>
                  <p className="text-[#EAFDE7]/80 font-gilroy text-sm">
                    reduced food miles
                  </p>
                </div>

                {/* Year-Round Yield */}
                <div className="bg-[#3A7817]/20 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:bg-[#3A7817]/30 transition-all duration-300">
                  <div className="text-3xl md:text-4xl mb-2 md:mb-3">🌿</div>
                  <div className="text-2xl md:text-3xl font-gilroy font-bold text-[#EAFDE7] mb-1 md:mb-2">
                    {counts.yield}%
                  </div>
                  <h3 className="text-base md:text-lg font-gilroy font-semibold text-[#EAFDE7] mb-1">
                    Year-Round Yield
                  </h3>
                  <p className="text-[#EAFDE7]/80 font-gilroy text-sm">
                    greenhouse capacity
                  </p>
                </div>

                {/* Waste Diverted */}
                <div className="bg-[#3A7817]/20 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:bg-[#3A7817]/30 transition-all duration-300">
                  <div className="text-3xl md:text-4xl mb-2 md:mb-3">♻️</div>
                  <div className="text-2xl md:text-3xl font-gilroy font-bold text-[#EAFDE7] mb-1 md:mb-2">
                    {counts.waste}%
                  </div>
                  <h3 className="text-base md:text-lg font-gilroy font-semibold text-[#EAFDE7] mb-1">
                    Waste Diverted
                  </h3>
                  <p className="text-[#EAFDE7]/80 font-gilroy text-sm">
                    on-site composting
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
