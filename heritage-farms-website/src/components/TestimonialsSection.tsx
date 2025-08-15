'use client';



const testimonials = [
  {
    id: 1,
    name: "Aisha Johnson",
    role: "Home Chef & Food Blogger",
    image: "/branding/Images/products/optimized/callaloo-amaranth.webp",
    quote: "Heritage Farms has transformed my cooking! The callaloo is so fresh and authentic - it tastes exactly like what my grandmother used to make. The quality is unmatched and delivery is always on time.",
    rating: 5,
    location: "Toronto, ON"
  },
  {
    id: 2,
    name: "Marcus Thompson",
    role: "Restaurant Owner",
    image: "/branding/Images/products/optimized/fluted-pumpkin-leaves.webp",
    quote: "As a restaurant owner, I need high-quality ingredients. Heritage Farms delivers exactly that. Their fluted pumpkin leaves are a customer favorite and have helped us create authentic West African dishes.",
    rating: 5,
    location: "Mississauga, ON"
  },
  {
    id: 3,
    name: "Fatima Hassan",
    role: "Community Health Worker",
    image: "/branding/Images/products/optimized/jute_leaves.webp",
    quote: "I recommend Heritage Farms to all my clients who are looking for traditional ingredients. It's wonderful to have access to these greens locally.",
    rating: 5,
    location: "Brampton, ON"
  },
  {
    id: 4,
    name: "David Adeola",
    role: "Food Enthusiast",
    image: "/branding/Images/products/optimized/waterleaf-gbure.jpeg",
    quote: "I discovered Heritage Farms through a friend and I'm so glad I did! Their waterleaf is incredibly fresh and has introduced me to new flavors. The farm's commitment to sustainable practices makes me feel good about supporting them.",
    rating: 5,
    location: "Markham, ON"
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
    <section className="py-20 bg-[#3A7817]" aria-labelledby="testimonials-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 id="testimonials-heading" className="text-5xl md:text-6xl font-gilroy font-medium text-[#EAFDE7] mb-6">
            What our customers say
          </h2>
          <p className="text-lg font-gilroy text-[#00312D] max-w-3xl mx-auto">
            Read from our valued customers about their experience with our products.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mb-12">
          <button
            onClick={prevSlide}
            className="w-12 h-12 border border-[#00312D] rounded-full flex items-center justify-center text-[#00312D] hover:bg-[#00312D] hover:text-[#EAFDE7] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00312D] focus:ring-offset-2"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="w-12 h-12 border border-[#00312D] rounded-full flex items-center justify-center text-[#00312D] hover:bg-[#00312D] hover:text-[#EAFDE7] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#00312D] focus:ring-offset-2"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" role="region" aria-label="Customer testimonials">
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 group focus-within:ring-2 focus-within:ring-[#EDDD5E] focus-within:ring-offset-2">
              {/* Quote Icon */}
              <div className="w-12 h-12 bg-[#EDDD5E] rounded-full flex items-center justify-center mx-auto -mt-6 mb-6" aria-hidden="true">
                <svg className="w-6 h-6 text-[#404A3D]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Quote */}
                <p className="text-[#00312D] font-gilroy leading-relaxed mb-4">
                  {testimonial.quote}
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-[#00312D] rounded-full flex items-center justify-center mr-4">
                    <span className="text-[#EAFDE7] font-gilroy font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-gilroy font-semibold text-[#00312D]">
                      {testimonial.name}
                    </h4>
                    <p className="text-[#00312D] font-gilroy text-sm">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-[#EAFDE7]/80 text-lg mb-6">
            Join our community of satisfied customers
          </p>
          <a
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-[#00312D] text-[#EAFDE7] font-gilroy font-semibold rounded-full hover:bg-[#002A26] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#00312D] focus:ring-offset-2"
          >
            Shop Our Products
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 