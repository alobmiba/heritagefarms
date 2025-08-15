'use client';

import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: "The Cultural Significance of West African Greens",
    excerpt: "Discover how traditional West African vegetables connect communities to their heritage and provide essential nutrition. These crops are more than just food—they're living links to cultural traditions that span generations.",
    image: "/branding/Images/products/optimized/callaloo-amaranth.webp",
    date: "December 15, 2024",
    category: "Culture & Heritage",
    readTime: "5 min read",
    content: `
      <h2>The Cultural Significance of West African Greens</h2>
      <p>In West African cuisine, leafy greens are not merely vegetables—they are cultural ambassadors that carry the stories, traditions, and wisdom of generations. At Heritage Farms, we understand that every leaf of callaloo, every stem of waterleaf, and every sprig of scent leaf represents a connection to ancestral knowledge and community identity.</p>
      
      <h3>Roots in Tradition</h3>
      <p>Traditional West African greens like callaloo (amaranth), waterleaf, and fluted pumpkin leaves have been cultivated for centuries, not just for their nutritional value, but for their role in cultural ceremonies, healing practices, and community gatherings. These crops are deeply embedded in the social fabric of West African societies.</p>
      
      <h3>Nutritional Wisdom</h3>
      <p>Our ancestors understood the medicinal and nutritional properties of these greens long before modern science confirmed their benefits. Callaloo, for instance, is rich in iron, calcium, and vitamins A and C—essential nutrients that support healthy blood, strong bones, and robust immune systems.</p>
      
      <h3>Community Connection</h3>
      <p>In West African communities, the preparation and sharing of these greens often involves multiple generations working together. Grandmothers teach their grandchildren the proper way to clean and cook these vegetables, passing down not just recipes, but cultural values and family stories.</p>
      
      <h3>Modern Relevance</h3>
      <p>Today, as West African communities have spread across the globe, these greens serve as powerful reminders of home and heritage. For many in the diaspora, cooking with traditional greens is a way to maintain cultural connections and share their heritage with new generations.</p>
      
      <h3>Our Mission</h3>
      <p>At Heritage Farms, we're committed to preserving these cultural connections through sustainable farming practices. By growing these heritage crops in our Ontario greenhouse, we're not just providing fresh, nutritious food—we're helping to maintain cultural traditions and strengthen community bonds.</p>
      
      <p>Every time you enjoy our heritage greens, you're participating in a tradition that spans continents and generations. You're not just eating vegetables—you're connecting with a rich cultural heritage that continues to nourish both body and soul.</p>
    `
  },
  {
    id: 2,
    title: "Sustainable Farming: Our Greenhouse Innovation",
    excerpt: "Learn about our advanced greenhouse technology and how it enables year-round production while minimizing environmental impact. Our innovative systems represent the future of sustainable agriculture.",
    image: "/branding/Images/products/optimized/fluted-pumpkin-leaves.webp",
    date: "December 10, 2024",
    category: "Sustainability",
    readTime: "7 min read",
    content: `
      <h2>Sustainable Farming: Our Greenhouse Innovation</h2>
      <p>At Heritage Farms, we believe that the future of agriculture lies in sustainable, technology-driven solutions that respect both the environment and traditional farming wisdom. Our state-of-the-art greenhouse represents a perfect marriage of innovation and heritage.</p>
      
      <h3>The Technology Behind Our Success</h3>
      <p>Our greenhouse utilizes advanced hydroponic systems that allow us to grow heritage crops year-round, regardless of Ontario's challenging climate. This technology enables us to provide fresh, locally-grown West African vegetables even during the coldest winter months.</p>
      
      <h3>Water Conservation</h3>
      <p>Our hydroponic systems use up to 90% less water than traditional field farming. Water is recirculated through the system, with any excess being filtered and reused. This closed-loop system ensures that every drop of water is maximized for plant growth.</p>
      
      <h3>Energy Efficiency</h3>
      <p>We've invested in energy-efficient lighting and climate control systems that minimize our carbon footprint. Our greenhouse uses LED grow lights that provide optimal light spectrum for plant growth while consuming significantly less energy than traditional lighting systems.</p>
      
      <h3>Pest Management</h3>
      <p>Instead of relying on chemical pesticides, we use integrated pest management (IPM) techniques. This includes introducing beneficial insects, using physical barriers, and maintaining optimal growing conditions that naturally deter pests.</p>
      
      <h3>Local Impact</h3>
      <p>By growing heritage crops locally, we're reducing the environmental impact of long-distance food transportation. Our produce travels from farm to table in hours, not days, ensuring maximum freshness while minimizing carbon emissions.</p>
      
      <h3>Community Education</h3>
      <p>We're committed to sharing our knowledge with the community. Through workshops and farm tours, we demonstrate how sustainable farming practices can be implemented on both small and large scales.</p>
      
      <h3>Looking Forward</h3>
      <p>As we continue to grow, we're exploring additional sustainable technologies, including solar power integration and advanced composting systems. Our goal is to become a model for sustainable heritage crop production in Canada.</p>
      
      <p>Every innovation we implement is guided by our commitment to environmental stewardship and cultural preservation. We're not just growing food—we're growing a sustainable future for heritage farming.</p>
    `
  },
  {
    id: 3,
    title: "From Farm to Table: The Journey of Heritage Crops",
    excerpt: "Follow the journey of our heritage crops from seed to your plate, ensuring freshness and traceability every step of the way. Discover how we maintain quality and cultural authenticity throughout the process.",
    image: "/branding/Images/products/jute_leaves.webp",
    date: "December 5, 2024",
    category: "Farm Stories",
    readTime: "4 min read",
    content: `
      <h2>From Farm to Table: The Journey of Heritage Crops</h2>
      <p>Every heritage crop that reaches your table has traveled a carefully managed journey from seed to harvest to delivery. At Heritage Farms, we believe that understanding this journey helps our customers appreciate not just the quality of our produce, but the cultural significance behind each leaf and stem.</p>
      
      <h3>The Seed Selection Process</h3>
      <p>Our journey begins with carefully selected seeds that maintain the authentic characteristics of traditional West African varieties. We work with seed banks and traditional farmers to ensure we're growing the same varieties that have been cultivated for generations.</p>
      
      <h3>Germination and Early Growth</h3>
      <p>Seeds are germinated in our controlled environment, where temperature, humidity, and light are carefully monitored. This ensures optimal conditions for healthy seedling development and strong root systems.</p>
      
      <h3>Hydroponic Cultivation</h3>
      <p>Once seedlings are established, they're transferred to our hydroponic systems. Here, they receive precisely balanced nutrients, optimal lighting, and perfect growing conditions that allow them to develop their full flavor and nutritional profile.</p>
      
      <h3>Quality Monitoring</h3>
      <p>Throughout the growing process, we continuously monitor plant health, nutrient levels, and environmental conditions. Our team conducts regular inspections to ensure that every plant meets our high standards for quality and authenticity.</p>
      
      <h3>Harvesting with Care</h3>
      <p>Harvesting is done by hand, following traditional methods that ensure the best quality and flavor. Our team is trained to recognize the perfect harvest time for each crop, ensuring maximum nutritional value and authentic taste.</p>
      
      <h3>Post-Harvest Processing</h3>
      <p>Immediately after harvest, our greens are carefully cleaned, sorted, and packaged. We use minimal processing to preserve the natural qualities and cultural authenticity of each crop.</p>
      
      <h3>Quality Assurance</h3>
      <p>Every batch undergoes quality testing to ensure it meets our standards for freshness, safety, and cultural authenticity. We maintain detailed records of every step in the process for complete traceability.</p>
      
      <h3>Delivery to Your Table</h3>
      <p>Our produce is delivered fresh to local markets, restaurants, and directly to customers. The short distance from farm to table ensures maximum freshness and allows us to maintain the cultural connection that makes these crops special.</p>
      
      <h3>Cultural Preservation</h3>
      <p>Throughout this entire journey, we maintain the cultural significance of these crops. Every step is guided by traditional knowledge and respect for the heritage these vegetables represent.</p>
      
      <p>When you enjoy our heritage crops, you're not just eating fresh, nutritious vegetables—you're experiencing a piece of cultural history that has been carefully preserved and nurtured from seed to table.</p>
    `
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-gilroy font-bold text-[#404A3D] mb-6">
              Heritage Farms Blog
            </h1>
            <p className="text-lg font-gilroy text-gray-600 max-w-3xl mx-auto">
              Discover the stories behind our heritage crops, learn about sustainable farming practices, and explore the cultural significance of West African agriculture.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  <span className="inline-block px-3 py-1 bg-[#BFF106] text-[#404A3D] font-gilroy font-semibold text-xs rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center justify-between text-base text-gray-500 mb-3">
                  <span className="font-gilroy">{post.date}</span>
                  <span className="font-gilroy">{post.readTime}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-gilroy font-bold text-[#404A3D] mb-3 group-hover:text-[#5B8C51] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 font-gilroy text-base leading-relaxed mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read More Link */}
                <Link 
                  href={`/blog/${post.id}`} 
                  className="inline-flex items-center text-[#5B8C51] font-gilroy font-semibold text-base hover:text-[#404A3D] transition-colors"
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
      </div>
    </div>
  );
}
