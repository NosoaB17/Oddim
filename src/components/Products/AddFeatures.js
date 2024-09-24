import React from "react";
import historyLogo from "../../assets/products/history.svg";
import phrasesLogo from "../../assets/products/phrases.svg";
import copyAllLogo from "../../assets/products/copy-all.svg";
import screenshotLogo from "../../assets/products/screenshot.svg";
import RecordToTranslate from "./RecordToTranslate";

const AddFeatures = ({
  onHistoryClick,
  onCopyAll,
  isEslMatched,
  sourceLanguage,
  targetLanguage,
  onTranscript,
}) => {
  const canCopyAll =
    isEslMatched && sourceLanguage !== "en" && targetLanguage !== "en";
  const canTakeScreenshot =
    isEslMatched && sourceLanguage !== "en" && targetLanguage !== "en";

  return (
    <div className="additional-features-container">
      <div className="additional-features">
        <button
          className="feature-button history-button"
          onClick={onHistoryClick}
        >
          <img src={historyLogo} alt="History" />
          <span className="text">History</span>
        </button>
        <button className="feature-button phrases-button">
          <img src={phrasesLogo} alt="Phrases" />
          <span className="text">Phrases</span>
        </button>
      </div>
      <div className="record-actions">
        <button
          className="copy-all-button"
          onClick={onCopyAll}
          disabled={!canCopyAll}
          title={canCopyAll ? "Copy all text" : "Cannot copy all text"}
        >
          <img src={copyAllLogo} alt="Copy All" />
        </button>
        <div className="record-button-container">
          <RecordToTranslate
            onTranscript={onTranscript}
            sourceLanguage={sourceLanguage}
          />
        </div>
        <button
          className="screenshot-button"
          disabled={!canTakeScreenshot}
          title={
            canTakeScreenshot ? "Take screenshot" : "Cannot take screenshot"
          }
        >
          <img src={screenshotLogo} alt="Screenshot" />
        </button>
      </div>
    </div>
  );
};

export default AddFeatures;
