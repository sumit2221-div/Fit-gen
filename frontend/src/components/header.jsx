import React, { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/authslice";
import logo from "../assets/Fit-gen.png";
import { getCurrentUser } from "../api/auth.api"; // Import API directly

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const checkedRef = useRef(false);

  // Check auth on mount
  useEffect(() => {
    if (checkedRef.current) return;
    checkedRef.current = true;
    const checkAuth = async () => {
      try {
        await getCurrentUser();
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch(logoutUser());
    setIsOpen(false);
    setIsAuthenticated(false);
    navigate("/login");
  };

  const navLinkClass = (path) =>
    `transition duration-300 px-3 py-1 rounded-full ${
      location.pathname === path
        ? "bg-orange-500 text-black font-bold shadow"
        : "hover:text-orange-500"
    }`;

  // Optionally, show nothing until auth is checked
  if (isAuthenticated === null) return null;

  return (
    <nav className="fixed left-1/2 -translate-x-1/2 top-6 w-[90%] md:w-[70%] bg-gradient-to-r from-gray-900 via-gray-800 to-black/80 rounded-full shadow-lg ring-2 ring-orange-500/30 text-white z-50 backdrop-blur-md">
      <div className="flex items-center justify-between py-3 px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
          <img src={logo} alt="Fit-Gen Logo" className="h-10 w-auto rounded-lg shadow-md" />
          <span className="ml-3 text-2xl font-extrabold text-orange-500 tracking-wide">FIT-GEN</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/" className={navLinkClass("/")}>Home</Link>
          <Link to="/get-workout" className={navLinkClass("/get-workout")}>Workout</Link>
          <Link to="/get_diet" className={navLinkClass("/generate_diet")}>Diet</Link>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="ml-2 hover:text-orange-500 transition duration-300">Logout</button>
          ) : (
            <Link to="/login" className={navLinkClass("/login")}>Login</Link>
          )}
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
        className={`md:hidden bg-gray-900/95 text-white backdrop-blur-md rounded-b-2xl overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-60 py-4 px-6" : "max-h-0"
        }`}
      >
        <Link to="/" className="block py-2" onClick={() => setIsOpen(false)}>
          Home
        </Link>
        <Link to="/get-workout" className="block py-2" onClick={() => setIsOpen(false)}>
          Workout
        </Link>
        <Link to="" className="block py-2" onClick={() => setIsOpen(false)}>
          Diet
        </Link>
        {isAuthenticated ? (
          <button onClick={handleLogout} className="block py-2 hover:text-orange-500 transition duration-300">
            Logout
          </button>
        ) : (
          <Link to="/login" className="block py-2" onClick={() => setIsOpen(false)}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
