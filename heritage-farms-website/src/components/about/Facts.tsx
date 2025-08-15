'use client';

import React from 'react';

// Simple counter component
const Counter = ({ max, duration = 2000 }: { max: number; duration?: number }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * max));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [max, duration]);

  return <span>{count.toLocaleString()}</span>;
};

export default function Facts() {
  const facts = [
    {
      fallback: "💧",
      value: 90,
      label: "Water Saved",
      suffix: "%"
    },
    {
      fallback: "🌎",
      value: 75,
      label: "Lower Carbon",
      suffix: "%"
    },
    {
      fallback: "🌿",
      value: 95,
      label: "Year-Round Yield",
      suffix: "%"
    },
    {
      fallback: "♻️",
      value: 100,
      label: "Zero Waste",
      suffix: "%"
    }
  ];

  return (
    <section className="wrapper bg-light">
      <div className="container py-14 py-md-16">
        <div className="row gx-lg-8 gx-xl-12 gy-10 gy-lg-0 mb-7 mb-md-9">
          <div className="col-lg-4 text-center text-lg-start">
            <h3 className="display-4 mb-3 pe-xl-10">Why Choose Heritage Farms?</h3>
            <p className="lead mb-0">
              Our sustainable farming practices deliver measurable environmental and social benefits.
            </p>
          </div>
          {/* /column */}
          <div className="col-lg-8">
            <div className="row align-items-center counter-wrapper gy-6 text-center">
              {facts.map((fact, index) => (
                <div key={index} className="col-6 col-lg-3">
                  <div className="d-flex flex-column align-items-center">
                    <div className="mb-3">
                      <div className="w-12 h-12 bg-[#3A7817] rounded-full flex items-center justify-center">
                        <span className="text-white text-xl">{fact.fallback}</span>
                      </div>
                    </div>
                    <div className="h2 mb-1">
                      <Counter max={fact.value} />
                      {fact.suffix}
                    </div>
                    <div className="text-muted">{fact.label}</div>
                  </div>
                </div>
              ))}
            </div>
            {/* /.row */}
          </div>
          {/* /column */}
        </div>
        {/* /.row */}
      </div>
      {/* /.container */}
    </section>
  );
}
