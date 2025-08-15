'use client';

import { useRef } from 'react';
import Image from 'next/image';

export default function OurPurpose() {
  const sectionRef = useRef<HTMLElement>(null);

      return (
      <section 
        ref={sectionRef} 
        className="py-20 bg-[#EAFDE7]"
        aria-labelledby="purpose-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Section Title */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-gilroy font-bold text-[#404A3D]">
                Join us on a journey to food sovereignty—fresh, culturally meaningful.
              </h2>
            </div>

            {/* Purpose Description */}
            <div className="space-y-6">
              <p className="text-lg font-gilroy text-gray-600 leading-relaxed">
                We grow West African & Caribbean greens where our community lives, so your food travels less and tastes more—sustainable, traceable, and always fresh. Our goal is to reconnect people with nostalgic flavours rooted in heritage—nurtured under Canadian skies.
              </p>
            </div>

            {/* CTA Button */}
            <a href="/about" className="inline-block bg-[#00312D] text-[#EAFDE7] font-gilroy font-semibold px-8 py-4 rounded-lg hover:bg-opacity-90 transition-all duration-300 text-lg">
              Learn More About Our Mission
            </a>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md h-96 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/branding/Images/products/optimized/callaloo-amaranth.webp"
                alt="Heritage Farms sustainable greenhouse with West African and Caribbean crops"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 