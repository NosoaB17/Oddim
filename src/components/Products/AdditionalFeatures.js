import React from "react";
import micLogo from "../../assets/products/mic.svg";
import historyLogo from "../../assets/products/history.svg";
import phrasesLogo from "../../assets/products/phrases.svg";

const AdditionalFeatures = () => {
  return (
    <div className="additional-features-container">
      <div className="additional-features">
        <div className="right-actions">
          <button className="history-button">
            <img src={historyLogo} alt="History" />
            History
          </button>
          <button className="phrases-button">
            <img src={phrasesLogo} alt="Phrases" />
            Phrases
          </button>
        </div>
      </div>
      <div className="record-actions">
        {" "}
        <button className="voice-input-button">
          <img src={micLogo} alt="Voice Input" />
        </button>
      </div>
    </div>
  );
};

export default AdditionalFeatures;
