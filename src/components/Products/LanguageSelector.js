import React, { useState, useEffect } from "react";
import { CircleFlag } from "react-circle-flags";

import detectIcon from "../../assets/products/lang-detect.svg";
import arrowDownIcon from "../../assets/products/arrowDown.svg";
import swapIcon from "../../assets/products/swap.svg";

import axios from "axios";

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
        const response = await axios.get("http://localhost:5000/languages");
        setLanguages(response.data);
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
          <span className="lang-button-text">Detect Language</span>
        </button>
        <button
          className={`lang-button ${sourceLanguage === "en" ? "active" : ""}`}
          onClick={() => setSourceLanguage("en")}
        >
          <CircleFlag countryCode="gb" />
          <span className="lang-button-text">English</span>
        </button>
        <button
          className={`lang-button ${sourceLanguage === "ko" ? "active" : ""}`}
          onClick={() => setSourceLanguage("ko")}
        >
          <CircleFlag countryCode="kr" />
          <span className="lang-button-text">Korean</span>
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
              {Object.entries(languages).map(([code, name]) => (
                <button
                  key={code}
                  className="lang-button"
                  onClick={() => {
                    setSourceLanguage(code);
                    setShowLanguageSelect(false);
                  }}
                >
                  {name}
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
        <img src={swapIcon} alt="swap-icon" />
      </button>

      <div className="language-select target">
        <button
          className={`lang-button ${targetLanguage === "en" ? "active" : ""}`}
          onClick={() => setTargetLanguage("en")}
        >
          <CircleFlag countryCode="gb" />
          <span className="lang-button-text">English</span>
        </button>
        <button
          className={`lang-button ${targetLanguage === "ko" ? "active" : ""}`}
          onClick={() => setTargetLanguage("ko")}
        >
          <CircleFlag countryCode="kr" />
          <span className="lang-button-text">Korean</span>
        </button>
        <button
          className={`lang-button ${targetLanguage === "vi" ? "active" : ""}`}
          onClick={() => setTargetLanguage("vi")}
        >
          <CircleFlag countryCode="vn" />
          <span className="lang-button-text">Vietnamese</span>
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
