import React from "react";
import historyLogo from "../../assets/products/history.svg";
import phrasesLogo from "../../assets/products/phrases.svg";
import copyAllLogo from "../../assets/products/copy-all.svg";
import micLogo from "../../assets/products/mic.svg";
import screenshotLogo from "../../assets/products/screenshot.svg";

const AddFeatures = () => {
  return (
    <div className="additional-features-container">
      <div className="additional-features">
        <button className="feature-button history-button">
          <img src={historyLogo} alt="History" />
          <span className="text">History</span>
        </button>
        <button className="feature-button phrases-button">
          <img src={phrasesLogo} alt="Phrases" />
          <span className="text">Phrases</span>
        </button>
      </div>
      <div className="record-actions">
        <button className="copy-all-button">
          <img src={copyAllLogo} alt="Copy All" />
        </button>
        <div className="record-button-container">
          <button className="record-button">
            <img src={micLogo} alt="Record" />
          </button>
        </div>
        <button className="screenshot-button">
          <img src={screenshotLogo} alt="Screenshot" />
        </button>
      </div>
    </div>
  );
};

export default AddFeatures;
