import React from "react";
import detectIcon from "../../assets/products/lang-detect.svg";
import englishIcon from "../../assets/products/uk-flag.svg";
import vietnameseIcon from "../../assets/products/vn-flag.svg";
import koreanIcon from "../../assets/products/kr-flag.svg";
import swapIcon from "../../assets/products/swap.svg";

const LanguageSelector = ({
  sourceLanguage,
  targetLanguage,
  setSourceLanguage,
  setTargetLanguage,
}) => {
  const languages = [
    { code: "auto", name: "Detect language", icon: detectIcon },
    { code: "en", name: "English", icon: englishIcon },
    { code: "vi", name: "Vietnamese", icon: vietnameseIcon },
    { code: "ko", name: "Korean", icon: koreanIcon },
  ];

  const handleSwap = () => {
    if (sourceLanguage !== "auto") {
      const temp = sourceLanguage;
      setSourceLanguage(targetLanguage);
      setTargetLanguage(temp);
    }
  };

  return (
    <div className="language-selector">
      <div className="language-select source">
        {languages.map((lang) => (
          <button
            key={lang.code}
            className={`lang-button ${
              sourceLanguage === lang.code ? "active" : ""
            }`}
            onClick={() => setSourceLanguage(lang.code)}
          >
            <img src={lang.icon} alt={lang.name} />
            {lang.name}
          </button>
        ))}
      </div>
      <button className="swap-button" onClick={handleSwap}>
        <img src={swapIcon} alt="swap languages" />
      </button>
      <div className="language-select target">
        {languages
          .filter((lang) => lang.code !== "auto")
          .map((lang) => (
            <button
              key={lang.code}
              className={`lang-button ${
                targetLanguage === lang.code ? "active" : ""
              }`}
              onClick={() => setTargetLanguage(lang.code)}
            >
              <img src={lang.icon} alt={lang.name} />
              {lang.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default LanguageSelector;
