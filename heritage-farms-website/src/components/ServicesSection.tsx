'use client';


import Image from 'next/image';

const heritageCrops = [
  {
    id: 1,
    title: "Ugwu (Pumpkin Leaves)",
    category: "Leafy Greens",
    description: "Traditional Nigerian pumpkin leaves, rich in vitamins and minerals, perfect for soups and stews.",
    image: "/branding/Images/products/fluted-pumpkin-leaves.png",
    localName: "Ugwu"
  },
  {
    id: 2,
    title: "Ewedu (Jute Leaves)",
    category: "Leafy Greens",
    description: "Nutritious jute leaves known for their slimy texture, essential in traditional Yoruba cuisine.",
    image: "/branding/Images/products/jute_leaves.webp",
    localName: "Ewedu"
  },
  {
    id: 3,
    title: "Scent Leaf (Basil)",
    category: "Herbs",
    description: "Aromatic basil leaves used for flavoring and medicinal purposes in Nigerian cooking.",
    image: "/branding/Images/products/scent-leaves.jpeg",
    localName: "Efirin"
  },
  {
    id: 4,
    title: "Waterleaf",
    category: "Leafy Greens",
    description: "Succulent waterleaf, a staple in Nigerian vegetable soups and traditional dishes.",
    image: "/branding/Images/products/waterleaf-gbure.jpeg",
    localName: "Gbure"
  }
];

export default function ServicesSection() {

  return (
    <section className="py-20 bg-[#5B8C51] relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#EDDD5E] rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#EDDD5E] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#EDDD5E] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-2 bg-white rounded-full mb-6">
            <svg className="w-4 h-4 text-[#5B8C51] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <span className="text-[#5B8C51] font-gilroy font-medium text-sm uppercase tracking-wider">Product Teaser</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-gilroy font-medium text-white mb-6">
            Featured Heritage Crops
          </h2>
        </div>

        {/* Heritage Crops Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {heritageCrops.map((crop) => (
            <div key={crop.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
              {/* Image Container */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={crop.image}
                  alt={crop.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                
                {/* Local Name Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#BFF106] rounded-full">
                  <span className="text-[#404A3D] font-gilroy font-bold text-sm">
                    {crop.localName}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category Badge */}
                <div className="inline-flex items-center px-3 py-1 bg-[#EDDD5E] rounded-full mb-4">
                  <span className="text-[#404A3D] font-gilroy font-medium text-xs uppercase tracking-wider">
                    {crop.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-gilroy font-medium text-[#404A3D] mb-4 group-hover:text-[#5B8C51] transition-colors">
                  {crop.title}
                </h3>

                {/* Description */}
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-gray-600 font-gilroy text-sm leading-relaxed">
                    {crop.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <a 
            href="/products" 
            className="inline-flex items-center px-8 py-4 bg-[#BFF106] text-[#404A3D] font-gilroy font-semibold rounded-full hover:bg-opacity-90 transition-all duration-300 text-lg"
          >
            <span>View All Heritage Crops</span>
            <svg className="w-5 h-5 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 