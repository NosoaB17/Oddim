import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import Logo from "../../assets/Logo.png";
import SignIn from "../../assets/SignIn.svg";
import login from "../../assets/log-out.png";
import settings from "../../assets/settings.png";
import { useNavigate } from "react-router-dom";

const Header = ({ scrollToSolutions }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleLogoClick = () => {
    navigate("/"); // Navigate to home page
  };
  return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick}>
        <img src={Logo} alt="Middo Logo" />
      </div>
      <nav className="navigation">
        <ul>
          <li>
            <span onClick={scrollToSolutions}>Solution</span>
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
            <Link to="/signin" className="dropdown-item">
              <img src={login} alt="Sign In" />
              Sign In
            </Link>
            <Link to="/settings" className="dropdown-item">
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
