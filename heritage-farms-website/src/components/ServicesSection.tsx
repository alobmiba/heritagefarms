'use client';


import Image from 'next/image';

const services = [
  {
    id: 1,
    title: "Harvest Concepts",
    category: "Fertilizer",
    description: "Farming and animal husbandry and discuss with farmers and scientists.",
    image: "/branding/Images/products/callaloo-amaranth.png",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    )
  },
  {
    id: 2,
    title: "Farming Products",
    category: "Fruits",
    description: "Farming and animal husbandry and discuss with farmers and scientists.",
    image: "/branding/Images/products/fluted-pumpkin-leaves.png",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    )
  },
  {
    id: 3,
    title: "Soil fertilization",
    category: "Fertilizer",
    description: "Farming and animal husbandry and discuss with farmers and scientists.",
    image: "/branding/Images/products/jute_leaves.webp",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    )
  }
];

export default function ServicesSection() {
  const nextSlide = () => {
    // Navigation functionality can be implemented here
  };

  const prevSlide = () => {
    // Navigation functionality can be implemented here
  };

  return (
    <section className="py-20 bg-[#5B8C51] relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#EDDD5E] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#EDDD5E] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#EDDD5E] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-2 bg-white rounded-full mb-6">
            <svg className="w-4 h-4 text-[#5B8C51] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-[#5B8C51] font-gilroy font-medium text-sm uppercase tracking-wider">Our Services</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-gilroy font-medium text-white mb-6">
            Best Agriculture Services
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={prevSlide}
            className="w-12 h-12 border border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#5B8C51] transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="w-12 h-12 border border-white rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#5B8C51] transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              {/* Image Container */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                
                {/* Floating Action Button */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-[#EDDD5E] rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-[#404A3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category Badge */}
                <div className="inline-flex items-center px-3 py-1 bg-[#EDDD5E] rounded-full mb-4">
                  <span className="text-[#404A3D] font-gilroy font-medium text-xs uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-gilroy font-medium text-[#404A3D] mb-4 group-hover:text-[#5B8C51] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-gray-600 font-gilroy text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Icon */}
                <div className="mt-6 w-12 h-12 bg-[#EDDD5E] rounded-full flex items-center justify-center">
                  <div className="text-[#404A3D]">
                    {service.icon}
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