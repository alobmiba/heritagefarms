'use client';

import React from 'react';
import Link from 'next/link';

export default function Header2() {
  return (
    <header className="header">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-3">
            <div className="logo">
              <Link href="/">
                <span className="logo-text">Heritage Farms</span>
              </Link>
            </div>
          </div>
          <div className="col-md-9">
            <nav className="main-nav">
              <ul className="nav-list">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/products">Products</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
