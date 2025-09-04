"use client";

import { useState } from "react";

export function ContactThree() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    const fd = new FormData(e.currentTarget);

    const res = await fetch("/api/contact", { method: "POST", body: fd });
    setOk(res.ok);
    setLoading(false);
    if (res.ok) e.currentTarget.reset();
  }

  return (
    <section className="contact-three pb-70 pt-20 bg-gray-50 wow fadeInUp">
      <div className="container mx-auto px-4">
        <div className="row justify-content-end">
          <div className="col-xl-7 col-lg-10 mx-auto">
            <div className="contact-three_content-box">
              <div className="section-title section-title-left mb-12">
                <span className="sub-title inline-block px-4 py-2 bg-[#00312D] text-[#EAFDE7] font-gilroy font-semibold text-sm rounded-full mb-4">
                  Contact Information
                </span>
                <h2 className="text-3xl md:text-4xl font-gilroy-extrabold text-[#404A3D] mb-4">
                  Need Heritage Greens! Send Us Message
                </h2>
                <p className="text-gray-600 font-gilroy font-medium">
                  We&apos;d love to hear from you and help you discover authentic African vegetables.
                </p>
              </div>
              
              <div className="contact-form">
                <form onSubmit={onSubmit} className="space-y-6">
                  <div className="form_group">
                    <input
                      type="text"
                      className="form_control w-full rounded-xl border-2 border-gray-200 px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#5B8C51] focus:border-[#5B8C51] transition-all duration-300 font-gilroy"
                      placeholder="Full Name"
                      name="name"
                      required
                    />
                  </div>
                  
                  <div className="form_group">
                    <input
                      type="email"
                      className="form_control w-full rounded-xl border-2 border-gray-200 px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#5B8C51] focus:border-[#5B8C51] transition-all duration-300 font-gilroy"
                      placeholder="Email Address"
                      name="email"
                      required
                    />
                  </div>
                  
                  <div className="form_group">
                    <textarea
                      className="form_control w-full rounded-xl border-2 border-gray-200 px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#5B8C51] focus:border-[#5B8C51] transition-all duration-300 font-gilroy resize-none"
                      placeholder="Write Message"
                      name="message"
                      rows={6}
                      required
                    />
                  </div>
                  
                  <div className="form_group">
                    <button 
                      type="submit"
                      disabled={loading}
                      className="main-btn btn-yellow w-full bg-gradient-to-r from-[#5B8C51] to-[#3A7817] text-white font-gilroy font-bold px-8 py-4 rounded-xl hover:shadow-lg transform hover:scale-105 disabled:opacity-70 disabled:transform-none transition-all duration-300"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending Message...
                        </span>
                      ) : (
                        "Send Us Message"
                      )}
                    </button>
                  </div>

                  {ok === true && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-green-800 font-gilroy font-medium">Thanks! We&apos;ll be in touch soon.</p>
                      </div>
                    </div>
                  )}
                  
                  {ok === false && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-red-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <p className="text-red-800 font-gilroy font-medium">Sorry—something went wrong. Please try again.</p>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
