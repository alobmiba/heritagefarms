'use client';

const clientLogos = [
  {
    id: 1,
    name: "Client 1",
    logo: "/branding/Images/products/callaloo-amaranth.png"
  },
  {
    id: 2,
    name: "Client 2",
    logo: "/branding/Images/products/fluted-pumpkin-leaves.png"
  },
  {
    id: 3,
    name: "Client 3",
    logo: "/branding/Images/products/jute_leaves.webp"
  },
  {
    id: 4,
    name: "Client 4",
    logo: "/branding/Images/products/raw-honey.jpg"
  },
  {
    id: 5,
    name: "Client 5",
    logo: "/branding/Images/products/red-onions.jpg"
  },
  {
    id: 6,
    name: "Client 6",
    logo: "/branding/Images/products/scent-leaves.jpeg"
  }
];

export default function ClientLogosSection() {
  return (
    <section className="py-16 bg-white border-t border-[#5B8C51]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {clientLogos.map((client) => (
            <div key={client.id} className="flex justify-center items-center h-20 group">
              <div className="w-24 h-16 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-[#EDDD5E]/20 transition-all duration-300">
                <div className="text-[#5B8C51] font-gilroy-extrabold font-bold text-lg">
                  {client.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 