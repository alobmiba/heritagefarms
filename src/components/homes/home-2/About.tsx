'use client';

import React from 'react';
import Image from 'next/image';

export default function About2() {
  return (
    <section className="about-section-2 bg-light">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 order-lg-2">
            <div className="about-content">
              <h2>Our Journey to Sustainable Heritage Farming</h2>
              <p>
                From a simple idea to year-round greenhouse production, we&apos;ve built a farm that honors 
                traditional methods while embracing modern sustainability practices.
              </p>
              
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-date">Aug 2024</div>
                  <div className="timeline-content">
                    <h4>Heritage Farms Founded</h4>
                    <p>We set out to reconnect our community with culturally meaningful greens grown locally and responsibly.</p>
                  </div>
                </div>
                
                <div className="timeline-item">
                  <div className="timeline-date">2025</div>
                  <div className="timeline-content">
                    <h4>First Seeds Planted</h4>
                    <p>We began greenhouse production of Ugwu, Ewedu, Scent Leaf and more—optimizing for water savings and year-round yield.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-lg-6 order-lg-1">
            <div className="about-image">
              <Image
                src="/branding/images/about/leaf-texture.jpg"
                alt="Heritage crop leaves"
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
