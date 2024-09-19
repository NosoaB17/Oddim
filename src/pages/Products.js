import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import debounce from "lodash/debounce";
import LanguageSelector from "../components/Products/LanguageSelector";
import TranslationArea from "../components/Products/TranslationArea";
import AdditionalFeatures from "../components/Products/AdditionalFeatures";

const Products = () => {
  const [sourceLanguage, setSourceLanguage] = useState("auto");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  const { handleTranslate, debouncedTranslate } = useMemo(() => {
    const handleTranslate = async () => {
      if (!sourceText.trim()) {
        setTranslatedText("");
        return;
      }

      setIsTranslating(true);
      try {
        const response = await axios.post("http://localhost:5000/translate", {
          q: sourceText,
          source: sourceLanguage === "auto" ? "auto" : sourceLanguage,
          target: targetLanguage,
        });

        if (response.data && response.data.translatedText) {
          setTranslatedText(response.data.translatedText);
        } else {
          throw new Error("Translation failed");
        }
      } catch (error) {
        console.error(
          "Translation error:",
          error.response ? error.response.data : error.message
        );
        setTranslatedText("An error occurred during translation.");
      } finally {
        setIsTranslating(false);
      }
    };

    const debouncedTranslate = debounce(handleTranslate, 500);

    return { handleTranslate, debouncedTranslate };
  }, [sourceText, sourceLanguage, targetLanguage]);

  useEffect(() => {
    if (sourceText) {
      debouncedTranslate();
    } else {
      setTranslatedText("");
    }
    return () => debouncedTranslate.cancel();
  }, [sourceText, debouncedTranslate]);

  return (
    <div className="products-page">
      <div className="products-content">
        <LanguageSelector
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
          setSourceLanguage={setSourceLanguage}
          setTargetLanguage={setTargetLanguage}
        />
        <TranslationArea
          sourceText={sourceText}
          translatedText={translatedText}
          setSourceText={setSourceText}
          isTranslating={isTranslating}
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
        />
        <AdditionalFeatures />
      </div>
    </div>
  );
};

export default Products;
