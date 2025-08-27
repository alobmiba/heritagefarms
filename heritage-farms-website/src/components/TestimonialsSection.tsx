'use client';

import React from 'react';

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-[#EAFDE7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-gilroy font-bold text-[#00312D] mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg font-gilroy text-gray-600 max-w-3xl mx-auto">
            Discover why our community loves Heritage Farms&apos; fresh, sustainable produce.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#3A7817] rounded-full flex items-center justify-center text-white font-bold text-lg">
                S
              </div>
              <div className="ml-4">
                <h4 className="font-gilroy font-semibold text-[#00312D]">Sarah Johnson</h4>
                <p className="text-sm text-gray-600">Local Chef</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              &ldquo;The quality of Heritage Farms&apos; greens is exceptional. The callaloo and fluted pumpkin leaves bring authentic Caribbean flavors to my dishes.&rdquo;
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#3A7817] rounded-full flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <div className="ml-4">
                <h4 className="font-gilroy font-semibold text-[#00312D]">Michael Chen</h4>
                <p className="text-sm text-gray-600">Health Enthusiast</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              &ldquo;I love knowing exactly where my food comes from. Heritage Farms&apos; commitment to sustainability and local growing is inspiring.&rdquo;
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-[#3A7817] rounded-full flex items-center justify-center text-white font-bold text-lg">
                A
              </div>
              <div className="ml-4">
                <h4 className="font-gilroy font-semibold text-[#00312D]">Aisha Patel</h4>
                <p className="text-sm text-gray-600">Home Cook</p>
              </div>
            </div>
            <p className="text-gray-700 italic">
              &ldquo;Finally, I can find the traditional greens my grandmother used to cook with. Heritage Farms makes me feel connected to my roots.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
