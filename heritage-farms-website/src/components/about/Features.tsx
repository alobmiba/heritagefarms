'use client';

import React from 'react';

export default function Features() {
  return (
    <>
      <div className="flex flex-wrap mx-[-15px] !mb-5">
        <div className="md:w-10/12 lg:w-10/12 xl:w-8/12 xxl:w-7/12 w-full flex-[0_0_auto] !px-[15px] max-w-full !mx-auto !text-center">
          <div className="!w-[2.6rem] !h-[2.6rem] !mb-4 m-[0_auto] bg-[#3A7817] rounded-full flex items-center justify-center">
            <span className="text-white text-xl">🌿</span>
          </div>
          <h2 className="!text-[calc(1.305rem_+_0.66vw)] font-bold xl:!text-[1.8rem] !leading-[1.3] !mb-4 xl:!px-[4.5rem] lg:!px-[4.5rem]">
            Why Choose Heritage Farms?
          </h2>
        </div>
        {/* /column */}
      </div>
      {/* /.row */}
      <div className="flex flex-wrap mx-[-15px] xl:mx-[-35px] lg:mx-[-20px] items-center">
        <div className="xl:w-6/12 lg:w-6/12 w-full flex-[0_0_auto] xl:!px-[35px] lg:!px-[20px] !px-[15px] max-w-full">
          <div className="w-full h-96 bg-gradient-to-br from-[#EAFDE7] to-[#3A7817] rounded-2xl flex items-center justify-center">
            <span className="text-6xl">🌱</span>
          </div>
        </div>
        {/*/column */}
        <div className="xl:w-6/12 lg:w-6/12 w-full flex-[0_0_auto] xl:!px-[35px] lg:!px-[20px] !px-[15px] max-w-full">
          <h2 className="!text-[calc(1.265rem_+_0.18vw)] font-bold xl:!text-[1.4rem] !leading-[1.35] !mb-3">
            Traditional Flavors, Modern Sustainability
          </h2>
          <p className="!text-[1.05rem] !leading-[1.6] !mb-6">
            We combine time-honored West African and Caribbean farming traditions with cutting-edge greenhouse technology to bring you the freshest, most authentic greens year-round.
          </p>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-[#3A7817] rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Sustainable Greenhouse Technology</h3>
                <p className="text-gray-600">Advanced climate control systems ensure optimal growing conditions while minimizing environmental impact.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-[#3A7817] rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Authentic Cultural Heritage</h3>
                <p className="text-gray-600">Growing traditional West African and Caribbean greens that connect communities to their culinary roots.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-[#3A7817] rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Local & Fresh</h3>
                <p className="text-gray-600">Delivered directly from our Ontario greenhouse to your table, ensuring maximum freshness and nutritional value.</p>
              </div>
            </div>
          </div>
        </div>
        {/*/column */}
      </div>
      {/* /.row */}
    </>
  );
}
