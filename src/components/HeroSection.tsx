"use client";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Droplets, Leaf, Recycle, Sprout } from "lucide-react"; // Icons

export default function HeroSection() {
  return (
    <section className="relative w-full h-[100vh] flex items-center">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/branding/Images/banner/homebanner2.png"
          alt="Farm background"
          fill
          className="object-cover brightness-75"
        />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Grid Container */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 px-8 md:px-16 w-full items-center text-white mt-60 justify-items-center">
        
        {/* Left: Hero Text */}
        <div className="max-w-2xl">
          {/* Small Tagline */}
          <span className="inline-block bg-black/50 text-lime-400 text-sm px-3 py-1 rounded-full mb-4">
            Sustainable Agriculture
          </span>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Nostalgic Flavors,{" "}
            <span className="text-lime-400">Rooted in Heritage</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed">
            Traditional greens from diaspora gardens cultivated locally,
            responsibly, and grown sustainably.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#learn-more"
              className="px-6 py-3 bg-lime-500 text-black font-semibold rounded-lg shadow hover:bg-lime-400 transition"
            >
              Learn More
            </a>
            <a
              href="#shop"
              className="px-6 py-3 border-2 border-lime-400 text-white font-semibold rounded-lg hover:bg-lime-400 hover:text-black transition"
            >
              Shop Now
            </a>
          </div>
        </div>

        {/* Right: Sustainability Metrics */}
        <div>
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl text-lime-400 mb-3">
            Sustainability Metrics
          </h2>
          <div className="text-gray-300 mb-8 me-0">
            <div className="px-6">Our innovative farming practices deliver</div>
            <div className="px-10 me-0">measurable environmental benefits.</div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: Droplets, title: "Water Saved", desc: "vs. field-grown imports" },
              { icon: Leaf, title: "Lower Carbon", desc: "Reduced food miles" },
              { icon: Recycle, title: "100% Waste Diverted", desc: "On-site composting" },
              { icon: Sprout, title: "95% Yield", desc: "Year-round" },
            ].map((metric, i) => {
              const Icon = metric.icon;
              return (
                <div
                  key={i}
                  className="bg-black/60 p-6 shadow w-[180px] h-[180px] flex flex-col justify-center items-center text-center rounded-lg 
                  hover:scale-105 hover:shadow-lg hover:shadow-lime-400/40 transition-all duration-300"
                >
                  <Icon className="text-lime-400 w-8 h-8 mb-3" />
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {metric.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{metric.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
