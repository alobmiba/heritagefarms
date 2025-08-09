'use client';

import Image from 'next/image';

const products = [
  {
    id: 1,
    title: "Agriculture Products",
    description: "Nullam porta enim vel tellus commodo, eget laoreet odio ultrices.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Quality Products",
    description: "Nullam porta enim vel tellus commodo, eget laoreet odio ultrices.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Fresh Vegetables",
    description: "Nullam porta enim vel tellus commodo, eget laoreet odio ultrices.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    id: 4,
    title: "Pure & Organic",
    description: "Nullam porta enim vel tellus commodo, eget laoreet odio ultrices.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  }
];

export default function ProductsSection() {
  return (
    <section className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-2 bg-white rounded-full mb-6 border border-[#5B8C51]">
            <svg className="w-4 h-4 text-[#5B8C51] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-[#5B8C51] font-gilroy font-medium text-sm uppercase tracking-wider">Grow Naturally</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-gilroy font-medium text-[#404A3D] mb-6">
            Choose What&apos;s Perfect
            <span className="block">For Your Field</span>
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {products.map((product) => (
            <div key={product.id} className="text-center group">
              {/* Icon Container */}
              <div className="w-20 h-20 bg-[#EDDD5E] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-[#404A3D]">
                  {product.icon}
                </div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-gilroy font-medium text-[#404A3D] mb-4 group-hover:text-[#5B8C51] transition-colors">
                {product.title}
              </h3>
              
              <p className="text-gray-600 font-gilroy text-base leading-relaxed">
                {product.description}
              </p>
            </div>
          ))}
        </div>

        {/* Center Image */}
        <div className="flex justify-center mb-16">
          <div className="relative w-full max-w-2xl h-96 rounded-3xl overflow-hidden">
            <Image
              src="/branding/Images/products/yams.webp"
              alt="Heritage Farms Products"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

        {/* Bottom Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={`bottom-${product.id}`} className="text-center group">
              {/* Icon Container */}
              <div className="w-20 h-20 bg-[#EDDD5E] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="text-[#404A3D]">
                  {product.icon}
                </div>
              </div>

                             {/* Content */}
               <h3 className="text-2xl font-gilroy font-medium text-[#404A3D] mb-4 group-hover:text-[#5B8C51] transition-colors">
                 {product.title}
               </h3>
               
               <p className="text-gray-600 font-gilroy text-base leading-relaxed">
                 {product.description}
               </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 