import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/navigation/Logo.png";
import SignIn from "../../assets/navigation/SignIn.svg";
import login from "../../assets/navigation/log-out.png";
import settings from "../../assets/navigation/settings.png";

import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSolutionClick = () => {
    if (window.location.pathname === "/") {
      const solutionSection = document.getElementById("solutions");
      if (solutionSection) {
        solutionSection.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("#solutions");
    }
  };

  return (
    <header className="sticky top-0 flex justify-between items-center px-20 bg-gray-50 text-gray-800 shadow-md z-50 h-16">
      <div
        className="cursor-pointer transition-opacity hover:opacity-90"
        onClick={handleLogoClick}
      >
        <img src={Logo} alt="Middo Logo" />
      </div>
      <nav className="flex-grow flex justify-center">
        <ul className="flex">
          <li className="mx-6 cursor-pointer font-semibold text-base">
            <span onClick={handleSolutionClick} className="hover:text-blue-500">
              Solution
            </span>
          </li>
          <li className="mx-6 cursor-pointer font-semibold text-base">
            <Link to="/products" className="hover:text-blue-500">
              Products
            </Link>
          </li>
          <li className="mx-6 cursor-pointer font-semibold text-base">
            <a
              href="https://dudaji.vn/#contact"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              Contact Us
            </a>
          </li>
          <li className="mx-6 cursor-pointer font-semibold text-base">
            <a
              href="https://docs.middo.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              Docs
            </a>
          </li>
        </ul>
      </nav>
      <div className="relative">
        <button className="focus:outline-none" onClick={toggleDropdown}>
          <img src={SignIn} alt="User" />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
            <Link
              to="/signin"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={toggleDropdown}
            >
              <img src={login} alt="Sign In" className="mr-2 w-4 h-4" />
              Sign In
            </Link>
            <Link
              to="/settings"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
              onClick={toggleDropdown}
            >
              <img src={settings} alt="Settings" className="mr-2 w-4 h-4" />
              Settings
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
