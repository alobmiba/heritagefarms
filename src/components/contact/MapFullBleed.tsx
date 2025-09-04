"use client";

const ADDRESS = "16 Twin Sisters Lake Road, Marmora, Ontario, Canada";
const EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(
  ADDRESS
)}&z=14&output=embed`;

export function MapFullBleed() {
  return (
    <section className="relative bg-white py-16 md:py-24">
      <div className="container-max">
        {/* Map Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-[#00312D] text-[#EAFDE7] font-gilroy font-semibold text-sm rounded-full mb-4">
            Our Location
          </span>
          <h2 className="text-3xl md:text-4xl font-gilroy-extrabold text-[#404A3D] mb-4">
            Visit Our Farm
          </h2>
          <p className="text-xl text-gray-600 font-gilroy font-medium max-w-2xl mx-auto">
            Come see where we grow authentic African heritage greens in the heart of Ontario.
          </p>
        </div>

        {/* Map Container */}
        <div className="relative">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Map with aspect ratio */}
            <div className="aspect-[16/9] md:aspect-[21/9]">
              <iframe
                title={`Map showing ${ADDRESS}`}
                src={EMBED_SRC}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0"
              />
            </div>
            
            {/* Map Overlay Info */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-sm">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#5B8C51] to-[#3A7817] rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-lg font-gilroy font-bold text-[#404A3D] mb-1">
                    Heritage Farms
                  </h4>
                  <p className="text-sm text-gray-600 font-gilroy mb-2">
                    16 Twin Sisters Lake Road<br />
                    Marmora, Ontario, Canada
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      ADDRESS
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#5B8C51] hover:text-[#3A7817] font-gilroy font-semibold text-sm transition-colors"
                  >
                    Get Directions
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-[#EDDD5E] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[#404A3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-gilroy font-bold text-[#404A3D] mb-2">Visit Hours</h4>
              <p className="text-gray-600 font-gilroy">
                Monday - Friday<br />
                9:00 AM - 6:00 PM
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-[#EDDD5E] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[#404A3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h4 className="text-lg font-gilroy font-bold text-[#404A3D] mb-2">Call Ahead</h4>
              <p className="text-gray-600 font-gilroy">
                For farm visits<br />
                +1 (123) 456-7890
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-[#EDDD5E] rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-[#404A3D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-gilroy font-bold text-[#404A3D] mb-2">Free Parking</h4>
              <p className="text-gray-600 font-gilroy">
                Ample parking available<br />
                for all visitors
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Accessible fallback link for keyboard/screen-reader users */}
      <p className="sr-only">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            ADDRESS
          )}`}
          rel="noopener noreferrer"
        >
          Open map to {ADDRESS}
        </a>
      </p>
    </section>
  );
}
