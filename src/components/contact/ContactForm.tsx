"use client";

import { useState } from "react";

export function ContactForm() {
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

  const input = "w-full rounded-xl border-2 border-gray-200 px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#5B8C51] focus:border-[#5B8C51] transition-all duration-300 font-gilroy bg-white";

  return (
    <div id="contact-form" className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
      <div className="mb-8">
        <h3 className="text-3xl md:text-4xl font-gilroy-extrabold text-[#404A3D] mb-4">
          Connect with us
        </h3>
        <p className="text-gray-600 font-gilroy font-medium">
          Fill out the form below and we&apos;ll get back to you as soon as possible.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-6" aria-labelledby="contact-form-title">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-gilroy font-semibold text-[#404A3D] mb-2">
              Full Name *
            </label>
            <input 
              className={input} 
              id="name"
              name="name" 
              placeholder="Enter your full name" 
              required 
              aria-label="Full name" 
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-gilroy font-semibold text-[#404A3D] mb-2">
              Email Address *
            </label>
            <input 
              className={input} 
              id="email"
              type="email" 
              name="email" 
              placeholder="Enter your email address" 
              required 
              aria-label="Email address" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-gilroy font-semibold text-[#404A3D] mb-2">
              Phone Number
            </label>
            <input 
              className={input} 
              id="phone"
              name="phone" 
              placeholder="Enter your phone number" 
              aria-label="Phone number" 
            />
          </div>
          
          <div>
            <label htmlFor="subject" className="block text-sm font-gilroy font-semibold text-[#404A3D] mb-2">
              Subject
            </label>
            <input 
              className={input} 
              id="subject"
              name="subject" 
              placeholder="What&apos;s this about?" 
              aria-label="Subject" 
            />
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-gilroy font-semibold text-[#404A3D] mb-2">
            Message *
          </label>
          <textarea 
            className={`${input} resize-none`} 
            id="message"
            name="message" 
            rows={6} 
            placeholder="Tell us about your inquiry, questions about our heritage greens, or how we can help you..." 
            required 
            aria-label="Message" 
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#5B8C51] to-[#3A7817] text-white font-gilroy font-bold px-8 py-4 rounded-xl hover:shadow-lg transform hover:scale-105 disabled:opacity-70 disabled:transform-none transition-all duration-300"
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
  );
}
