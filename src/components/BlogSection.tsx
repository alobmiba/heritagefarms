'use client';

import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: "The Cultural Significance of West African Greens",
    excerpt: "Discover how traditional West African vegetables connect communities to their heritage and provide essential nutrition.",
    image: "/branding/Images/products/optimized/callaloo-amaranth.webp",
    date: "December 15, 2024",
    category: "Culture & Heritage",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Sustainable Farming: Our Greenhouse Innovation",
    excerpt: "Learn about our advanced greenhouse technology and how it enables year-round production while minimizing environmental impact.",
    image: "/branding/Images/products/optimized/fluted-pumpkin-leaves.webp",
    date: "December 10, 2024",
    category: "Sustainability",
    readTime: "7 min read"
  },
  {
    id: 3,
    title: "From Farm to Table: The Journey of Heritage Crops",
    excerpt: "Follow the journey of our heritage crops from seed to your plate, ensuring freshness and traceability every step of the way.",
    image: "/branding/Images/products/jute_leaves.webp",
    date: "December 5, 2024",
    category: "Farm Stories",
    readTime: "4 min read"
  }
];

export default function BlogSection() {
  return (
    <section className="py-20 bg-[#EAFDE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-gilroy font-bold text-[#00312D] mb-6">
            Latest from Our Farm
          </h2>
          <p className="text-lg font-gilroy text-gray-600 max-w-3xl mx-auto">
            Stay connected with our journey, learn about sustainable farming practices, and discover the cultural stories behind our heritage crops.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-[#BFF106] text-[#00312D] font-gilroy font-semibold text-sm rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span className="font-gilroy">{post.date}</span>
                  <span className="font-gilroy">{post.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-gilroy font-bold text-[#00312D] mb-3 group-hover:text-[#5B8C51] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 font-gilroy text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <Link 
                  href={`/blog/${post.id}`} 
                  className="inline-flex items-center text-[#5B8C51] font-gilroy font-semibold text-sm hover:text-[#00312D] transition-colors"
                >
                  Read More
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All Posts Button */}
        <div className="text-center">
          <Link 
            href="/blog" 
            className="inline-flex items-center px-8 py-4 bg-[#00312D] text-[#EAFDE7] font-gilroy font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 text-lg"
          >
            <span>View All Posts</span>
            <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
