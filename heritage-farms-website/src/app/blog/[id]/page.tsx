'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: "The Cultural Significance of West African Greens",
    excerpt: "Discover how traditional West African vegetables connect communities to their heritage and provide essential nutrition. These crops are more than just food—they&apos;re living links to cultural traditions that span generations.",
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
      <p>At Heritage Farms, we&apos;re committed to preserving these cultural connections through sustainable farming practices. By growing these heritage crops in our Ontario greenhouse, we&apos;re not just providing fresh, nutritious food—we&apos;re helping to maintain cultural traditions and strengthen community bonds.</p>
      
      <p>Every time you enjoy our heritage greens, you&apos;re participating in a tradition that spans continents and generations. You&apos;re not just eating vegetables—you&apos;re connecting with a rich cultural heritage that continues to nourish both body and soul.</p>
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
      <p>Our greenhouse utilizes advanced hydroponic systems that allow us to grow heritage crops year-round, regardless of Ontario&apos;s challenging climate. This technology enables us to provide fresh, locally-grown West African vegetables even during the coldest winter months.</p>
      
      <h3>Water Conservation</h3>
      <p>Our hydroponic systems use up to 90% less water than traditional field farming. Water is recirculated through the system, with any excess being filtered and reused. This closed-loop system ensures that every drop of water is maximized for plant growth.</p>
      
      <h3>Energy Efficiency</h3>
      <p>We&apos;ve invested in energy-efficient lighting and climate control systems that minimize our carbon footprint. Our greenhouse uses LED grow lights that provide optimal light spectrum for plant growth while consuming significantly less energy than traditional lighting systems.</p>
      
      <h3>Pest Management</h3>
      <p>Instead of relying on chemical pesticides, we use integrated pest management (IPM) techniques. This includes introducing beneficial insects, using physical barriers, and maintaining optimal growing conditions that naturally deter pests.</p>
      
      <h3>Local Impact</h3>
      <p>By growing heritage crops locally, we&apos;re reducing the environmental impact of long-distance food transportation. Our produce travels from farm to table in hours, not days, ensuring maximum freshness while minimizing carbon emissions.</p>
      
      <h3>Community Education</h3>
      <p>We&apos;re committed to sharing our knowledge with the community. Through workshops and farm tours, we demonstrate how sustainable farming practices can be implemented on both small and large scales.</p>
      
      <h3>Looking Forward</h3>
      <p>As we continue to grow, we&apos;re exploring additional sustainable technologies, including solar power integration and advanced composting systems. Our goal is to become a model for sustainable heritage crop production in Canada.</p>
      
      <p>Every innovation we implement is guided by our commitment to environmental stewardship and cultural preservation. We&apos;re not just growing food—we&apos;re growing a sustainable future for heritage farming.</p>
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
      <p>Our journey begins with carefully selected seeds that maintain the authentic characteristics of traditional West African varieties. We work with seed banks and traditional farmers to ensure we&apos;re growing the same varieties that have been cultivated for generations.</p>
      
      <h3>Germination and Early Growth</h3>
      <p>Seeds are germinated in our controlled environment, where temperature, humidity, and light are carefully monitored. This ensures optimal conditions for healthy seedling development and strong root systems.</p>
      
      <h3>Hydroponic Cultivation</h3>
      <p>Once seedlings are established, they&apos;re transferred to our hydroponic systems. Here, they receive precisely balanced nutrients, optimal lighting, and perfect growing conditions that allow them to develop their full flavor and nutritional profile.</p>
      
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
      
      <p>When you enjoy our heritage crops, you&apos;re not just eating fresh, nutritious vegetables—you&apos;re experiencing a piece of cultural history that has been carefully preserved and nurtured from seed to table.</p>
    `
  }
];

export default function BlogPostPage() {
  const params = useParams();
  const postId = parseInt(params.id as string);
  const post = blogPosts.find(p => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-gilroy font-bold text-[#404A3D] mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you&apos;re looking for doesn&apos;t exist.</p>
          <Link 
            href="/blog" 
            className="inline-flex items-center px-6 py-3 bg-[#00312D] text-[#EAFDE7] font-gilroy font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-[#5B8C51] font-gilroy font-medium hover:text-[#404A3D] transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </nav>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <span className="inline-block px-3 py-1 bg-[#BFF106] text-[#404A3D] font-gilroy font-semibold text-sm rounded-full">
                {post.category}
              </span>
              <span className="text-gray-500 font-gilroy text-sm">{post.date}</span>
              <span className="text-gray-500 font-gilroy text-sm">{post.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-gilroy font-bold text-[#404A3D] mb-6">
              {post.title}
            </h1>
            <p className="text-lg font-gilroy text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <article className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          {/* Featured Image */}
          <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>

          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none font-gilroy"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{
              '--tw-prose-headings': '#404A3D',
              '--tw-prose-body': '#374151',
              '--tw-prose-links': '#5B8C51',
            } as React.CSSProperties}
          />
        </article>

        {/* Related Posts */}
        <div className="mt-16">
          <h3 className="text-2xl font-gilroy font-bold text-[#404A3D] mb-8">Related Articles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPosts
              .filter(p => p.id !== post.id)
              .slice(0, 2)
              .map((relatedPost) => (
                <Link 
                  key={relatedPost.id} 
                  href={`/blog/${relatedPost.id}`}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-gilroy font-bold text-[#404A3D] mb-2 group-hover:text-[#5B8C51] transition-colors">
                      {relatedPost.title}
                    </h4>
                    <p className="text-gray-600 font-gilroy text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
