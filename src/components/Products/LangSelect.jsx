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
    (lang, type, isActive) => {
      const countryCode = getCountryCode(lang);
      const languageName =
        lang === "auto"
          ? "Detect"
          : languages[lang]
          ? capitalizeFirstLetter(languages[lang])
          : "";
      return (
        <button
          key={lang}
          className={`flex items-center px-3 py-2 rounded-xl transition-colors ${
            isActive ? "bg-white text-blue-500 shadow-sm" : "hover:bg-gray-200"
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

  const renderLanguageButtons = useCallback(
    (type) => {
      const currentLanguage =
        type === "source" ? sourceLanguage : targetLanguage;
      const defaultLanguages =
        type === "source" ? ["auto", "en", "ko"] : COMMON_LANGUAGES;

      return defaultLanguages.map((lang) => {
        const isActive = currentLanguage === lang;
        const shouldRender = defaultLanguages.includes(lang) || isActive;

        if (shouldRender) {
          return renderLanguageButton(lang, type, isActive);
        }
        return null;
      });
    },
    [sourceLanguage, targetLanguage, renderLanguageButton]
  );

  return (
    <div className="flex w-full items-center justify-center gap-5 md:gap-0 px-[5vw]">
      <div className="flex h-[42px] w-full flex-1 items-center gap-2">
        <div className="flex h-full w-full max-w-full gap-2 overflow-hidden rounded-xl font-semibold lg:w-fit lg:max-w-[calc(100%-48px)] lg:bg-neutral-100 lg:p-1">
          {renderLanguageButtons("source")}
        </div>
        <button
          className="items-center justify-center bg-neutral-100 text-neutral-700 md:hover:bg-neutral-200 rounded-full hidden lg:flex md:w-10 md:h-10"
          onClick={() => {
            setSelectingFor("source");
            setShowLanguageSelect(true);
          }}
        >
          <img src={arrowDownIcon} alt="More languages" className="w-5 h-5" />
        </button>
      </div>
      <div className="flex w-5 items-center justify-center md:w-[88px]">
        <button
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
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
      </div>
      <div className="flex h-[42px] w-full flex-1 items-center gap-2">
        <div className="flex h-full w-full max-w-full gap-2 overflow-hidden rounded-xl font-semibold lg:w-fit lg:max-w-[calc(100%-48px)] lg:bg-neutral-100 lg:p-1">
          {renderLanguageButtons("target")}
        </div>
        <button
          className="items-center justify-center bg-neutral-100 text-neutral-700 md:hover:bg-neutral-200 rounded-full hidden lg:flex md:w-10 md:h-10"
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
