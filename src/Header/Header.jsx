import React, { useState } from "react";
import ClawLogo from "../assets/ClawLogo.png";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gradient-to-r rounded-lg from-teal-600 to-teal-800 text-white shadow-md">
      <div className="w-6xl rounded-lg mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="https://www.clawlaw.in/">
              <img src={ClawLogo} alt="ClawLogo" className="h-8 w-24" />
            </a>
          </div>

          {/* Mobile - Only Home Icon */}
          <div className="md:hidden">
            <button
              onClick={() => navigate("/")}
              className="text-white focus:outline-none bg-gradient-to-r from-teal-500 to-teal-700 px-6 py-2 rounded-lg shadow-md hover:from-teal-400 hover:to-teal-600"
            >
              <HomeIcon fontSize="medium" />
            </button>
          </div>

          {/* Desktop - Buttons */}
          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => navigate("/")}
              className="bg-gradient-to-r from-teal-500 to-teal-700 px-6 py-2 rounded-lg shadow-md hover:from-teal-400 hover:to-teal-600"
            >
              Home
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;