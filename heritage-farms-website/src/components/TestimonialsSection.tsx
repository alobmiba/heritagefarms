'use client';


import Image from 'next/image';

const testimonials = [
  {
    id: 1,
    name: "Martin Bailey",
    role: "Supervisor",
    image: "/branding/Images/products/raw-honey.jpg",
    quote: "I would recommend practitioners at this center to everyone! They are great to work with and are excellent trainers. Thank you all!",
    rating: 5
  },
  {
    id: 2,
    name: "Emma Greed",
    role: "Customer",
    image: "/branding/Images/products/red-onions.jpg",
    quote: "I would recommend practitioners at this center to everyone! They are great to work with and are excellent trainers. Thank you all!",
    rating: 5
  },
  {
    id: 3,
    name: "Daniel Craig",
    role: "Co Founder",
    image: "/branding/Images/products/scent-leaves.jpeg",
    quote: "I would recommend practitioners at this center to everyone! They are great to work with and are excellent trainers. Thank you all!",
    rating: 5
  },
  {
    id: 4,
    name: "Sarah Johnson",
    role: "Manager",
    image: "/branding/Images/products/waterleaf-gbure.jpeg",
    quote: "I would recommend practitioners at this center to everyone! They are great to work with and are excellent trainers. Thank you all!",
    rating: 5
  }
];

export default function TestimonialsSection() {
  const nextSlide = () => {
    // Navigation functionality can be implemented here
  };

  const prevSlide = () => {
    // Navigation functionality can be implemented here
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-2 bg-white rounded-full mb-6 border border-[#5B8C51]">
            <svg className="w-4 h-4 text-[#5B8C51] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-[#5B8C51] font-gilroy font-medium text-sm uppercase tracking-wider">testimonial</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-gilroy font-medium text-[#404A3D] mb-6">
            What our customers say
          </h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={prevSlide}
            className="w-12 h-12 border border-[#404A3D] rounded-full flex items-center justify-center text-[#404A3D] hover:bg-[#404A3D] hover:text-white transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="w-12 h-12 border border-[#404A3D] rounded-full flex items-center justify-center text-[#404A3D] hover:bg-[#404A3D] hover:text-white transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group">
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-[#EDDD5E] rounded-full flex items-center justify-center mx-auto -mt-6 mb-6">
                <svg className="w-6 h-6 text-[#404A3D]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Quote */}
                <blockquote className="text-gray-600 font-gilroy text-lg leading-relaxed mb-6 italic">
                  &quot;{testimonial.quote}&quot;
                </blockquote>

                {/* Rating */}
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-[#FDCF00]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-gilroy font-medium text-[#404A3D] text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 font-gilroy text-sm">
                      {testimonial.role}
                    </p>
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