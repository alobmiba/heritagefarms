'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface HeritageCropsTeaserProps {
  cropsImages?: string;
}

export default function HeritageCropsTeaser({ cropsImages }: HeritageCropsTeaserProps) {
  const crops = [
    {
      name: 'Ugwu (Pumpkin Leaves)',
      description: 'Tender, nutrient-rich leaves perfect for traditional soups and stews.',
      image: cropsImages || '/branding/Images/products/optimized/callaloo-amaranth.webp'
    },
    {
      name: 'Ewedu (Jute Leaves)',
      description: 'Slippery, mucilaginous leaves essential for authentic Nigerian cuisine.',
      image: cropsImages || '/branding/Images/products/optimized/callaloo-amaranth.webp'
    },
    {
      name: 'Scent Leaf (Basil)',
      description: 'Aromatic leaves that add depth and flavor to traditional dishes.',
      image: cropsImages || '/branding/Images/products/optimized/callaloo-amaranth.webp'
    },
    {
      name: 'Waterleaf',
      description: 'Succulent leaves known for their unique texture and mild flavor.',
      image: cropsImages || '/branding/Images/products/optimized/callaloo-amaranth.webp'
    }
  ];

  return (
    <section className="py-16 bg-[#EAFDE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-gilroy font-bold text-[#00312D] mb-4">
            Signature Greens
          </h2>
          <p className="text-lg font-gilroy text-gray-600 max-w-3xl mx-auto">
            Our heritage crops bring authentic flavors from West African and Caribbean traditions to your table.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {crops.map((crop, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image
                  src={crop.image}
                  alt={crop.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-gilroy font-bold text-[#00312D] mb-2">
                  {crop.name}
                </h3>
                <p className="text-gray-700 font-gilroy text-sm leading-relaxed">
                  {crop.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/products" 
            className="inline-flex items-center bg-[#BFF106] text-[#00312D] font-gilroy font-semibold px-8 py-4 rounded-full hover:bg-opacity-90 transition-all duration-300 text-lg"
          >
            <span>View All Produce</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
