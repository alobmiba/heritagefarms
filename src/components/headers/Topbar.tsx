'use client';

import React from 'react';

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="topbar-left">
              <span>🌱 Heritage Farms - Ontario&apos;s Premier Heritage Crop Farm</span>
            </div>
          </div>
          <div className="col-md-6">
            <div className="topbar-right">
              <span>📧 info@heritagefarms.ca</span>
              <span>📞 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
