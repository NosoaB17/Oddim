import React, { useCallback } from "react";
import axios from "axios";
import copyLogo from "../../assets/products/copy.svg";
import speakerLogo from "../../assets/products/speaker.svg";

const TranslateArea = ({
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

      audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  }, [text, language]);

  return (
    <div className={`flex-1 relative ${type}`}>
      <div className="flex flex-col h-full">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder={type === "source" ? "Enter text" : "Translation"}
          readOnly={type === "target"}
          className="flex-1 w-full min-h-[300px] p-4 border-none resize-none text-base focus:outline-none"
        />
        <div className="absolute bottom-2 right-2 flex">
          <button
            onClick={handleSpeak}
            title="Listen"
            className="p-1 ml-2 hover:opacity-70"
          >
            <img src={speakerLogo} alt="Speak" className="w-5 h-5" />
          </button>
          <button
            onClick={handleCopy}
            title="Copy to clipboard"
            className="p-1 ml-2 hover:opacity-70"
          >
            <img src={copyLogo} alt="Copy" className="w-5 h-5" />
          </button>
        </div>
      </div>
      {eslText && (
        <div
          className={`rounded p-4 mt-2 ${
            isEslMatched
              ? "bg-green-100 border border-green-500"
              : "bg-red-100 border border-red-500"
          }`}
        >
          <h4 className="text-sm font-bold text-gray-700 mb-1">
            ESL Translation:
          </h4>
          <p className="text-sm text-gray-800">{eslText}</p>
        </div>
      )}
    </div>
  );
};

export default TranslateArea;
