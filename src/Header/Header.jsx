import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-teal-600 rounded-lg to-teal-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto rounded-lg px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold">
            <span className="tracking-wide">CLAW</span>
          </div>

          {/* Menu Items */}
          <div className="hidden md:flex space-x-8">
            <a
              href="#pricing"
              className="hover:text-teal-300 transition-colors duration-200">
              Pricing
            </a>
            <a
              href="#leaders"
              className="hover:text-teal-300 transition-colors duration-200">
              Leaders
            </a>
            <a
              href="#news"
              className="hover:text-teal-300 transition-colors duration-200">
              News
            </a>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button className="bg-gradient-to-r from-teal-500 to-teal-700 px-6 py-2 rounded-lg shadow-md hover:from-teal-400 hover:to-teal-600">
              Products
            </button>
            <button className="bg-gradient-to-r from-teal-500 to-teal-700 px-6 py-2 rounded-lg shadow-md hover:from-teal-400 hover:to-teal-600">
              Log In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
