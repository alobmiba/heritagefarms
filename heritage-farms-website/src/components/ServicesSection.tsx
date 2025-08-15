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
        {/* Two Column Layout: Grid + Text */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-12">
          {/* Left Column: Heritage Crops Grid */}
          <div className="flex justify-start">
            <div className="w-[584px] h-[385px] grid grid-cols-2 grid-rows-2 gap-6">
              {heritageCrops.map((crop) => (
                <div key={crop.id} className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={crop.image}
                      alt={crop.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-2 left-2">
                      <span className="inline-block px-3 py-1 bg-[#BFF106] text-[#404A3D] font-gilroy font-semibold text-sm rounded-full">
                        {crop.title}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-2">
                    {/* Title with Info Icon */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-gilroy font-bold text-[#00312D] group-hover:text-[#5B8C51] transition-colors truncate">
                        {crop.title}
                      </h3>
                      <div className="relative group">
                        <div className="w-3 h-3 bg-gray-300 rounded-full flex items-center justify-center cursor-help ml-1">
                          <svg className="w-2 h-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                          {crop.description}
                          <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: OurPurpose Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-gilroy font-bold text-[#EAFDE7]">
                Our Flagship Greens
              </h2>
            </div>
            <div className="space-y-6">
              <p className="text-lg font-gilroy text-[#EAFDE7] leading-relaxed">
                Discover the authentic flavors of West African and Caribbean cuisine, cultivated with care in our sustainable greenhouse. Each crop tells a story of tradition, connecting communities to their cultural roots through food.
              </p>
            </div>
            <a href="/products" className="inline-block bg-[#00312D] text-[#EAFDE7] font-gilroy font-semibold px-8 py-4 rounded-lg hover:bg-opacity-90 transition-all duration-300 text-lg">
              Shop now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 