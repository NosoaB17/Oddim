import React, { useState, useEffect } from "react";
import LangSelect from "../components/Products/LangSelect";
import TranslateArea from "../components/Products/TranslateArea";
import AddFeatures from "../components/Products/AddFeatures";
import HistoryModal from "../components/Products/HistoryModal";
import axios from "axios";

const Products = () => {
  const [sourceLanguage, setSourceLanguage] = useState("auto");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [detectedLanguage, setDetectedLanguage] = useState(null);
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [eslText, setEslText] = useState("");
  const [isEslMatched, setIsEslMatched] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [languages, setLanguages] = useState({});

  useEffect(() => {
    // Fetch languages
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

  const handleLanguageChange = (type, lang) => {
    if (type === "source") {
      setSourceLanguage(lang);
    } else {
      setTargetLanguage(lang);
    }
  };

  const handleTranslate = async (text) => {
    try {
      const response = await axios.post("http://localhost:5000/translate", {
        text,
        source: sourceLanguage,
        target: targetLanguage,
      });
      const { translatedText, eslText, isMatched, detectedLanguage } =
        response.data;
      setTargetText(translatedText);
      setEslText(eslText);
      setIsEslMatched(isMatched);

      if (sourceLanguage === "auto" && detectedLanguage) {
        setDetectedLanguage(detectedLanguage);
        setSourceLanguage(detectedLanguage);
      }

      const newTranslation = {
        id: Date.now(),
        sourceText: text,
        targetText: translatedText,
        sourceLanguage,
        targetLanguage,
        eslSource: eslText,
        isEslMatched: isMatched,
      };
      setHistory((prevHistory) => [newTranslation, ...prevHistory]);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  const handleHistoryClick = () => {
    setIsHistoryOpen(true);
  };

  const handleCopyAll = () => {
    const textToCopy = `${sourceText}\n${targetText}\n${eslText}`;
    navigator.clipboard.writeText(textToCopy);
    alert("All text copied to clipboard!");
  };

  const handleDeleteTranslation = (id) => {
    setHistory((prevHistory) => prevHistory.filter((item) => item.id !== id));
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="relative w-full p-5">
      <div
        className={`transition-all duration-300 ease-in-out ${
          isHistoryOpen ? "mr-[300px]" : ""
        }`}
      >
        <LangSelect
          onLanguageChange={handleLanguageChange}
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
          languages={languages}
          detectedLanguage={detectedLanguage}
        />
        <div className="flex gap-5 mt-5">
          <TranslateArea
            type="source"
            text={sourceText}
            setText={setSourceText}
            language={sourceLanguage}
            onTranslate={handleTranslate}
            detectedLanguage={detectedLanguage}
          />
          <TranslateArea
            type="target"
            text={targetText}
            setText={setTargetText}
            language={targetLanguage}
            eslText={eslText}
            isEslMatched={isEslMatched}
          />
        </div>
        <AddFeatures
          onHistoryClick={handleHistoryClick}
          onCopyAll={handleCopyAll}
          isEslMatched={isEslMatched}
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
        />
      </div>
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onDeleteTranslation={handleDeleteTranslation}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
};

export default Products;
