import React, { useState, useEffect } from "react";
import axios from "axios";
import detectLanguageIcon from "../../../assets/products/lang-detect.svg";
import attachIcon from "../../../assets/conversation/attach.svg";
import emojiIcon from "../../../assets/conversation/emoji.svg";
import micIcon from "../../../assets/conversation/mic.svg";
import sendIcon from "../../../assets/conversation/send.svg";

const InputMessageBox = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [eslEnabled, setEslEnabled] = useState(false);
  const [eslTranslation, setEslTranslation] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("Detect language");
  const [showEslPreview, setShowEslPreview] = useState(false);

  useEffect(() => {
    if (eslEnabled && message) {
      const translateMessage = async () => {
        try {
          const response = await axios.post("http://localhost:5000/translate", {
            text: message,
            source: "auto",
            target: "en",
          });
          setEslTranslation(response.data.translatedText);
          setDetectedLanguage(response.data.detectedLanguage.toUpperCase());
          setShowEslPreview(true);
        } catch (error) {
          console.error("Translation error:", error);
          setEslTranslation("Translation error occurred");
        }
      };

      const timeoutId = setTimeout(translateMessage, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setShowEslPreview(false);
    }
  }, [message, eslEnabled]);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage({
        content: message,
        eslTranslation: eslEnabled ? eslTranslation : null,
      });
      setMessage("");
      setEslTranslation("");
      setShowEslPreview(false);
    }
  };

  return (
    <div className="input-message-box">
      <div className="esl-toggle">
        <img src={detectLanguageIcon} alt="Translate" />
        <span>E.S.L Translation Tool</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={eslEnabled}
            onChange={() => setEslEnabled(!eslEnabled)}
          />
          <span className="slider round"></span>
        </label>
      </div>
      {eslEnabled && showEslPreview && (
        <div className="esl-preview">
          <div className="detected-language">
            <img src={detectLanguageIcon} alt="Detected language" />
            <span>Detected: {detectedLanguage}</span>
          </div>
          <div className="translation-text">{eslTranslation}</div>
        </div>
      )}
      <div className="message-input-container">
        <div className="input-tools">
          <button>
            <img src={attachIcon} alt="Attach" />
          </button>
          <button>
            <img src={emojiIcon} alt="Emoji" />
          </button>
          <button>
            <img src={micIcon} alt="Voice" />
          </button>
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="message-input"
        />
        {message && (
          <button className="send-button" onClick={handleSend}>
            <img src={sendIcon} alt="Send" />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputMessageBox;
