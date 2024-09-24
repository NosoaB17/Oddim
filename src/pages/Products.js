import React, { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";

import LangSelect from "../components/Products/LangSelect";
import TranslateArea from "../components/Products/TranslateArea";
import AddFeatures from "../components/Products/AddFeatures";
import HistoryModal from "../components/Products/HistoryModal";

const Products = () => {
  const [sourceLanguage, setSourceLanguage] = useState("auto");
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [sourceText, setSourceText] = useState("");
  const [targetText, setTargetText] = useState("");
  const [eslSource, setEslSource] = useState("");
  const [eslTarget, setEslTarget] = useState("");
  const [languages, setLanguages] = useState({});
  const [isEslMatched, setIsEslMatched] = useState(true);
  const [translationHistory, setTranslationHistory] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);

  const lastTranslationTimeout = useRef(null);

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

  const handleLanguageChange = useCallback(
    (type, lang) => {
      if (type === "source") {
        setSourceLanguage(lang);
      } else {
        setTargetLanguage(lang);
      }
      // Trigger translation when target language changes
      if (type === "target" && sourceText) {
        handleTranslate(sourceText, lang);
      }
    },
    [sourceText]
  );

  const handleTranslate = useCallback(
    async (text, targetLang = targetLanguage) => {
      if (!text.trim()) {
        setTargetText("");
        setEslSource("");
        setEslTarget("");
        setIsEslMatched(true);
        return;
      }
      try {
        const response = await axios.post("http://localhost:5000/translate", {
          text,
          source: sourceLanguage,
          target: targetLang,
        });
        setTargetText(response.data.translatedText);
        setEslSource(response.data.eslSource);
        setEslTarget(response.data.eslTarget);

        // Sử dụng hàm compareEsl để xác định isEslMatched
        setIsEslMatched(
          compareEsl(response.data.eslSource, response.data.eslTarget)
        );

        // Save the translation to history only after the user stops typing for 1 second
        clearTimeout(lastTranslationTimeout.current);
        lastTranslationTimeout.current = setTimeout(() => {
          const newTranslation = {
            id: Date.now(),
            sourceLanguage,
            targetLanguage: targetLang,
            sourceText: text,
            targetText: response.data.translatedText,
            eslSource: response.data.eslSource,
            eslTarget: response.data.eslTarget,
            isEslMatched: compareEsl(
              response.data.eslSource,
              response.data.eslTarget
            ),
          };
          setTranslationHistory((prevHistory) => [
            ...prevHistory,
            newTranslation,
          ]);
        }, 5000);
      } catch (error) {
        console.error("Translation error:", error);
        setTargetText("An error occurred during translation.");
        setIsEslMatched(false);
      }
    },
    [sourceLanguage, targetLanguage]
  );

  const compareEsl = (source, target) => {
    // Loại bỏ dấu câu và chuyển về chữ thường
    const cleanSource = source.replace(/[^\w\s]|_/g, "").toLowerCase();
    const cleanTarget = target.replace(/[^\w\s]|_/g, "").toLowerCase();

    const sourceWords = cleanSource.split(/\s+/);
    const targetWords = cleanTarget.split(/\s+/);
    const commonWords = sourceWords.filter((word) =>
      targetWords.includes(word)
    );

    const similarity =
      commonWords.length / Math.max(sourceWords.length, targetWords.length);

    return similarity > 0.8;
  };

  const toggleHistoryModal = useCallback(() => {
    setShowHistoryModal((prev) => !prev);
  }, []);

  const handleDeleteTranslation = useCallback((id) => {
    setTranslationHistory((prevHistory) =>
      prevHistory.filter((item) => item.id !== id)
    );
  }, []);

  const handleClearHistory = useCallback(() => {
    setTranslationHistory([]);
  }, []);

  const handleCopyAll = useCallback(() => {
    if (isEslMatched && sourceLanguage !== "en" && targetLanguage !== "en") {
      const textToCopy = `${sourceText}\n${targetText}\n${eslSource}`;
      navigator.clipboard.writeText(textToCopy);
      alert("All text copied to clipboard!");
    }
  }, [
    isEslMatched,
    sourceLanguage,
    targetLanguage,
    sourceText,
    targetText,
    eslSource,
  ]);

  return (
    <div className={`products-page ${showHistoryModal ? "history-open" : ""}`}>
      <div className="products-content">
        <LangSelect
          onLanguageChange={handleLanguageChange}
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
          languages={languages}
        />
        <div className="translation-container">
          <TranslateArea
            type="source"
            text={sourceText}
            setText={setSourceText}
            language={sourceLanguage}
            onTranslate={handleTranslate}
            eslText={eslSource}
            isEslMatched={isEslMatched}
            setEslText={setEslSource}
          />
          <TranslateArea
            type="target"
            text={targetText}
            setText={setTargetText}
            language={targetLanguage}
            eslText={eslTarget}
            isEslMatched={isEslMatched}
            setEslText={setEslTarget}
          />
        </div>
        <AddFeatures
          onHistoryClick={toggleHistoryModal}
          onCopyAll={handleCopyAll}
          isEslMatched={isEslMatched}
          sourceLanguage={sourceLanguage}
          targetLanguage={targetLanguage}
        />
      </div>
      {showHistoryModal && (
        <HistoryModal
          onClose={toggleHistoryModal}
          history={translationHistory}
          onDeleteTranslation={handleDeleteTranslation}
          onClearHistory={handleClearHistory}
        />
      )}
    </div>
  );
};

export default Products;
