'use client';

import React from 'react';

export default function StoryTimeline() {
  const timelineItems = [
    {
      date: 'Aug 2024',
      title: 'Heritage Farms Founded',
      description: 'Started with a vision to reconnect communities to their culinary heritage through sustainable farming.'
    },
    {
      date: '2025',
      title: 'First Seeds Planted',
      description: 'Planted our first heritage crops: Ugwu, Ewedu, Scent Leaf, and Waterleaf in our sustainable greenhouse.'
    },
    {
      date: 'Future',
      title: 'Growing Together',
      description: 'Expanding our reach and impact across Ontario communities.'
    }
  ];

  return (
    <section className="py-16 bg-[#EAFDE7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-gilroy font-bold text-[#00312D] mb-4">
            Our Story
          </h2>
          <p className="text-lg font-gilroy text-gray-600 max-w-2xl mx-auto">
            From vision to reality—our journey of bringing heritage flavors to Ontario communities.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-[#3A7817]"></div>

          {timelineItems.map((item, index) => (
            <div key={index} className={`relative flex items-center mb-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              {/* Timeline dot */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-[#BFF106] rounded-full border-4 border-white shadow-lg z-10"></div>

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-sm font-gilroy font-semibold text-[#BFF106] mb-2">
                    {item.date}
                  </div>
                  <h3 className="text-xl font-gilroy font-bold text-[#00312D] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 font-gilroy leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
