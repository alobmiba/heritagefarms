'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer1() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="footer-section">
              <h4>Heritage Farms</h4>
              <p>Ontario&apos;s first Black-led farm growing West African & Caribbean greens locally with sustainable greenhouse practices.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/products">Products</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <div className="footer-section">
              <h4>Contact Info</h4>
              <p>📧 info@heritagefarms.ca</p>
              <p>📞 (555) 123-4567</p>
              <p>📍 Ontario, Canada</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="footer-bottom">
              <p>&copy; 2024 Heritage Farms. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
