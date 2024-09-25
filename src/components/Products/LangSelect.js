import React, { useState, useMemo, useCallback } from "react";

import detectIcon from "../../assets/products/lang-detect.svg";
import arrowDownIcon from "../../assets/products/arrowDown.svg";
import swapIcon from "../../assets/products/swap.svg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const COMMON_LANGUAGES = ["en", "ko", "vi"];

const LangSelect = ({
  onLanguageChange,
  sourceLanguage,
  targetLanguage,
  languages,
}) => {
  const [showLanguageSelect, setShowLanguageSelect] = useState(false);
  const [selectingFor, setSelectingFor] = useState("source");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  const handleSwap = useCallback(() => {
    if (sourceLanguage !== "auto") {
      onLanguageChange("source", targetLanguage);
      onLanguageChange("target", sourceLanguage);
    }
  }, [sourceLanguage, targetLanguage, onLanguageChange]);

  const filteredLanguages = useMemo(() => {
    return Object.entries(languages).filter(([code, name]) =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [languages, searchQuery]);

  const handleLanguageChange = useCallback(
    (lang, type) => {
      onLanguageChange(type, lang);
      setShowLanguageSelect(false);
      setSelectedLanguage(lang);
    },
    [onLanguageChange]
  );

  const getCountryCode = useCallback((lang) => {
    const countryMap = {
      en: "gb",
      ko: "kr",
      vi: "vn",
    };
    return countryMap[lang] || lang;
  }, []);

  const renderLanguageButton = useCallback(
    (lang, type, isActive, key) => {
      const countryCode = getCountryCode(lang);
      const languageName =
        lang === "auto"
          ? "Detect"
          : languages[lang]
          ? capitalizeFirstLetter(languages[lang])
          : "";
      return (
        <button
          key={key}
          className={`lang-button ${isActive ? "active" : ""}`}
          onClick={() => handleLanguageChange(lang, type)}
        >
          {lang === "auto" ? (
            <img src={detectIcon} alt="Detect language" />
          ) : (
            <img
              src={`https://hatscripts.github.io/circle-flags/flags/${countryCode}.svg`}
              alt={languageName}
            />
          )}
          <span className="lang-button-text">{languageName}</span>
        </button>
      );
    },
    [
      languages,
      getCountryCode,
      handleLanguageChange,
      sourceLanguage,
      targetLanguage,
    ]
  );

  return (
    <div className="language-selector">
      <div className="language-select source">
        {renderLanguageButton("auto", "source", sourceLanguage === "auto")}
        {COMMON_LANGUAGES.map((lang) =>
          renderLanguageButton(lang, "source", sourceLanguage === lang)
        )}
        <button
          className="lang-button dropdown"
          onClick={() => {
            setSelectingFor("source");
            setShowLanguageSelect(true);
          }}
        >
          <img src={arrowDownIcon} alt="More languages" />
        </button>
      </div>

      <button
        className="swap-button"
        onClick={handleSwap}
        disabled={sourceLanguage === "auto"}
      >
        <img src={swapIcon} alt="Swap languages" />
      </button>

      <div className="language-select target">
        {COMMON_LANGUAGES.map((lang) =>
          renderLanguageButton(lang, "target", targetLanguage === lang)
        )}
        <button
          className="lang-button dropdown"
          onClick={() => {
            setSelectingFor("target");
            setShowLanguageSelect(true);
          }}
        >
          <img src={arrowDownIcon} alt="More languages" />
        </button>
      </div>

      {showLanguageSelect && (
        <div className="language-select-modal">
          <div className="modal-content">
            <div className="modal-header">
              <button
                className="return-button"
                onClick={() => setShowLanguageSelect(false)}
              >
                <ArrowBackIcon size={24} />
              </button>
            </div>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search languages"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="language-search"
              />
            </div>
            <div className="language-list">
              {filteredLanguages.map(([code, name]) => (
                <button
                  key={code}
                  className={`lang-button ${
                    (selectingFor === "source"
                      ? sourceLanguage
                      : targetLanguage) === code
                      ? "active"
                      : ""
                  }`}
                  onClick={() => {
                    handleLanguageChange(code, selectingFor);
                  }}
                >
                  <span className="lang-list-text">
                    {capitalizeFirstLetter(name)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(LangSelect);
