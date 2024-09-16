import React from "react";
import detectIcon from "../../assets/products/lang-detect.svg";
import englishIcon from "../../assets/products/uk-flag.svg";
import vietnameseIcon from "../../assets/products/vn-flag.svg";
import koreanIcon from "../../assets/products/kr-flag.svg";
import swapIcon from "../../assets/products/swap.svg";
import arrowDownIcon from "../../assets/products/arrowDown.svg";

import { useState } from "react";

const LanguageSelector = () => {
  const [activeTab, setActiveTab] = useState("Translation");
  const handleTabClick = (lang) => {
    setActiveTab(lang);
  };

  const source_lang = [
    { name: "Language detect", icon: detectIcon },
    { name: "English", icon: englishIcon },
    { name: "Vietnamese", icon: vietnameseIcon },
  ];

  const target_lang = [
    { name: "English", icon: englishIcon },
    { name: "Korean", icon: koreanIcon },
    { name: "Vietnamese", icon: vietnameseIcon },
  ];

  return (
    <div className="language-selector">
      <div className="source-languages">
        {source_lang.map((lang) => (
          <button
            key={lang.name}
            className={`lang-button ${activeTab === lang.name ? "active" : ""}`}
            onClick={() => handleTabClick(lang.name)}
          >
            <img
              src={lang.icon}
              alt={`${lang.name} icon`}
              className="lang-icon"
            />
            <span className="lang-name">{lang.name}</span>
          </button>
        ))}
        <button className="arrow-down-button">
          <img
            src={arrowDownIcon}
            alt="Arrow down"
            className="arrow-down-icon"
          />
        </button>
      </div>
      <button className="swap-button">
        <img src={swapIcon} alt="Swap" className="swap-icon" />
      </button>
      <div className="target-languages">
        {target_lang.map((lang) => (
          <button
            key={lang.name}
            className={`lang-button ${activeTab === lang.name ? "active" : ""}`}
            onClick={() => handleTabClick(lang.name)}
          >
            <img
              src={lang.icon}
              alt={`${lang.name} icon`}
              className="lang-icon"
            />
            <span className="lang-name">{lang.name}</span>
          </button>
        ))}
        <button className="arrow-down-button">
          <img
            src={arrowDownIcon}
            alt="Arrow down"
            className="arrow-down-icon"
          />
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
