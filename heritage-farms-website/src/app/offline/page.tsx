'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Offline Icon */}
        <div className="mb-8">
          <Image
            src="/branding/Images/placeholders/placeholder.jpg"
            alt="Offline"
            width={120}
            height={120}
            className="mx-auto rounded-full shadow-lg"
            priority
          />
        </div>

        {/* Offline Message */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            You&apos;re Offline
          </h1>
          
          <p className="text-gray-600 mb-6">
            It looks like you&apos;ve lost your internet connection. Don&apos;t worry - 
            you can still browse the pages you&apos;ve visited before.
          </p>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
            >
              Try Again
            </button>
            
            <Link
              href="/"
              className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
            >
              Go to Homepage
            </Link>
          </div>

          {/* Helpful Tips */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">
              While you&apos;re offline:
            </h3>
            <ul className="text-sm text-gray-600 space-y-2 text-left">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Browse previously visited pages
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                View cached images and content
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">•</span>
                Check your internet connection
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Heritage Farms - Sustainable Agriculture</p>
        </div>
      </div>
    </div>
  );
}
