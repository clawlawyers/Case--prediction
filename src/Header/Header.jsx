import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full bg-gradient-to-r from-teal-900 to-teal-700 p-4 rounded-md shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <span className="tracking-wider">CLAW</span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8 text-white text-base">
          <Link to="/pricing" className="hover:text-teal-300">
            Pricing
          </Link>
          <Link to="/leaders" className="hover:text-teal-300">
            Leaders
          </Link>
          <Link to="/news" className="hover:text-teal-300">
            News
          </Link>
        </nav>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            className="bg-white bg-opacity-20 hover:bg-teal-600 text-white px-4 py-2 rounded-md shadow-md"
            aria-label="Products">
            Products
          </button>
          <button
            className="bg-white bg-opacity-20 hover:bg-teal-600 text-white px-4 py-2 rounded-md shadow-md"
            aria-label="Log In">
            Log In
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
