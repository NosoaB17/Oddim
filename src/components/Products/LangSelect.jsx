import React, { useState, useMemo, useCallback } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import detectIcon from "../../assets/products/lang-detect.svg";
import arrowDownIcon from "../../assets/products/arrowDown.svg";
import swapIcon from "../../assets/products/swap.svg";

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

  const filteredLanguages = useMemo(() => {
    return Object.entries(languages).filter(([code, name]) =>
      name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [languages, searchQuery]);

  const handleLanguageChange = useCallback(
    (lang, type) => {
      onLanguageChange(type, lang);
      setShowLanguageSelect(false);
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
          className={`flex items-center p-2 rounded-lg transition-colors ${
            isActive ? "bg-white text-blue-500" : "hover:bg-gray-100"
          }`}
          onClick={() => handleLanguageChange(lang, type)}
        >
          {lang === "auto" ? (
            <img
              src={detectIcon}
              alt="Detect language"
              className="w-5 h-5 mr-2"
            />
          ) : (
            <img
              src={`https://hatscripts.github.io/circle-flags/flags/${countryCode}.svg`}
              alt={languageName}
              className="w-5 h-5 mr-2"
            />
          )}
          <span>{languageName}</span>
        </button>
      );
    },
    [languages, getCountryCode, handleLanguageChange]
  );

  return (
    <div className="flex justify-between items-center rounded-lg p-2">
      <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
        {renderLanguageButton("auto", "source", sourceLanguage === "auto")}
        {COMMON_LANGUAGES.map((lang) =>
          renderLanguageButton(lang, "source", sourceLanguage === lang)
        )}
        <button
          className="p-1 rounded-full"
          onClick={() => {
            setSelectingFor("source");
            setShowLanguageSelect(true);
          }}
        >
          <img src={arrowDownIcon} alt="More languages" className="w-5 h-5" />
        </button>
      </div>

      <button
        className="p-1 opacity-100 transition-opacity duration-300 hover:opacity-80"
        onClick={() => {
          if (sourceLanguage !== "auto") {
            onLanguageChange("source", targetLanguage);
            onLanguageChange("target", sourceLanguage);
          }
        }}
        disabled={sourceLanguage === "auto"}
      >
        <img src={swapIcon} alt="Swap languages" className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
        {COMMON_LANGUAGES.map((lang) =>
          renderLanguageButton(lang, "target", targetLanguage === lang)
        )}
        <button
          className="p-1 rounded-full"
          onClick={() => {
            setSelectingFor("target");
            setShowLanguageSelect(true);
          }}
        >
          <img src={arrowDownIcon} alt="More languages" className="w-5 h-5" />
        </button>
      </div>

      {showLanguageSelect && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
          <div className="w-4/5 h-full flex flex-col max-w-4xl">
            <div className="flex items-center p-2 border-b border-gray-200">
              <button
                className="p-1"
                onClick={() => setShowLanguageSelect(false)}
              >
                <ArrowBackIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="p-2">
              <input
                type="text"
                placeholder="Search languages"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 p-5 overflow-y-auto max-h-[calc(100vh-150px)]">
              {filteredLanguages.map(([code, name]) => (
                <button
                  key={code}
                  className={`flex items-center justify-start w-full p-2 text-left text-sm font-bold text-gray-700 hover:bg-gray-100 transition-colors ${
                    (selectingFor === "source"
                      ? sourceLanguage
                      : targetLanguage) === code
                      ? "bg-blue-100 text-blue-700 font-bold"
                      : ""
                  }`}
                  onClick={() => {
                    handleLanguageChange(code, selectingFor);
                  }}
                >
                  <span>{capitalizeFirstLetter(name)}</span>
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
