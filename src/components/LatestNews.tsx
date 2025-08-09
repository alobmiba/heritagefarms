'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

// Mock data for now - this would come from CMS
const newsItems = [
  {
    id: 1,
    title: 'New Greenhouse Expansion Complete',
    excerpt: 'Our latest greenhouse expansion is now operational, allowing us to grow more heritage crops year-round.',
    image: '/branding/Images/products/fluted-pumpkin-leaves.png',
    date: '2024-01-15',
    category: 'Farm Updates'
  },
  {
    id: 2,
    title: 'Community Farm Tour Success',
    excerpt: 'Over 50 community members joined us for our first farm tour, learning about sustainable farming practices.',
    image: '/branding/Images/products/jute_leaves.webp',
    date: '2024-01-10',
    category: 'Community'
  },
  {
    id: 3,
    title: 'Partnership with Local Grocers',
    excerpt: 'We\'re excited to announce partnerships with 5 local African grocery stores across the GTA.',
    image: '/branding/Images/products/raw-honey.jpg',
    date: '2024-01-05',
    category: 'Business'
  },
  {
    id: 4,
    title: 'New Heritage Crop Varieties',
    excerpt: 'Introducing three new heritage crop varieties to our growing lineup this season.',
    image: '/branding/Images/products/scent-leaves.jpeg',
    date: '2024-01-01',
    category: 'Products'
  },
  {
    id: 5,
    title: 'Sustainable Farming Workshop',
    excerpt: 'Join us for our upcoming workshop on sustainable farming techniques and heritage crop cultivation.',
    image: '/branding/Images/products/waterleaf-gbure.jpeg',
    date: '2023-12-28',
    category: 'Education'
  }
];

export default function LatestNews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(newsItems.length / 3));
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(newsItems.length / 3));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(newsItems.length / 3)) % Math.ceil(newsItems.length / 3));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getVisibleItems = () => {
    const startIndex = currentIndex * 3;
    return newsItems.slice(startIndex, startIndex + 3);
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-gilroy-extrabold text-heritage-dark-green mb-6">
            Latest Farm News
          </h2>
          <p className="text-xl text-heritage-dark-green font-gilroy-light max-w-3xl mx-auto">
            Stay updated with our latest developments, community events, and farming innovations
          </p>
        </div>

        <div className="relative">
          {/* News Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {getVisibleItems().map((item) => (
              <article
                key={item.id}
                className="bg-white border-2 border-heritage-forest-green rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-gilroy-extrabold text-heritage-forest-green bg-heritage-lime-slice px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                    <time className="text-sm text-gray-500 font-gilroy-light">
                      {formatDate(item.date)}
                    </time>
                  </div>
                  
                  <h3 className="text-xl font-gilroy-extrabold text-heritage-dark-green mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-heritage-dark-green font-gilroy-light mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                  
                  <button className="text-heritage-forest-green font-gilroy-extrabold hover:text-heritage-dark-green transition-colors duration-300">
                    Read More →
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Navigation Arrows */}
          {newsItems.length > 3 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-heritage-dark-green p-3 rounded-full shadow-lg transition-all duration-300"
                aria-label="Previous news"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 text-heritage-dark-green p-3 rounded-full shadow-lg transition-all duration-300"
                aria-label="Next news"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Dots Indicator */}
          {newsItems.length > 3 && (
            <div className="flex justify-center mt-8 space-x-3">
              {Array.from({ length: Math.ceil(newsItems.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-heritage-forest-green'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to news page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <button className="btn-secondary">
            View All News
          </button>
        </div>
      </div>
    </section>
  );
} 