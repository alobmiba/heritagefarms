export const revalidate = 86400;
export const dynamic = 'force-static';
import React from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8F7F0]">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-[#404A3D] to-[#2D3328]">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-7xl font-gilroy font-bold mb-6">
              About Heritage Farms
            </h1>
                         <p className="text-xl font-gilroy text-white/90 max-w-3xl mx-auto">
               Reconnecting Caribbean & West African greens with Canadian-grown freshness, every season.
             </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-gilroy font-bold text-[#404A3D] mb-6">
                Our Vision
              </h2>
                             <p className="text-lg font-gilroy text-gray-600 mb-6">
                 To become the leading provider of authentic West African and Caribbean produce in Ontario, 
                 bridging cultural heritage with sustainable farming practices while ensuring food security 
                 and cultural preservation for diaspora communities.
               </p>
               <p className="text-lg font-gilroy text-gray-600">
                 We envision a future where traditional crops are accessible year-round, supporting both 
                 cultural identity and local food systems through innovative greenhouse technology and 
                 sustainable agricultural practices.
               </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/branding/Images/banner/homebanner.png"
                alt="Heritage Farms Vision"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-6 py-2 bg-white rounded-full mb-6 border border-[#5B8C51]">
              <svg className="w-4 h-4 text-[#5B8C51] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span className="text-[#5B8C51] font-gilroy-extrabold font-medium text-sm uppercase tracking-wider">Our History</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-gilroy-extrabold font-medium text-[#404A3D] mb-6">
              Farming have been since
              <span className="block">1866</span>
            </h2>
            <p className="text-gray-600 font-gilroy text-lg max-w-4xl mx-auto leading-relaxed">
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#5B8C51]/20"></div>
            <div className="space-y-16">
              <div className="relative flex items-center flex-row">
                <div className="w-1/2 pr-12 text-right">
                  <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <h3 className="text-2xl font-gilroy-extrabold font-medium text-[#404A3D] mb-4">Open my Farm</h3>
                    <p className="text-gray-600 font-gilroy text-base leading-relaxed">Corrupti ut consequatur magni minus! Iusto eos consectetur similique minus culpa odio temporibus.</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#5B8C51] rounded-full border-4 border-white shadow-lg"></div>
                <div className="absolute left-1/2 ml-8 transform -translate-y-1/2">
                  <div className="bg-[#5B8C51] text-white px-4 py-2 rounded-full font-gilroy-extrabold font-bold text-lg">1987</div>
                </div>
              </div>
              
              <div className="relative flex items-center flex-row-reverse">
                <div className="w-1/2 pl-12 text-left">
                  <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <h3 className="text-2xl font-gilroy-extrabold font-medium text-[#404A3D] mb-4">Farm Remodelacion</h3>
                    <p className="text-gray-600 font-gilroy text-base leading-relaxed">Majority have suffered alteration in some form by injected humor culpa odio temporibus.</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#5B8C51] rounded-full border-4 border-white shadow-lg"></div>
                <div className="absolute right-1/2 mr-8 transform -translate-y-1/2">
                  <div className="bg-[#5B8C51] text-white px-4 py-2 rounded-full font-gilroy-extrabold font-bold text-lg">1995</div>
                </div>
              </div>
              
              <div className="relative flex items-center flex-row">
                <div className="w-1/2 pr-12 text-right">
                  <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <h3 className="text-2xl font-gilroy-extrabold font-medium text-[#404A3D] mb-4">Grainfarmers Formed</h3>
                    <p className="text-gray-600 font-gilroy text-base leading-relaxed">Always parties but trying she shewing of moment minus Velit ratione hic corporis veritatis odit.</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#5B8C51] rounded-full border-4 border-white shadow-lg"></div>
                <div className="absolute left-1/2 ml-8 transform -translate-y-1/2">
                  <div className="bg-[#5B8C51] text-white px-4 py-2 rounded-full font-gilroy-extrabold font-bold text-lg">2000</div>
                </div>
              </div>
              
              <div className="relative flex items-center flex-row-reverse">
                <div className="w-1/2 pl-12 text-left">
                  <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <h3 className="text-2xl font-gilroy-extrabold font-medium text-[#404A3D] mb-4">Start of Agriculture</h3>
                    <p className="text-gray-600 font-gilroy text-base leading-relaxed">Consequatur magni Corrupti ut minus! Iusto eos consectetur similique minus culpa odio temporibus.</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#5B8C51] rounded-full border-4 border-white shadow-lg"></div>
                <div className="absolute right-1/2 mr-8 transform -translate-y-1/2">
                  <div className="bg-[#5B8C51] text-white px-4 py-2 rounded-full font-gilroy-extrabold font-bold text-lg">1910</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Value Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-gilroy font-bold text-[#404A3D] mb-6">
              Our Unique Value
            </h2>
                         <p className="text-xl font-gilroy text-gray-600 max-w-3xl mx-auto">
               What sets us apart in the agricultural landscape
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-[#EDDD5E] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#404A3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
                             <h3 className="text-2xl font-gilroy font-bold text-[#404A3D] mb-4">
                 Cultural Heritage
               </h3>
                             <p className="text-gray-600 font-gilroy">
                 Specialized in traditional West African and Caribbean crops, preserving cultural 
                 agricultural knowledge and providing authentic ingredients for diaspora communities.
               </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-[#EDDD5E] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#404A3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
                             <h3 className="text-2xl font-gilroy font-bold text-[#404A3D] mb-4">
                 Year-Round Availability
               </h3>
                             <p className="text-gray-600 font-gilroy">
                 Advanced greenhouse technology enables consistent production of seasonal crops 
                 throughout the year, ensuring reliable supply for our community.
               </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-[#EDDD5E] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[#404A3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-gilroy-extrabold font-bold text-[#404A3D] mb-4">
                Sustainable Practices
              </h3>
                             <p className="text-gray-600 font-gilroy">
                 Eco-friendly farming methods with 75% less water usage, 50% lower carbon footprint, 
                 and 100% waste diversion through on-site composting.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
                         <h2 className="text-4xl font-gilroy font-bold text-[#404A3D] mb-6">
               Our Impact
             </h2>
                         <p className="text-xl font-gilroy text-gray-600 max-w-3xl mx-auto">
               Creating positive change in our community and environment
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-[#EDDD5E] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-[#404A3D]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                                     <h3 className="text-xl font-gilroy font-bold text-[#404A3D] mb-2">
                     Cultural Preservation
                   </h3>
                                     <p className="text-gray-600 font-gilroy">
                     Bringing traditional West African and Caribbean crops to Ontario communities, 
                     preserving cultural agricultural knowledge and providing authentic ingredients.
                   </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-[#EDDD5E] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-[#404A3D]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                                     <h3 className="text-xl font-gilroy font-bold text-[#404A3D] mb-2">
                     Economic Empowerment
                   </h3>
                                     <p className="text-gray-600 font-gilroy">
                     Creating opportunities in the agricultural sector for underrepresented communities 
                     and supporting local food systems with sustainable business practices.
                   </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-6 h-6 bg-[#EDDD5E] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-3 h-3 text-[#404A3D]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                                     <h3 className="text-xl font-gilroy font-bold text-[#404A3D] mb-2">
                     Environmental Stewardship
                   </h3>
                                     <p className="text-gray-600 font-gilroy">
                     Implementing sustainable farming practices that protect our environment, 
                     reduce carbon footprint, and promote biodiversity in our agricultural systems.
                   </p>
                </div>
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/branding/Images/banner/homebanner2.png"
                alt="Heritage Farms Impact"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Growing Techniques Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
                         <h2 className="text-4xl font-gilroy font-bold text-[#404A3D] mb-6">
               Growing Techniques
             </h2>
                         <p className="text-xl font-gilroy text-gray-600 max-w-3xl mx-auto">
               Advanced methods combining traditional knowledge with modern technology
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#F8F7F0] rounded-2xl p-8">
                             <h3 className="text-2xl font-gilroy font-bold text-[#404A3D] mb-4">
                 Greenhouse Technology
               </h3>
                             <p className="text-gray-600 font-gilroy mb-4">
                 State-of-the-art climate-controlled greenhouses enable year-round production 
                 of traditional crops, maintaining optimal growing conditions regardless of 
                 external weather patterns.
               </p>
                             <ul className="space-y-2 text-gray-600 font-gilroy">
                 <li>• Temperature and humidity control</li>
                 <li>• Automated irrigation systems</li>
                 <li>• Natural pest management</li>
                 <li>• Energy-efficient lighting</li>
               </ul>
            </div>

            <div className="bg-[#F8F7F0] rounded-2xl p-8">
              <h3 className="text-2xl font-gilroy-extrabold font-bold text-[#404A3D] mb-4">
                Sustainable Practices
              </h3>
                             <p className="text-gray-600 font-gilroy mb-4">
                 Our farming methods prioritize environmental responsibility and resource conservation 
                 while maintaining high-quality crop production.
               </p>
                             <ul className="space-y-2 text-gray-600 font-gilroy">
                 <li>• Organic soil management</li>
                 <li>• Water recycling systems</li>
                 <li>• Compost-based fertilization</li>
                 <li>• Integrated pest management</li>
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure & Capabilities Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
                         <h2 className="text-4xl font-gilroy font-bold text-[#404A3D] mb-6">
               Infrastructure & Capabilities
             </h2>
                         <p className="text-xl font-gilroy text-gray-600 max-w-3xl mx-auto">
               Our facilities and operational capacity
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-[#EDDD5E] rounded-full flex items-center justify-center mx-auto mb-6">
                                 <span className="text-3xl font-gilroy font-bold text-[#404A3D]">10K</span>
              </div>
                             <h3 className="text-xl font-gilroy font-bold text-[#404A3D] mb-2">
                 Square Feet
               </h3>
                             <p className="text-gray-600 font-gilroy">
                 Total greenhouse space for year-round production
               </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#EDDD5E] rounded-full flex items-center justify-center mx-auto mb-6">
                                 <span className="text-3xl font-gilroy font-bold text-[#404A3D]">50+</span>
              </div>
                             <h3 className="text-xl font-gilroy font-bold text-[#404A3D] mb-2">
                 Heritage Crops
               </h3>
                             <p className="text-gray-600 font-gilroy">
                 Traditional varieties cultivated and preserved
               </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-[#EDDD5E] rounded-full flex items-center justify-center mx-auto mb-6">
                                 <span className="text-3xl font-gilroy font-bold text-[#404A3D]">90%</span>
              </div>
                             <h3 className="text-xl font-gilroy font-bold text-[#404A3D] mb-2">
                 Year-Round Yield
               </h3>
                             <p className="text-gray-600 font-gilroy">
                 Consistent production capacity throughout the year
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Operations Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
                         <h2 className="text-4xl font-gilroy font-bold text-[#404A3D] mb-6">
               Operations
             </h2>
                         <p className="text-xl font-gilroy text-gray-600 max-w-3xl mx-auto">
               How we bring traditional crops to your table
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                                 <h3 className="text-2xl font-gilroy font-bold text-[#404A3D] mb-4">
                   Production Cycle
                 </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[#EDDD5E] rounded-full flex items-center justify-center">
                                             <span className="text-sm font-gilroy font-bold text-[#404A3D]">1</span>
                    </div>
                                         <p className="text-gray-600 font-gilroy">Seed selection and preparation</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[#EDDD5E] rounded-full flex items-center justify-center">
                                             <span className="text-sm font-gilroy font-bold text-[#404A3D]">2</span>
                    </div>
                                         <p className="text-gray-600 font-gilroy">Controlled environment cultivation</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[#EDDD5E] rounded-full flex items-center justify-center">
                                             <span className="text-sm font-gilroy font-bold text-[#404A3D]">3</span>
                    </div>
                                         <p className="text-gray-600 font-gilroy">Sustainable harvesting methods</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[#EDDD5E] rounded-full flex items-center justify-center">
                                             <span className="text-sm font-gilroy font-bold text-[#404A3D]">4</span>
                    </div>
                                         <p className="text-gray-600 font-gilroy">Quality control and packaging</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[#EDDD5E] rounded-full flex items-center justify-center">
                                             <span className="text-sm font-gilroy font-bold text-[#404A3D]">5</span>
                    </div>
                                         <p className="text-gray-600 font-gilroy">Direct delivery to community</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="/branding/Images/banner/homebanner.png"
                alt="Heritage Farms Operations"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
} 