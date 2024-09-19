import React, { useState, useEffect } from "react";
import { CircleFlag } from "react-circle-flags";

import detectIcon from "../../assets/products/lang-detect.svg";
import arrowDownIcon from "../../assets/products/arrowDown.svg";

import swapIcon from "../../assets/products/swap.svg";

const LanguageSelector = ({
  sourceLanguage,
  targetLanguage,
  setSourceLanguage,
  setTargetLanguage,
}) => {
  const [languages, setLanguages] = useState([]);
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);

  const handleSwap = () => {
    if (sourceLanguage === targetLanguage) {
      alert("Source and target languages cannot be the same.");
    } else {
      const temp = sourceLanguage;
      setSourceLanguage(targetLanguage);
      setTargetLanguage(temp);
    }
  };

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch("https://libretranslate.com/languages");
        const data = await response.json();
        setLanguages(data);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };

    fetchLanguages();
  }, []);

  return (
    <div className="language-selector">
      <div className="language-select source">
        <button
          className={`lang-button ${sourceLanguage === "auto" ? "active" : ""}`}
          onClick={() => setSourceLanguage("auto")}
        >
          <img src={detectIcon} alt="Detect language" />
          Detect language
        </button>
        <button
          className={`lang-button ${sourceLanguage === "en" ? "active" : ""}`}
          onClick={() => setSourceLanguage("en")}
        >
          <CircleFlag countryCode="gb" />
          English
        </button>
        <button
          className={`lang-button ${sourceLanguage === "ko" ? "active" : ""}`}
          onClick={() => setSourceLanguage("ko")}
        >
          <CircleFlag countryCode="kr" />
          Korean
        </button>
        <button
          className="lang-button dropdown"
          onClick={() => setShowLanguageSelect(true)}
        >
          <img src={arrowDownIcon} alt="More languages" />
        </button>
      </div>

      {showLanguageSelect && (
        <div className="language-select-modal">
          <div className="modal-content">
            <h2>Select Language</h2>
            <button
              className="close-button"
              onClick={() => setShowLanguageSelect(false)}
            >
              ×
            </button>
            <div className="language-list">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className="lang-button"
                  onClick={() => {
                    setSourceLanguage(lang.code);
                    setShowLanguageSelect(false);
                  }}
                >
                  <CircleFlag countryCode={lang.code.toLowerCase()} />
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <button
        className={`swap-button ${sourceLanguage === "auto" ? "disabled" : ""}`}
        onClick={handleSwap}
        disabled={sourceLanguage === "auto"} // Disable if sourceLanguage is "auto"
      >
        <img src={swapIcon} alt="Swap languages" />
      </button>

      <div className="language-select target">
        <button
          className={`lang-button ${targetLanguage === "ko" ? "active" : ""}`}
          onClick={() => setTargetLanguage("ko")}
        >
          <CircleFlag countryCode="kr" />
          Korean
        </button>
        <button
          className={`lang-button ${targetLanguage === "en" ? "active" : ""}`}
          onClick={() => setTargetLanguage("en")}
        >
          <CircleFlag countryCode="gb" />
          English
        </button>
        <button
          className="lang-button dropdown"
          onClick={() => setShowLanguageSelect(true)}
        >
          <img src={arrowDownIcon} alt="More languages" />
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
