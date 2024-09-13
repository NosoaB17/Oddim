import React, { useState } from "react";
import "./Navbar.scss";
import Logo from "../../assets/Logo.png";
import TranslationIcon from "../../assets/navbar/Translation.svg";
import ConversationIcon from "../../assets/navbar/Conversation.svg";
import ExtensionIcon from "../../assets/navbar/Extension.svg";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [activeTab, setActiveTab] = useState("Translation");
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleLogoClick = () => {
    navigate("/"); // Navigate to home page
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
          <button className="icon-button">👤</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
