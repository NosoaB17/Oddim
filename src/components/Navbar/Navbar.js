import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

import Logo from "../../assets/Logo.png";
import TranslationIcon from "../../assets/navbar/Translation.svg";
import ConversationIcon from "../../assets/navbar/Conversation.svg";
import ExtensionIcon from "../../assets/navbar/Extension.svg";
import DocsIcon from "../../assets/navbar/Docs.svg";
import SignIn from "../../assets/SignIn.svg";
import login from "../../assets/log-out.png";
import settings from "../../assets/settings.png";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "Translation";
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const getFirstName = (fullName) => {
    return fullName.split(" ")[0];
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsDropdownOpen(false);
  };
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
    if (tab === "Conversation" && !user) {
      navigate("/signin");
    } else {
      switch (tab) {
        case "Translation":
          navigate("/products");
          break;
        case "Conversation":
          navigate("/conversation");
          break;
        case "Extension":
          window.open("https://middo.app/spaces", "_blank");
          break;
        case "Docs":
          window.open("https://docs.middo.app/", "_blank");
          break;
        default:
          break;
      }
    }
  };

  const tabs = [
    { name: "Translation", icon: TranslationIcon },
    { name: "Conversation", icon: ConversationIcon },
    { name: "Extension", icon: ExtensionIcon },
    { name: "Docs", icon: DocsIcon },
  ];

  useEffect(() => {
    const path = location.pathname;
    let tab = "Translation";
    if (path.includes("/conversation")) tab = "Conversation";
    else if (path === "/") tab = "Translation";
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  }, [location]);

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
            {user ? (
              <>
                <img
                  src={user.picture}
                  alt={user.name}
                  className="user-avatar"
                ></img>
                <span className="user-name">{getFirstName(user.name)}</span>
              </>
            ) : (
              <img src={SignIn} alt="User" />
            )}
          </button>
          {isDropdownOpen && (
            <div className="dropdown">
              {user ? (
                <>
                  <span className="dropdown-item user-name"></span>
                  <Link
                    to="/settings"
                    className="dropdown-item"
                    onClick={toggleDropdown}
                  >
                    <img src={settings} alt="Account Settings" />
                    Account Settings
                  </Link>
                  <button className="dropdown-item" onClick={handleLogout}>
                    <img src={login} alt="Sign Out" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="dropdown-item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <img src={login} alt="Sign In" />
                    Sign In
                  </Link>
                  <Link
                    to="/settings"
                    className="dropdown-item"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <img src={settings} alt="Settings" />
                    Settings
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
