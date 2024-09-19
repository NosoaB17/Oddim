import React, { useState } from "react";
import LanguageSelector from "../components/Products/LanguageSelector";
import TranslationArea from "../components/Products/TranslationArea";
import AdditionalFeatures from "../components/Products/AdditionalFeatures";

const Products = () => {
  const [sourceLanguage, setSourceLanguage] = useState("auto");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [sourceText, setSourceText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranscript = (transcript) => {
    setSourceText(transcript);
    // Trigger translation here
  };

  return (
    <div className="products-page">
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
      <AdditionalFeatures
        onTranscript={handleTranscript}
        sourceLanguage={sourceLanguage}
      />
    </div>
  );
};

export default Products;
