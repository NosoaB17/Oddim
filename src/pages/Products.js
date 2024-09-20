import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import LanguageSelector from "../components/Products/LanguageSelector";
import TranslationArea from "../components/Products/TranslationArea";
import AdditionalFeatures from "../components/Products/AdditionalFeatures";

const Products = () => {
  const [sourceLanguage, setSourceLanguage] = useState("auto");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [eslSource, setEslSource] = useState("");
  const [eslTarget, setEslTarget] = useState("");
  const [languages, setLanguages] = useState({});

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

  const handleLanguageChange = useCallback((type, lang) => {
    if (type === "source") {
      setSourceLanguage(lang);
    } else {
      setTargetLanguage(lang);
    }
  }, []);

  const handleTranslate = useCallback(
    async (text) => {
      if (!text.trim()) {
        setTargetText("");
        setEslSource("");
        setEslTarget("");
        return;
      }
      try {
        const response = await axios.post("http://localhost:5000/translate", {
          text,
          source: sourceLanguage,
          target: targetLanguage,
        });
        setTargetText(response.data.translatedText);
        setEslSource(response.data.eslSource);
        setEslTarget(response.data.eslTarget);
      } catch (error) {
        console.error("Translation error:", error);
        setTargetText("An error occurred during translation.");
      }
    },
    [sourceLanguage, targetLanguage]
  );

  const isEslMatched = eslSource.toLowerCase() === eslTarget.toLowerCase();

  return (
    <div className="products-page">
      <div className="products-content">
        <LanguageSelector
          onLanguageChange={handleLanguageChange}
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
          languages={languages}
        />
        <div className="translation-container">
          <TranslationArea
            type="source"
            text={sourceText}
            setText={setSourceText}
            language={sourceLanguage}
            onTranslate={handleTranslate}
            eslText={eslSource}
            isEslMatched={isEslMatched}
          />
          <TranslationArea
            type="target"
            text={targetText}
            setText={setTargetText}
            language={targetLanguage}
            eslText={eslTarget}
            isEslMatched={isEslMatched}
          />
        </div>
        <AdditionalFeatures />
      </div>
    </div>
  );
};

export default Products;
