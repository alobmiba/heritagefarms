'use client';

import React from 'react';

export default function Contact() {
  return (
    <section className="wrapper !bg-[#00312D]">
      <div className="container py-[4.5rem] xl:!py-24 lg:!py-24 md:!py-24">
        <div className="flex flex-wrap mx-[-15px] xl:mx-[-35px] lg:mx-[-20px] items-center">
          <div className="xl:w-6/12 lg:w-6/12 w-full flex-[0_0_auto] xl:!px-[35px] lg:!px-[20px] !px-[15px] max-w-full">
            <div className="!w-[2.6rem] !h-[2.6rem] !mb-4 bg-[#BFF106] rounded-full flex items-center justify-center">
              <span className="text-[#00312D] text-xl">📞</span>
            </div>
            <h2 className="!text-[calc(1.305rem_+_0.66vw)] font-bold xl:!text-[1.8rem] !leading-[1.3] !mb-3 text-white">
              Ready to Experience Heritage Greens?
            </h2>
            <p className="lead !text-[1.05rem] !leading-[1.6] font-medium text-white/90">
              Join us in preserving traditional flavors while supporting sustainable local agriculture.
            </p>
            <p className="!mb-6 text-white/80">
              Contact us to learn more about our heritage crops, place orders, or schedule a visit to our greenhouse. 
              We&apos;re here to help you reconnect with the flavors that feel like home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="/products" 
                className="btn btn-primary !text-[#00312D] !bg-[#BFF106] border-[#BFF106] hover:text-[#00312D] hover:bg-[#A8D905] hover:!border-[#A8D905] active:text-[#00312D] active:bg-[#A8D905] active:border-[#A8D905] disabled:text-[#00312D] disabled:bg-[#BFF106] disabled:border-[#BFF106] !rounded-[50rem] !mb-0 hover:translate-y-[-0.15rem] hover:shadow-[0_0.25rem_0.75rem_rgba(30,34,40,0.15)]"
              >
                Shop Our Products
              </a>
              <a 
                href="/contact" 
                className="btn btn-outline-light border-2 border-white text-white hover:bg-white hover:text-[#00312D] transition-colors !rounded-[50rem]"
              >
                Get in Touch
              </a>
            </div>
          </div>
          {/*/column */}
          <div className="xl:w-6/12 lg:w-6/12 w-full flex-[0_0_auto] xl:!px-[35px] lg:!px-[20px] !px-[15px] max-w-full">
            <div className="card !bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="card-body p-8">
                <h3 className="text-white text-xl font-bold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#BFF106] rounded-full flex items-center justify-center mr-3">
                      <span className="text-[#00312D] text-sm">📧</span>
                    </div>
                    <div>
                      <p className="text-white/90 text-sm">Email</p>
                      <p className="text-white font-medium">info@heritagefarms.ca</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#BFF106] rounded-full flex items-center justify-center mr-3">
                      <span className="text-[#00312D] text-sm">📞</span>
                    </div>
                    <div>
                      <p className="text-white/90 text-sm">Phone</p>
                      <p className="text-white font-medium">+1 (416) 555-0123</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#BFF106] rounded-full flex items-center justify-center mr-3">
                      <span className="text-[#00312D] text-sm">📍</span>
                    </div>
                    <div>
                      <p className="text-white/90 text-sm">Location</p>
                      <p className="text-white font-medium">Ontario, Canada</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* /.card-body */}
            </div>
            {/* /.card */}
          </div>
          {/*/column */}
        </div>
        {/* /.row */}
      </div>
      {/* /.container */}
    </section>
  );
}
