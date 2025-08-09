'use client';

const historyItems = [
  {
    id: 1,
    year: "1987",
    title: "Open my Farm",
    description: "Corrupti ut consequatur magni minus! Iusto eos consectetur similique minus culpa odio temporibus."
  },
  {
    id: 2,
    year: "1995",
    title: "Farm Remodelacion",
    description: "Majority have suffered alteration in some form by injected humor culpa odio temporibus."
  },
  {
    id: 3,
    year: "2000",
    title: "Grainfarmers Formed",
    description: "Always parties but trying she shewing of moment minus Velit ratione hic corporis veritatis odit."
  },
  {
    id: 4,
    year: "1910",
    title: "Start of Agriculture",
    description: "Consequatur magni Corrupti ut minus! Iusto eos consectetur similique minus culpa odio temporibus."
  }
];

export default function HistorySection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#5B8C51]/20"></div>
          
          {/* Timeline Items */}
          <div className="space-y-16">
            {historyItems.map((item, index) => (
              <div key={item.id} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                {/* Content */}
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}>
                  <div className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
                    <h3 className="text-2xl font-gilroy-extrabold font-medium text-[#404A3D] mb-4">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 font-gilroy text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#5B8C51] rounded-full border-4 border-white shadow-lg"></div>

                {/* Year Badge */}
                <div className={`absolute ${index % 2 === 0 ? 'left-1/2 ml-8' : 'right-1/2 mr-8'} transform -translate-y-1/2`}>
                  <div className="bg-[#5B8C51] text-white px-4 py-2 rounded-full font-gilroy-extrabold font-bold text-lg">
                    {item.year}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 