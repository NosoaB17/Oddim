import React, { useState } from "react";
import Logo from "../../assets/Logo.png";
import TranslationIcon from "../../assets/navbar/Translation.svg";
import ConversationIcon from "../../assets/navbar/Conversation.svg";
import ExtensionIcon from "../../assets/navbar/Extension.svg";
import SignIn from "../../assets/SignIn.svg";
import login from "../../assets/log-out.png";
import settings from "../../assets/settings.png";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const [activeTab, setActiveTab] = useState("Translation");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const tabs = [
    { name: "Translation", icon: TranslationIcon },
    { name: "Conversation", icon: ConversationIcon },
    { name: "Extension", icon: ExtensionIcon },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          <img
            src={Logo}
            alt="Middo Logo"
            className="logo"
            onClick={handleLogoClick}
          />
        </div>
        <div className="navbar-center">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`nav-button ${activeTab === tab.name ? "active" : ""}`}
              onClick={() => handleTabClick(tab.name)}
            >
              <span className="tab-name">{tab.name}</span>
              <img
                src={tab.icon}
                alt={`${tab.name} icon`}
                className="tab-icon"
              />
            </button>
          ))}
        </div>
        <div className="navbar-right">
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
      </div>
    </nav>
  );
};

export default NavBar;
