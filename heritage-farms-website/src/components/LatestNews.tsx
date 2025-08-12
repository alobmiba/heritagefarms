'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const newsItems = [
  {
    id: 1,
    title: "New Heritage Crop Varieties Added to Our Collection",
    excerpt: "We're excited to announce the addition of three new traditional West African crop varieties to our greenhouse production.",
    image: "/branding/Images/products/callaloo-amaranth.png",
    date: "March 15, 2024",
    category: "Crop Updates",
    readTime: "3 min read"
  },
  {
    id: 2,
    title: "Sustainable Farming Practices: Our Commitment to the Environment",
    excerpt: "Learn about our innovative hydroponic systems and how we're reducing our environmental footprint while increasing crop yields.",
    image: "/branding/Images/products/fluted-pumpkin-leaves.png",
    date: "March 10, 2024",
    category: "Sustainability",
    readTime: "5 min read"
  },
  {
    id: 3,
    title: "Community Spotlight: Meet Our Local Partners",
    excerpt: "Discover the amazing local businesses and community organizations that help us bring heritage crops to your table.",
    image: "/branding/Images/products/jute_leaves.webp",
    date: "March 5, 2024",
    category: "Community",
    readTime: "4 min read"
  }
];

export default function LatestNews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % newsItems.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-gilroy font-bold text-[#404A3D] mb-6">
            Latest Farm News
          </h2>
          <p className="text-xl font-gilroy text-gray-600 max-w-3xl mx-auto">
            Stay updated with our latest developments, crop updates, and community initiatives.
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={85}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#EDDD5E] text-[#404A3D] font-gilroy font-semibold px-3 py-1 rounded-full text-sm">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-500 font-gilroy text-sm">
                    {item.date}
                  </span>
                  <span className="text-gray-500 font-gilroy text-sm">
                    {item.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-gilroy font-bold text-[#404A3D] mb-3 line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-gray-600 font-gilroy mb-4 line-clamp-3">
                  {item.excerpt}
                </p>

                <button className="text-[#EDDD5E] font-gilroy font-semibold hover:text-[#404A3D] transition-colors duration-300">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center mt-12 space-x-4">
          <button
            onClick={prevSlide}
            className="w-12 h-12 bg-[#F8F7F0] rounded-full flex items-center justify-center hover:bg-[#EDDD5E] hover:text-[#404A3D] transition-all duration-300"
            aria-label="Previous news item"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="flex space-x-2">
            {newsItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-[#EDDD5E]'
                    : 'bg-gray-300 hover:bg-[#EDDD5E]'
                }`}
                aria-label={`Go to news item ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-12 h-12 bg-[#F8F7F0] rounded-full flex items-center justify-center hover:bg-[#EDDD5E] hover:text-[#404A3D] transition-all duration-300"
            aria-label="Next news item"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>


      </div>
    </section>
  );
} 