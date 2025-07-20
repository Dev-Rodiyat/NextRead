import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NextRead from "./../assets/NextRead.png";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Explore", to: "/explore" },
    { label: "Favorites", to: "/favorites" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-white">
      <div className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          <img src={NextRead} alt="NextRead" className="h-10 w-auto" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover:text-blue-600 transition ${
                pathname === link.to ? "text-blue-500 font-semibold" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Modal Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex justify-center items-start pt-28 md:hidden">
          <div className="bg-white w-11/12 max-w-sm rounded-lg shadow-xl p-6 relative">
            <button
              className="absolute top-4 right-4"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <FiX className="w-6 h-6 text-gray-700" />
            </button>
            <nav className="flex flex-col space-y-4 text-gray-800 text-lg">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={`hover:text-blue-600 transition ${
                    pathname === link.to ? "text-blue-600 font-semibold" : ""
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
