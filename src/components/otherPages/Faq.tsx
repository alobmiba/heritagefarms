'use client';

import React, { useState } from 'react';
import { faqs } from '@/data/faqs';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-title text-center">
              <h2>Frequently Asked Questions</h2>
              <p>Learn more about Heritage Farms and our sustainable farming practices.</p>
            </div>
          </div>
        </div>
        
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="faq-accordion">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <div 
                    className={`faq-question ${openIndex === index ? 'active' : ''}`}
                    onClick={() => toggleFaq(index)}
                  >
                    <h4>{faq.question}</h4>
                    <span className="faq-toggle">
                      {openIndex === index ? '−' : '+'}
                    </span>
                  </div>
                  <div className={`faq-answer ${openIndex === index ? 'active' : ''}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
