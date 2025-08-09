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
    <section 
      ref={sectionRef}
      className="section-padding bg-heritage-lime-slice animate-on-scroll"
    >
      <div className="container-max">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-gilroy-extrabold text-heritage-dark-green mb-8">
            Our Purpose
          </h2>
          
          <div className="space-y-6 text-lg md:text-xl text-heritage-dark-green">
            <p className="font-gilroy-light leading-relaxed">
              <strong className="font-gilroy-extrabold">Cultivating heritage crops and reclaiming food sovereignty</strong> for Canada's African & Caribbean diaspora. By growing cultural greens locally, we reduce reliance on imports and restore fresh, culturally meaningful produce to communities in the GTA and across Ontario.
            </p>
            
            <p className="font-gilroy-light leading-relaxed">
              <strong className="font-gilroy-extrabold">Why it matters:</strong> Food sovereignty centers People's rights to culturally appropriate food, produced sustainably and locally. With Canada's Black population at 1.5 million (4.3% of national population, over 770,000 in Ontario, largely concentrated in GTA), access to heritage foods is limited by cold-chain imports and lack of local supply.
            </p>
            
            <p className="font-gilroy-light leading-relaxed">
              <strong className="font-gilroy-extrabold">Our unique value:</strong> Ontario's <strong>first Black-led farm</strong> to focus on <strong>year-round West African and Caribbean greens</strong> using <strong>sustainable greenhouse, hydroponic, and pasture systems</strong>.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-heritage-forest-green rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-gilroy-extrabold text-heritage-dark-green mb-2">
                Empower Communities
              </h3>
              <p className="text-heritage-dark-green font-gilroy-light">
                Ontario's African & Caribbean communities with fresh, culturally meaningful produce
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-heritage-forest-green rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-xl font-gilroy-extrabold text-heritage-dark-green mb-2">
                Reduce Food Miles
              </h3>
              <p className="text-heritage-dark-green font-gilroy-light">
                Strengthen local supply chains and reduce environmental impact
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-heritage-forest-green rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-gilroy-extrabold text-heritage-dark-green mb-2">
                Economic Inclusion
              </h3>
              <p className="text-heritage-dark-green font-gilroy-light">
                Create land-based jobs rooted in ecological agriculture
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 