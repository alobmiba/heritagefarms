
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function BenefitsSection() {
  const [counts, setCounts] = useState({
    water: 0,
    carbon: 0,
    yield: 0,
    waste: 0
  });

  useEffect(() => {
    const targetCounts = {
      water: 75,
      carbon: 50,
      yield: 90,
      waste: 100
    };

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      setCounts(prevCounts => {
        const newCounts = { ...prevCounts };
        let allComplete = true;

        Object.keys(targetCounts).forEach(key => {
          if (newCounts[key] < targetCounts[key]) {
            newCounts[key] = Math.min(
              newCounts[key] + Math.ceil(targetCounts[key] / steps),
              targetCounts[key]
            );
            allComplete = false;
          }
        });

        if (allComplete) {
          clearInterval(timer);
        }

        return newCounts;
      });
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);
  return (
    <section 
      className="relative min-h-[600px] bg-cover bg-fixed bg-center overflow-hidden" 
      style={{ backgroundImage: "url('https://validthemes.net/site-template/agrica/assets/img/banner/16.jpg')" }}
      aria-label="Benefits of Heritage Farms organic produce"
    >
      
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <iframe
          className="w-[140%] h-[140%] -mt-[120px] -ml-[200px] pointer-events-none opacity-60"
          src="https://www.youtube-nocookie.com/embed/w9eRIGTHKJM?autoplay=1&mute=1&controls=0&start=13&loop=1&playlist=w9eRIGTHKJM&modestbranding=1&rel=0&showinfo=0"
          title="Awesome Farm Drone Footage"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>

      {/* Shape Overlay */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 w-full h-32 bg-gradient-to-b from-black/30 to-transparent"></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 py-24 text-white">
        <div className="flex justify-start">
          <div className="bg-[#F8F7F0]/90 backdrop-blur-sm rounded-2xl p-6 w-[500px] h-[500px] shadow-2xl">
            <div className="text-center mb-6">
              <h3 className="text-xl font-gilroy font-bold text-[#404A3D] mb-2">Key Sustainability Metrics</h3>
              <p className="text-xs font-gilroy text-gray-600">Measurable impact through water savings, carbon reduction, yield, and waste diversion.</p>
            </div>
                         <div className="grid grid-cols-2 gap-4">
               <div className="bg-[#EAFDE7]/80 rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                 <div className="w-8 h-8 bg-[#00312D] rounded-full flex items-center justify-center mx-auto mb-3">
                   <svg className="w-4 h-4 text-[#EAFDE7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                   </svg>
                 </div>
                 <div className="text-lg font-gilroy font-bold text-[#00312D] mb-1">{counts.water}%</div>
                 <h3 className="text-xs font-gilroy font-semibold text-[#404A3D] mb-1">Less Water Used</h3>
                 <p className="text-[#00312D] font-gilroy text-xs">vs. field-grown imports</p>
               </div>
               <div className="bg-[#EAFDE7]/80 rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                 <div className="w-8 h-8 bg-[#00312D] rounded-full flex items-center justify-center mx-auto mb-3">
                   <svg className="w-4 h-4 text-[#EAFDE7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                   </svg>
                 </div>
                 <div className="text-lg font-gilroy font-bold text-[#00312D] mb-1">{counts.carbon}%</div>
                 <h3 className="text-xs font-gilroy font-semibold text-[#404A3D] mb-1">Lower Carbon Footprint</h3>
                 <p className="text-[#00312D] font-gilroy text-xs">Food-mile reduction</p>
               </div>
               <div className="bg-[#EAFDE7]/80 rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                 <div className="w-8 h-8 bg-[#00312D] rounded-full flex items-center justify-center mx-auto mb-3">
                   <svg className="w-4 h-4 text-[#EAFDE7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                   </svg>
                 </div>
                 <div className="text-lg font-gilroy font-bold text-[#00312D] mb-1">{counts.yield}%</div>
                 <h3 className="text-xs font-gilroy font-semibold text-[#404A3D] mb-1">Year-Round Yield</h3>
                 <p className="text-[#00312D] font-gilroy text-xs">Greenhouse capacity</p>
               </div>
               <div className="bg-[#EAFDE7]/80 rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all duration-300">
                 <div className="w-8 h-8 bg-[#00312D] rounded-full flex items-center justify-center mx-auto mb-3">
                   <svg className="w-4 h-4 text-[#EAFDE7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                   </svg>
                 </div>
                 <div className="text-lg font-gilroy font-bold text-[#00312D] mb-1">{counts.waste}%</div>
                 <h3 className="text-xs font-gilroy font-semibold text-[#404A3D] mb-1">Waste Diverted</h3>
                 <p className="text-[#00312D] font-gilroy text-xs">Via on-site composting</p>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Bottom Shape Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
    </section>
  );
}
