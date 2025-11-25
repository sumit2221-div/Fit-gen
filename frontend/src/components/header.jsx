import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/authslice";
import logo from "../assets/Fit-gen.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Check authentication with token (FAST)
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, [location.pathname]); // re-check on route change

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsAuthenticated(false);
    setIsOpen(false);
    navigate("/login");
  };

  const navLinkClass = (path) =>
    `transition duration-300 px-3 py-1 rounded-full ${
      location.pathname === path
        ? "bg-orange-500 text-black font-bold shadow"
        : "hover:text-orange-500"
    }`;

  return (
    <nav className="fixed left-1/2 -translate-x-1/2 top-0 w-[95%] md:w-[70%] bg-gradient-to-r
    from-gray-900 via-gray-800 to-black/80 rounded-b-2xl shadow-lg ring-2 ring-orange-500/30
    text-white z-50 backdrop-blur-md">
      
      <div className="flex items-center justify-between py-3 px-4 md:px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
          <img src={logo} alt="Fit-Gen Logo" className="h-10 w-auto rounded-lg shadow-md" />
          <span className="ml-3 text-2xl font-extrabold text-orange-500 tracking-wide">FIT-GEN</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className={navLinkClass("/")}>Home</Link>
          <Link to="/get-workout" className={navLinkClass("/get-workout")}>Workout</Link>
          <Link to="/get_diet" className={navLinkClass("/get_diet")}>Diet</Link>

          {isAuthenticated ? (
            <button 
              onClick={handleLogout} 
              className="ml-2 hover:text-orange-500 transition duration-300">
              Logout
            </button>
          ) : (
            <Link to="/login" className={navLinkClass("/login")}>Login</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-orange-500 focus:outline-none">
            {isOpen ? <FaTimes className="w-7 h-7" /> : <FaBars className="w-7 h-7" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute left-0 right-0 top-[100%] bg-gray-900/95 text-white
        backdrop-blur-md rounded-b-2xl shadow-2xl overflow-hidden transition-all duration-300 
        ${isOpen ? "max-h-80 py-4 px-6" : "max-h-0 py-0 px-6"}`}
      >
        <Link
          to="/"
          className={`block py-3 px-2 rounded-lg text-lg font-semibold ${
            location.pathname === "/" ? "bg-orange-500 text-black" : "hover:text-orange-400"
          }`}
          onClick={() => setIsOpen(false)}
        >
          Home
        </Link>

        <Link
          to="/get-workout"
          className={`block py-3 px-2 rounded-lg text-lg font-semibold ${
            location.pathname === "/get-workout" ? "bg-orange-500 text-black" : "hover:text-orange-400"
          }`}
          onClick={() => setIsOpen(false)}
        >
          Workout
        </Link>

        <Link
          to="/get_diet"
          className={`block py-3 px-2 rounded-lg text-lg font-semibold ${
            location.pathname === "/get_diet" ? "bg-orange-500 text-black" : "hover:text-orange-400"
          }`}
          onClick={() => setIsOpen(false)}
        >
          Diet
        </Link>

        {isAuthenticated ? (
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="block w-full text-left py-3 px-2 rounded-lg text-lg font-semibold hover:text-orange-400"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className={`block py-3 px-2 rounded-lg text-lg font-semibold ${
              location.pathname === "/login" ? "bg-orange-500 text-black" : "hover:text-orange-400"
            }`}
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
