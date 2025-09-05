"use client";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full flex justify-between items-center px-8 md:px-12 py-6 text-white z-50">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image
          src="/branding/Logo/PNG/HF full colour.png"
          alt="Heritage Farms Logo"
          height={1000}
          width={200}
          priority
          className="object-contain"
        />
      </div>

      {/* Links */}
      <div className="hidden md:flex gap-8 font-medium">
        <a href="#home" className="hover:text-lime-400 transition">Home</a>
        <a href="#about" className="hover:text-lime-400 transition">About Us</a>
        <a href="#marketplace" className="hover:text-lime-400 transition">Marketplace</a>
        <a href="#blog" className="hover:text-lime-400 transition">Blog</a>
        <a href="#contact" className="hover:text-lime-400 transition">Contact Us</a>
      </div>

      {/* CTA buttons */}
      <div className="flex gap-3">
        <a
          href="#login"
          className="px-5 py-2 bg-lime-500 text-black font-semibold rounded-lg border-2 border-lime-500 hover:bg-lime-400 transition"
        >
          Login
        </a>
        <a
          href="#signup"
          className="px-5 py-2 border-2 border-lime-400 text-white font-semibold rounded-lg hover:bg-lime-400 hover:text-black transition"
        >
          Sign Up
        </a>
      </div>
    </nav>
  );
}
