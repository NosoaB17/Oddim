import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useOAuth } from "../../contexts/OAuthContext";
import { useAuth } from "../../contexts/AuthContext";

import Logo from "../../assets/navigation/Logo.png";
import TranslationIcon from "../../assets/navigation/Translation.svg";
import ConversationIcon from "../../assets/navigation/Conversation.svg";
import ExtensionIcon from "../../assets/navigation/Extension.svg";
import DocsIcon from "../../assets/navigation/Docs.svg";
import SignIn from "../../assets/navigation/SignIn.svg";
import login from "../../assets/navigation/log-out.png";
import settings from "../../assets/navigation/settings.png";

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "Translation";
  });

  const navigate = useNavigate();
  const location = useLocation();
  const { user: oauthUser, logout: oauthLogout } = useOAuth();
  const { currentUser: firebaseUser, logout: firebaseLogout } = useAuth();

  const user = oauthUser || firebaseUser;

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const getFirstName = (fullName) => {
    return fullName.split(" ")[0];
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    if (oauthUser) {
      oauthLogout();
    } else if (firebaseUser) {
      firebaseLogout();
    }
    console.log("Logging out");
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
                  src={user.picture || user.photoURL}
                  alt={user.name || user.email}
                  className="user-avatar"
                />
                <span className="user-name">
                  {getFirstName(user.name || user.email)}
                </span>
              </>
            ) : (
              <img src={SignIn} alt="User" />
            )}
          </button>
          {isDropdownOpen && (
            <div className="dropdown">
              {user ? (
                <>
                  <span className="dropdown-item user-name">
                    {" "}
                    {user.name || user.displayName}
                  </span>
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
