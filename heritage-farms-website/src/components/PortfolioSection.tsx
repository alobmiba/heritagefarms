'use client';

import Image from 'next/image';

const portfolioItems = [
  {
    id: 1,
    image: "/branding/Images/products/callaloo-amaranth.png",
    alt: "Portfolio Item 1"
  },
  {
    id: 2,
    image: "/branding/Images/products/fluted-pumpkin-leaves.png",
    alt: "Portfolio Item 2"
  },
  {
    id: 3,
    image: "/branding/Images/products/jute_leaves.webp",
    alt: "Portfolio Item 3"
  },
  {
    id: 4,
    image: "/branding/Images/products/raw-honey.jpg",
    alt: "Portfolio Item 4"
  },
  {
    id: 5,
    image: "/branding/Images/products/red-onions.jpg",
    alt: "Portfolio Item 5"
  },
  {
    id: 6,
    image: "/branding/Images/products/scent-leaves.jpeg",
    alt: "Portfolio Item 6"
  },
  {
    id: 7,
    image: "/branding/Images/products/waterleaf-gbure.jpeg",
    alt: "Portfolio Item 7"
  },
  {
    id: 8,
    image: "/branding/Images/products/yams.webp",
    alt: "Portfolio Item 8"
  },
  {
    id: 9,
    image: "/branding/Images/products/callaloo-amaranth.png",
    alt: "Portfolio Item 9"
  }
];

export default function PortfolioSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500">
              {/* Image */}
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-[#EDDD5E] rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-[#404A3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 