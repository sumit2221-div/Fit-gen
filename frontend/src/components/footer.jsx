import React from 'react';
import logo from '../assets/Fit-gen.png';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white py-6 w-full shadow-inner">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="flex items-center mb-4 md:mb-0">
          <img src={logo} alt="Fit-Gen Logo" className="h-10 w-auto rounded-lg shadow-md" />
          <h2 className="ml-3 text-2xl font-extrabold text-orange-500 tracking-wide">FIT-GEN</h2>
        </div>
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition">
            <FaGithub size={24} />
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition">
            <FaLinkedin size={24} />
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition">
            <FaInstagram size={24} />
          </a>
        </div>
        <div className="text-sm text-gray-400 text-center md:text-right">
          &copy; {new Date().getFullYear()} <span className="text-orange-400 font-semibold">FIT-GEN</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
