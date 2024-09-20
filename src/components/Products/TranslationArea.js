import React, { useCallback } from "react";
import copyLogo from "../../assets/products/copy.svg";
import speakerLogo from "../../assets/products/speaker.svg";

const TranslationArea = ({
  type,
  text,
  setText,
  language,
  onTranslate,
  eslText,
  isEslMatched,
}) => {
  const handleTextChange = useCallback(
    (e) => {
      setText(e.target.value);
      if (type === "source") {
        onTranslate(e.target.value);
      }
    },
    [setText, type, onTranslate]
  );

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  }, [text]);

  const handleSpeak = useCallback(() => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    window.speechSynthesis.speak(utterance);
  }, [text, language]);

  return (
    <div className={`translation-area ${type}`}>
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder={type === "source" ? "Enter text" : "Translation"}
        readOnly={type === "target"}
      />
      <div className="text-actions">
        <button onClick={handleSpeak}>
          <img src={speakerLogo} alt="Speak" />
        </button>
        <button onClick={handleCopy}>
          <img src={copyLogo} alt="Copy" />
        </button>
      </div>
      {eslText && (
        <div className={`esl-area ${isEslMatched ? "matched" : "unmatched"}`}>
          <h4>ESL Translation:</h4>
          <p>{eslText}</p>
        </div>
      )}
    </div>
  );
};

export default TranslationArea;
