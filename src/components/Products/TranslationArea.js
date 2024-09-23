import React, { useCallback } from "react";
import axios from "axios";
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

  const handleSpeak = useCallback(async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8000/tts",
        params: {
          text: encodeURIComponent(text),
          lang: language,
        },
        responseType: "blob",
      });

      const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.play(); // 200 kí tự
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  }, [text, language]);

  return (
    <div className={`translation-area ${type}`}>
      <div className="translation-content">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder={type === "source" ? "Enter text" : "Translation"}
          readOnly={type === "target"}
        />
        <div className="text-actions">
          <button onClick={handleSpeak} title="Listen">
            <img src={speakerLogo} alt="Speak" />
          </button>
          <button onClick={handleCopy} title="Copy to clipboard">
            <img src={copyLogo} alt="Copy" />
          </button>
        </div>
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
