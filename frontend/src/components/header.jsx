import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/Fit-gen.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className="fixed mx-auto w-[80%] md:w-[60%] rounded-full transition-all duration-300 ring-amber-700 text-white z-50"
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Fit-Gen Logo" className="h-10 w-auto" />
          <span className="ml-3 text-2xl font-bold text-orange-500">FIT-GEN</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-orange-500 transition duration-300">Home</Link>
          <Link to="/get-workout" className="hover:text-orange-500 transition duration-300">Workout</Link>
           <Link to="/services" className="hover:text-orange-500 transition duration-300">Nutrition</Link> 
          <Link to="/login" className="hover:text-orange-500 transition duration-300 ">login</Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-orange-500 focus:outline-none">
            {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-gray-800/80 text-white backdrop-blur-md rounded-lg overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-60 py-4 px-6" : "max-h-0"
        }`}
      >
        <Link to="/" className="block py-2 hover:text-orange-500 transition duration-300">Workout</Link>
        <Link to="/about" className="block py-2 hover:text-orange-500 transition duration-300">Diet</Link>
        <Link to="/services" className="block py-2 hover:text-orange-500 transition duration-300">Nutrition</Link>
        <Link to="/contact" className="block py-2 hover:text-orange-500 transition duration-300">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
