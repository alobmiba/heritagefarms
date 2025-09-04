'use client';

import React from 'react';

export default function PurposePromiseMetrics() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Purpose */}
          <div className="bg-white border border-[#3A7817]/20 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#BFF106] rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="text-xl font-gilroy font-bold text-[#00312D] mb-4">
              Purpose
            </h3>
            <p className="text-gray-700 font-gilroy leading-relaxed">
              Reconnect our community to culturally meaningful greens—grown locally and sustainably.
            </p>
          </div>

          {/* Promise */}
          <div className="bg-white border border-[#3A7817]/20 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#BFF106] rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">✨</span>
            </div>
            <h3 className="text-xl font-gilroy font-bold text-[#00312D] mb-4">
              Promise
            </h3>
            <p className="text-gray-700 font-gilroy leading-relaxed">
              Fresh, traceable heritage crops harvested weekly in Ontario. Less travel, more flavour.
            </p>
          </div>

          {/* Key Metrics */}
          <div className="bg-white border border-[#3A7817]/20 rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#BFF106] rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-gilroy font-bold text-[#00312D] mb-4">
              Key Metrics
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-lg">💧</span>
                <span className="text-gray-700 font-gilroy">75% less water vs. field imports</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">🌎</span>
                <span className="text-gray-700 font-gilroy">50% lower food-mile carbon</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-lg">🌿</span>
                <span className="text-gray-700 font-gilroy">90% year-round yield</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
