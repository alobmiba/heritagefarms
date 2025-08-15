'use client';

import React from 'react';
import Image from 'next/image';

interface SustainabilityPracticesProps {
  backgroundImage?: string;
}

export default function SustainabilityPractices({ backgroundImage }: SustainabilityPracticesProps) {
  const practices = [
    {
      icon: '💧',
      title: 'Efficient irrigation',
      description: 'Smart irrigation saves water without sacrificing quality.',
      value: '75%',
      metric: 'less water'
    },
    {
      icon: '🚚',
      title: 'Local distribution',
      description: 'Local distribution cuts long-haul transport.',
      value: '50%',
      metric: 'lower carbon'
    },
    {
      icon: '🌱',
      title: 'Year-round greenhouse',
      description: 'Greenhouse control delivers weekly harvests, all year.',
      value: '90%',
      metric: 'year-round yield'
    },
    {
      icon: '♻️',
      title: 'Composting',
      description: 'Composting diverts waste and enriches soil inputs.',
      value: '100%',
      metric: 'waste diverted'
    }
  ];

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Background Image (if provided) */}
      {backgroundImage && (
        <div className="absolute inset-0 opacity-5">
          <Image
            src={backgroundImage}
            alt="Sustainable farming background"
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-gilroy font-bold text-[#00312D] mb-4">
            How We Grow, Responsibly
          </h2>
          <p className="text-lg font-gilroy text-gray-600 max-w-3xl mx-auto">
            Our sustainable practices ensure every harvest is both environmentally conscious and culturally meaningful.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {practices.map((practice, index) => (
            <div key={index} className="bg-white border border-[#3A7817]/20 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-[#BFF106] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{practice.icon}</span>
                </div>
                <h3 className="text-lg font-gilroy font-bold text-[#00312D] mb-2">
                  {practice.title}
                </h3>
                <p className="text-gray-700 font-gilroy text-sm leading-relaxed mb-4">
                  {practice.description}
                </p>
              </div>
              
              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-gilroy font-bold text-[#00312D]">
                    {practice.value}
                  </span>
                  <span className="text-sm font-gilroy text-gray-600">
                    {practice.metric}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#3A7817] h-2 rounded-full transition-all duration-1000"
                    style={{ width: practice.value === '100%' ? '100%' : practice.value }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
