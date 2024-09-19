import React from "react";
import copyLogo from "../../assets/products/copy.svg";
import speakerLogo from "../../assets/products/speaker.svg";

const TranslationArea = ({
  sourceText,
  translatedText,
  setSourceText,
  isTranslating,
  sourceLanguage,
  targetLanguage,
}) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleSpeak = (text, lang) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="translation-area">
      <div className="text-area source-text">
        <textarea
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)}
          placeholder="Enter text"
        />
        <div className="text-actions">
          <button onClick={() => handleSpeak(sourceText, sourceLanguage)}>
            <img src={speakerLogo} alt="Speak" />
          </button>
          <button onClick={() => handleCopy(sourceText)}>
            <img src={copyLogo} alt="Copy" />
          </button>
        </div>
      </div>
      <div className="text-area translated-text">
        <textarea
          value={
            isTranslating && !translatedText ? "Translating..." : translatedText
          }
          readOnly
          placeholder="Translation"
        />
        <div className="text-actions">
          <button onClick={() => handleSpeak(translatedText, targetLanguage)}>
            <img src={speakerLogo} alt="Speak" />
          </button>
          <button onClick={() => handleCopy(translatedText)}>
            <img src={copyLogo} alt="Copy" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TranslationArea;
