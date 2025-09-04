'use client';

import React from 'react';
import { teamMembers2 } from '@/data/team';
import { ImageWithFallback } from '@/lib/image-fallback';

export default function Team() {
  return (
    <section className="team-section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="section-title text-center">
              <h2>Meet Our Team</h2>
              <p>Skilled growers and community partners dedicated to flavour, freshness, and sustainability.</p>
            </div>
          </div>
        </div>
        
        <div className="row">
          {teamMembers2.map((member) => (
            <div key={member.id} className="col-lg-4 col-md-6 mb-4">
              <div className="team-member">
                <div className="member-image">
                  <ImageWithFallback
                    src={member.imageSrc}
                    alt={member.name}
                    className="img-fluid"
                  />
                  <div className="member-social">
                    {member.socialLinks.map((social, index) => (
                      <a key={index} href={social.url} className="social-link">
                        <i className={social.icon}></i>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <p>{member.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
