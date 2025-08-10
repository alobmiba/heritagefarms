'use client';

import { useState, useEffect } from 'react';

const ADDRESS = "16 Twin Sisters Lake Road, Marmora, Ontario, Canada";
const GOOGLE_MAPS_URL = `https://maps.google.com/maps?q=${encodeURIComponent(ADDRESS)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

export function ContactPageMap() {
  const [iframeBlocked, setIframeBlocked] = useState(false);
  const [showStaticMap, setShowStaticMap] = useState(false);

  useEffect(() => {
    // Check if iframe is blocked after a short delay
    const timer = setTimeout(() => {
      const iframe = document.querySelector('iframe[title="Heritage Farms Location"]') as HTMLIFrameElement;
      if (iframe && iframe.contentWindow === null) {
        setIframeBlocked(true);
        setShowStaticMap(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleIframeError = () => {
    setIframeBlocked(true);
    setShowStaticMap(true);
  };

  return (
    <section className="contact-page-map relative w-full h-96 md:h-[500px]">
      {/* Primary Map Display */}
      <div className="absolute inset-0 w-full h-full">
        {!showStaticMap ? (
          <iframe 
            src={GOOGLE_MAPS_URL}
            className="w-full h-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            title="Heritage Farms Location"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
            onError={handleIframeError}
            style={{ zIndex: 3, position: 'absolute', height: '100%', width: '100%', padding: '0px', borderWidth: '0px', margin: '0px', left: '0px', top: '0px', touchAction: 'pan-x pan-y' }}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center relative">
            <div className="text-center p-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#5B8C51] rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="text-lg font-gilroy font-bold text-[#404A3D] mb-2">
                Heritage Farms Location
              </h4>
              <p className="text-gray-600 font-gilroy mb-4">
                {ADDRESS}
              </p>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-[#5B8C51] text-white font-gilroy font-semibold rounded-xl hover:bg-[#3A7817] transition-colors duration-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open in Google Maps
              </a>
            </div>
          </div>
        )}
      </div>
      
      {/* Fallback button for when iframe is blocked */}
      <div className="absolute top-4 right-4 z-10">
        <a 
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm text-[#404A3D] font-gilroy font-semibold rounded-lg hover:bg-white transition-all duration-300 shadow-lg"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Open Maps
        </a>
      </div>

      {/* Alternative map toggle button */}
      {iframeBlocked && (
        <div className="absolute top-4 left-4 z-10">
          <button
            onClick={() => setShowStaticMap(!showStaticMap)}
            className="inline-flex items-center px-4 py-2 bg-[#5B8C51]/90 backdrop-blur-sm text-white font-gilroy font-semibold rounded-lg hover:bg-[#5B8C51] transition-all duration-300 shadow-lg"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
            {showStaticMap ? 'Interactive Map' : 'Static Map'}
          </button>
        </div>
      )}
    </section>
  );
}
