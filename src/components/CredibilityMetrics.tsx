'use client';

import { useState, useEffect, useRef } from 'react';

const metrics = [
  {
    id: 'sustainability',
    title: 'Sustainability',
    value: 75,
    suffix: '%',
    description: 'less water usage',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    id: 'co2',
    title: 'CO₂ Reduction',
    value: 50,
    suffix: '%',
    description: 'fewer food-mile emissions',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    )
  },
  {
    id: 'crops',
    title: 'Heritage Crops',
    value: 7,
    suffix: '',
    description: 'specialty crops grown',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    id: 'capacity',
    title: 'Greenhouse Capacity',
    value: 90,
    suffix: '%',
    description: 'year-round production',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    )
  }
];

export default function CredibilityMetrics() {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounts();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounts = () => {
    metrics.forEach((metric) => {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = metric.value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= metric.value) {
          current = metric.value;
          clearInterval(timer);
        }
        setCounts(prev => ({
          ...prev,
          [metric.id]: Math.floor(current)
        }));
      }, duration / steps);
    });
  };

  return (
    <section ref={sectionRef} className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-gilroy-extrabold text-heritage-dark-green mb-6">
            Our Impact & Credibility
          </h2>
          <p className="text-xl text-heritage-dark-green font-gilroy-light max-w-3xl mx-auto">
            Delivering measurable results through sustainable farming practices and innovative technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-white border-2 border-heritage-forest-green rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-heritage-forest-green rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="text-white">
                  {metric.icon}
                </div>
              </div>
              
              <h3 className="text-2xl font-gilroy-extrabold text-heritage-dark-green mb-2">
                {metric.title}
              </h3>
              
              <div className="text-4xl md:text-5xl font-gilroy-extrabold text-heritage-forest-green mb-2">
                {counts[metric.id] || 0}{metric.suffix}
              </div>
              
              <p className="text-heritage-dark-green font-gilroy-light">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-heritage-lime-slice rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-gilroy-extrabold text-heritage-dark-green mb-4">
              Community Partnerships
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-gilroy-extrabold text-heritage-forest-green mb-2">5</div>
                <p className="text-heritage-dark-green font-gilroy-light">Local Grocers</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-gilroy-extrabold text-heritage-forest-green mb-2">Bi-weekly</div>
                <p className="text-heritage-dark-green font-gilroy-light">Farm Tours (Coming Soon)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 