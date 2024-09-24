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
    <header className="header">
      <div className="logo" onClick={handleLogoClick}>
        <img src={Logo} alt="Middo Logo" />
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <span onClick={handleSolutionClick}>Solution</span>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <a
              href="https://dudaji.vn/#contact"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Us
            </a>
          </li>
          <li>
            <a
              href="https://docs.middo.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Docs
            </a>
          </li>
        </ul>
      </nav>
      <div className="user-menu">
        <button className="user-icon" onClick={toggleDropdown}>
          <img src={SignIn} alt="User" />
        </button>
        {isDropdownOpen && (
          <div className="dropdown">
            <Link
              to="/signin"
              className="dropdown-item"
              onClick={toggleDropdown}
            >
              <img src={login} alt="Sign In" />
              Sign In
            </Link>
            <Link
              to="/settings"
              className="dropdown-item"
              onClick={toggleDropdown}
            >
              <img src={settings} alt="Settings" />
              Settings
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
