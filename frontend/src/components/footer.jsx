import React from 'react';
import logo from '../assets/Fit-gen.png'; // Ensure the correct path

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-2 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img src={logo} alt="Fit-Gen Logo" className="h-10 w-auto" />
          <h2 className="ml-3 text-2xl font-bold text-orange-500">FIT-GEN</h2>
        </div>
       
      </div>
      <div className="container mx-auto mt-4 text-center text-gray-400">
        &copy; {new Date().getFullYear()} FIT-GEN. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
