import React, { useState } from "react";
import ClawLogo from "../assets/ClawLogo.png";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r rounded-lg from-teal-600 to-teal-800 text-white shadow-md">
      <div className=" w-6xl rounded-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="https://www.clawlaw.in/">
              <img src={ClawLogo} alt="ClawLogo" className="h-8 w-24" />
            </a>
          </div>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Menu Items */}
          {/* <div
            className={`absolute top-16 left-0 w-full text-white md:static md:w-auto md:flex md:items-center md:space-x-8 ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <a
              href="#pricing"
              className="block py-2 px-4 md:inline hover:text-teal-300 transition-colors duration-200"
            >
              Pricing
            </a>
            <a
              href="#leaders"
              className="block py-2 px-4 md:inline hover:text-teal-300 transition-colors duration-200"
            >
              Leaders
            </a>
            <a
              href="#news"
              className="block py-2 px-4 md:inline hover:text-teal-300 transition-colors duration-200"
            >
              News
            </a>
          </div> */}

          {/* Buttons */}
          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-teal-500 to-teal-700 px-6 py-2 rounded-lg shadow-md hover:from-teal-400 hover:to-teal-600"
            >
              Home
            </button>
            {/* <button className="bg-gradient-to-r from-teal-500 to-teal-700 px-6 py-2 rounded-lg shadow-md hover:from-teal-400 hover:to-teal-600">
              Log In
            </button> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
