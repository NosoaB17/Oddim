import React, { useState, useEffect } from "react";
import detectIcon from "../../assets/products/lang-detect.svg";
import englishIcon from "../../assets/products/uk-flag.svg";
import vietnameseIcon from "../../assets/products/vn-flag.svg";
import koreanIcon from "../../assets/products/kr-flag.svg";
import themeIcon from "../../assets/setting/theme.svg";

const Settings = () => {
  const [language, setLanguage] = useState("English");
  const [theme, setTheme] = useState("Light");
  const [langIcon, setLangIcon] = useState(englishIcon);

  const languages = [
    { value: "English", label: "English", icon: englishIcon },
    { value: "Korean", label: "한국어", icon: koreanIcon },
    { value: "Vietnamese", label: "Tiếng Việt", icon: vietnameseIcon },
  ];

  useEffect(() => {
    const selectedLang = languages.find((lang) => lang.value === language);
    if (selectedLang) {
      setLangIcon(selectedLang.icon);
    }
  }, [language]);

  return (
    <div className="setting-container">
      <div className="setting-header">
        <button>
          <span className="text">Sign in / Sign up</span>
        </button>
      </div>
      <div className="setting-content">
        <div className="lang-item">
          <img src={detectIcon} alt="Selected language" className="lang-icon" />
          <span>Display Language</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((lang) => (
              <option src={langIcon} key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
        <div className="theme-item">
          <img src={themeIcon} alt="theme" />
          <span>Theme</span>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
            <option value="System">System</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Settings;
