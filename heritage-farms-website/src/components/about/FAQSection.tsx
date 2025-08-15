'use client';

import React, { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'Where can I buy your greens?',
      answer: 'See our stockists and pre-order options on our Products page. We offer both pickup and delivery options across Ontario.'
    },
    {
      question: 'Are crops available year-round?',
      answer: 'Yes, our greenhouse production targets steady weekly harvests throughout the year, ensuring consistent availability of your favorite heritage greens.'
    },
    {
      question: 'Do you deliver?',
      answer: 'Yes! Check our current delivery and pickup options on the Order page. We offer flexible delivery schedules to meet your needs.'
    },
    {
      question: 'What makes your farm sustainable?',
      answer: 'We use efficient water systems (75% less water), local distribution (50% lower carbon), year-round greenhouse production, and comprehensive composting practices.'
    },
    {
      question: 'How fresh are your greens?',
      answer: 'We harvest at peak freshness and deliver directly to your community, ensuring you get the most authentic and nutritious greens possible.'
    },
    {
      question: 'Can I pre-order specific crops?',
      answer: 'Absolutely! Pre-ordering helps us plan our harvests and ensures you get exactly what you need. Visit our Products page to place your order.'
    },
    {
      question: 'Do you offer farm tours?',
      answer: 'We\'re working on launching educational tours and community events. Contact us to learn more about upcoming opportunities to visit our greenhouse.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-gilroy font-bold text-[#00312D] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg font-gilroy text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about our heritage greens and sustainable farming practices.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-[#3A7817]/20 rounded-lg overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#BFF106] focus:ring-inset"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-gilroy font-semibold text-[#00312D]">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-[#3A7817] transition-transform duration-200 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4 bg-gray-50">
                  <p className="text-gray-700 font-gilroy leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
