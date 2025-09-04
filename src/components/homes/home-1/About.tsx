'use client';

import React from 'react';
import Image from 'next/image';

export default function About1() {
  return (
    <section className="about-section-1">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="about-content">
              <h2>Fresh, Heritage Greens—Locally Grown</h2>
              <p>
                We&apos;re Ontario&apos;s first Black-led farm focused on West African & Caribbean greens. 
                Our greenhouse approach saves water, cuts transport, and delivers consistent quality year-round.
              </p>
              
              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">🌱</div>
                  <div className="feature-text">
                    <h4>Sustainably Grown</h4>
                    <p>Less water, lower food-mile carbon, and smart waste diversion through composting.</p>
                  </div>
                </div>
                
                <div className="feature-item">
                  <div className="feature-icon">🥬</div>
                  <div className="feature-text">
                    <h4>Culturally Meaningful</h4>
                    <p>Greens our community knows and loves—Ugwu, Ewedu, Scent Leaf, Waterleaf and more.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6">
            <div className="about-image">
              <Image
                src="/branding/images/about/greenhouse.jpg"
                alt="Inside our greenhouse"
                width={600}
                height={400}
                className="img-fluid rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
