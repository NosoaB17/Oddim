import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
  const { currentUser, logout } = useAuth();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const getFirstName = (fullName) => {
    return fullName.split(" ")[0];
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logging out");
      navigate("/");
      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
    if (tab === "Conversation" && !currentUser) {
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
    <nav className="bg-white shadow-md h-13 w-full sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-full flex justify-between items-center px-5">
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Middo Logo"
            className="h-8 cursor-pointer"
            onClick={handleLogoClick}
          />
        </div>
        <div className="flex items-center justify-center mx-auto space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`flex items-center px-3 py-2 rounded-xl transition-colors ${
                activeTab === tab.name
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => handleTabClick(tab.name)}
            >
              <span className="font-semibold text-base mr-3">{tab.name}</span>
              <img
                src={tab.icon}
                alt={`${tab.name} icon`}
                className={`w-4 h-4 ${
                  activeTab === tab.name ? "filter brightness-0 invert" : ""
                }`}
              />
            </button>
          ))}
        </div>
        <div className="relative">
          <button
            className="flex items-center p-1 rounded-full hover:bg-gray-100"
            onClick={toggleDropdown}
          >
            {currentUser ? (
              <>
                <img
                  src={currentUser.photoURL}
                  alt={currentUser.displayName || currentUser.email}
                  className="w-8 h-8 rounded-full mr-2 object-cover"
                />
                <span className="text-sm text-gray-700">
                  {getFirstName(currentUser.displayName || currentUser.email)}
                </span>
              </>
            ) : (
              <img src={SignIn} alt="User" className="w-8 h-8" />
            )}
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
              {currentUser ? (
                <>
                  <span className="block px-4 py-2 text-sm text-gray-700 font-bold border-b border-gray-200">
                    {currentUser.displayName || currentUser.email}
                  </span>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={toggleDropdown}
                  >
                    <img
                      src={settings}
                      alt="Account Settings"
                      className="w-4 h-4 mr-2"
                    />
                    Account Settings
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={handleLogout}
                  >
                    <img src={login} alt="Sign Out" className="w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/signin"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <img src={login} alt="Sign In" className="w-4 h-4 mr-2" />
                    Sign In
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <img
                      src={settings}
                      alt="Settings"
                      className="w-4 h-4 mr-2"
                    />
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
