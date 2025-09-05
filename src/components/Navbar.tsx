"use client";
export default function Navbar() {
  return (
    <nav className=" absolute top-0 left-0 w-full flex justify-between items-center px-10 py-6 text-white z-50">
        {/* Logo */}
      <div className="font-bold text-xl">Heritage Farm</div>

      {/* Links */}
      <div className="hidden md:flex gap-8">
          <a href="#home" className="hover:text-lime-600">
            Home
          </a>
          <a href="#about" className="hover:text-lime-600">
            About Us
          </a>
          <a href="#marketplace" className="hover:text-lime-600">
            Marketplace
          </a>
          <a href="#blog" className="hover:text-lime-600">
            Blog
          </a>
          <a href="#contact" className="text-gray-700 hover:text-lime-600">
            Contact Us
          </a>
        </div>

        {/* CTA buttons */}
        <div className="flex gap-4">
            <a href="#learn-more" className="px-4 py-2 border-2 border-lime-400 text-black font-semibold rounded-lg bg-lime-500 hover:bg-lime-400">
                Login
            </a>
            <a href="#shop" className="px-4 py-2 border-2 border-lime-400 text-white font-semibold rounded-lg hover:bg-lime-400 hover:text-black transition">
                Sign Up
            </a>
        </div>
    </nav>
  );
}
