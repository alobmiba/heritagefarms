"use client";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center bg-black">
      <div className="absolute inset-0 -z-10">
        <Image
          src=""
          alt="Farm background"
          fill
          className="object-cover brightness-75"
        />
      </div>
        {/*Content*/}
      <div className="text-center max-w-3xl px-6 text-white">
        <h1 className='text-4xl md:text-6xl font-bold leading-tight'>
            Nostalgic Flavors, <span className="text-lime-400">Rooted in Heritage</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-200">
            Traditional greens from diaspora gardens cultivated locally, responsibly, and grown
          sustainably.
        </p>
        {/**Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <a href="#learn-more"
        className="px-6 py-3 bg-lime-500 text-black font-semibold rounded-lg shadow hover:bg-lime-400 transition"
        >
            Learn More
        </a>
        <a href="#shop" className="px-6 py-3 border-2 border-lime-400 text-white font-semibold rounded-lg hover:bg-lime-400 hover:text-black transition">
            Shop Now
        </a>
        </div>
      </div>
    </section>
  );
}
