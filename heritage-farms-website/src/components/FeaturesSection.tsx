'use client';


import { useInView } from 'react-intersection-observer';

export default function FeaturesSection() {
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: (
        <svg className="w-11 h-11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Professional Farmers",
      description: "Nullam porta enim vel tellus commodo, eget laoreet odio ultrices.",
      image: "/branding/Images/products/callaloo-amaranth.png"
    },
    {
      icon: (
        <svg className="w-11 h-11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Fresh Vegetables",
      description: "Nullam porta enim vel tellus commodo, eget laoreet odio ultrices.",
      image: "/branding/Images/products/fluted-pumpkin-leaves.png"
    },
    {
      icon: (
        <svg className="w-11 h-11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Agriculture Products",
      description: "Nullam porta enim vel tellus commodo, eget laoreet odio ultrices.",
      image: "/branding/Images/products/jute_leaves.webp"
    },
    {
      icon: (
        <svg className="w-11 h-11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "100% Guaranteed",
      description: "Nullam porta enim vel tellus commodo, eget laoreet odio ultrices.",
      image: "/branding/Images/products/waterleaf-gbure.jpeg"
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 ${
                inView ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* Icon */}
              <div className="w-20 h-20 bg-design-amber rounded-full flex items-center justify-center mb-6">
                <div className="text-design-black">
                  {feature.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-gilroy-extrabold font-semibold text-design-black mb-4">
                {feature.title}
              </h3>

              {/* Description */}
              <div className="border-t border-design-stone-light pt-4">
                <p className="text-design-neutral font-gilroy leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Learn More Button */}
              <div className="mt-6">
                <button className="bg-white text-design-black font-gilroy-extrabold font-semibold px-6 py-3 rounded-full border-2 border-design-amber hover:bg-design-amber hover:text-design-black transition-all duration-300 flex items-center space-x-2">
                  <span>Learn More</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 