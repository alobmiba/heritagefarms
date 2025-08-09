'use client';



export default function CTASection() {
  return (
    <section className="py-20 bg-[#5B8C51] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#EDDD5E] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#EDDD5E] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#EDDD5E] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Icon */}
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8">
            <svg className="w-12 h-12 text-[#5B8C51]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>

          {/* Heading */}
          <h2 className="text-5xl md:text-6xl font-gilroy-extrabold font-medium text-white mb-8">
                          We&apos;re popular leader in
            <span className="block">agriculture market globally</span>
          </h2>

          {/* CTA Button */}
          <button className="bg-white text-[#404A3D] font-gilroy-extrabold font-semibold px-8 py-4 rounded-full hover:bg-opacity-90 transition-all duration-300 text-lg flex items-center space-x-3 mx-auto">
            <span>Discover more</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
} 