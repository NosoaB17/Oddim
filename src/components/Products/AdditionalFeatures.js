import React from "react";
import historyLogo from "../../assets/products/history.svg";
import phrasesLogo from "../../assets/products/phrases.svg";
import RecordToTranslate from "./RecordToTranslate";

const AdditionalFeatures = ({ onTranscript, sourceLanguage }) => {
  return (
    <div className="additional-features-container">
      <div className="additional-features">
        <button className="history-button">
          <img src={historyLogo} alt="History" />
          History
        </button>
        <button className="phrases-button">
          <img src={phrasesLogo} alt="Phrases" />
          Saved phrases
        </button>
      </div>
      <div className="record-actions">
        <RecordToTranslate
          onTranscript={onTranscript}
          sourceLanguage={sourceLanguage}
        />
      </div>
    </div>
  );
};

export default AdditionalFeatures;
