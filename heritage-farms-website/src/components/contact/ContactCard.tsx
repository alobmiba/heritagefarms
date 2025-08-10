import React from 'react';
import Link from 'next/link';

export function ContactCard() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 h-fit">
      <div className="mb-8">
        <h3 className="text-2xl md:text-3xl font-gilroy-extrabold text-[#404A3D] mb-4">
          Contact Information
        </h3>
        <p className="text-gray-600 font-gilroy font-medium">
          Get in touch with us for fresh heritage greens and expert guidance.
        </p>
      </div>
      
      <div className="space-y-8">
        {/* Location */}
        <div className="flex items-start space-x-4 group">
          <div className="w-12 h-12 bg-gradient-to-br from-[#5B8C51] to-[#3A7817] rounded-full flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-all duration-300">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-gilroy font-bold text-[#404A3D] mb-2">Location</h4>
            <p className="text-gray-600 font-gilroy mb-3 leading-relaxed">
              16 Twin Sisters Lake Road<br />
              Marmora, Ontario, Canada
            </p>
            <Link
              className="inline-flex items-center text-[#5B8C51] hover:text-[#3A7817] font-gilroy font-semibold transition-colors group"
              href="https://www.google.com/maps/search/?api=1&query=16%20Twin%20Sisters%20Lake%20Road%2C%20Marmora%2C%20Ontario%2C%20Canada"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Google Maps
              <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start space-x-4 group">
          <div className="w-12 h-12 bg-gradient-to-br from-[#5B8C51] to-[#3A7817] rounded-full flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-all duration-300">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-gilroy font-bold text-[#404A3D] mb-2">Email</h4>
            <div className="space-y-2">
              <a 
                href="mailto:info@heritagefarms.ca" 
                className="block text-[#5B8C51] hover:text-[#3A7817] font-gilroy transition-colors"
              >
                info@heritagefarms.ca
              </a>
              <a 
                href="mailto:sales@heritagefarms.ca" 
                className="block text-[#5B8C51] hover:text-[#3A7817] font-gilroy transition-colors"
              >
                sales@heritagefarms.ca
              </a>
            </div>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start space-x-4 group">
          <div className="w-12 h-12 bg-gradient-to-br from-[#5B8C51] to-[#3A7817] rounded-full flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-all duration-300">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-gilroy font-bold text-[#404A3D] mb-2">Phone</h4>
            <div className="space-y-2">
              <a 
                href="tel:+11234567890" 
                className="block text-[#5B8C51] hover:text-[#3A7817] font-gilroy transition-colors"
              >
                +1 (123) 456-7890
              </a>
              <a 
                href="tel:+11234567891" 
                className="block text-[#5B8C51] hover:text-[#3A7817] font-gilroy transition-colors"
              >
                +1 (123) 456-7891
              </a>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="flex items-start space-x-4 group">
          <div className="w-12 h-12 bg-gradient-to-br from-[#5B8C51] to-[#3A7817] rounded-full flex items-center justify-center flex-shrink-0 group-hover:shadow-lg transition-all duration-300">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-gilroy font-bold text-[#404A3D] mb-2">Business Hours</h4>
            <div className="text-gray-600 font-gilroy space-y-1">
              <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
              <p>Saturday: 10:00 AM - 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Contact CTA */}
      <div className="mt-8 p-6 bg-gradient-to-r from-[#EDDD5E] to-[#F4E87C] rounded-2xl">
        <h4 className="text-lg font-gilroy font-bold text-[#404A3D] mb-2">
          Need Immediate Assistance?
        </h4>
        <p className="text-[#404A3D] font-gilroy font-medium mb-4">
          For urgent orders or questions, call us directly.
        </p>
        <a 
          href="tel:+11234567890"
          className="inline-flex items-center bg-[#404A3D] text-white font-gilroy font-bold px-6 py-3 rounded-xl hover:bg-[#2A2F1F] transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Call Now
        </a>
      </div>
    </div>
  );
}
