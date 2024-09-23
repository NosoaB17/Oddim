import React, { useState } from "react";
import historyLogo from "../../assets/products/history.svg";
import phrasesLogo from "../../assets/products/phrases.svg";
import copyAllLogo from "../../assets/products/copy-all.svg";
import screenshotLogo from "../../assets/products/screenshot.svg";
import RecordToTranslate from "./RecordToTranslate";

const AddFeatures = ({
  onTranscript,
  sourceLanguage,
  targetLanguage,
  sourceText,
  targetText,
  eslSource,
  eslTarget,
  isEslMatched,
}) => {
  // State to control the visibility of tooltips
  const [showTooltip, setShowTooltip] = useState("");

  // Function to handle copying all text
  const handleCopyAll = () => {
    if (canCopyAll()) {
      const allText = `Source: ${sourceText}\nTarget: ${targetText}\nESL: ${eslSource}`;
      navigator.clipboard.writeText(allText);
      alert("All text copied to clipboard!");
    }
  };

  // Function to check if copying all text is allowed
  const canCopyAll = () => {
    return sourceLanguage !== "en" && targetLanguage !== "en" && isEslMatched;
  };

  // Function to handle taking a screenshot
  const handleScreenshot = () => {
    if (canTakeScreenshot()) {
      // Implement screenshot functionality here
      alert("Screenshot taken!");
    }
  };

  // Function to check if taking a screenshot is allowed
  const canTakeScreenshot = () => {
    return sourceLanguage !== "en" && targetLanguage !== "en" && isEslMatched;
  };

  return (
    <div className="additional-features-container">
      <div className="additional-features">
        {/* History button */}
        <button
          className="feature-button history-button"
          onMouseEnter={() => setShowTooltip("history")}
          onMouseLeave={() => setShowTooltip("")}
        >
          <img src={historyLogo} alt="History" />
          History
          {showTooltip === "history" && (
            <span className="tooltip">View translation history</span>
          )}
        </button>

        {/* Phrases button */}
        <button
          className="feature-button phrases-button"
          onMouseEnter={() => setShowTooltip("phrases")}
          onMouseLeave={() => setShowTooltip("")}
        >
          <img src={phrasesLogo} alt="Phrases" />
          Phrases
          {showTooltip === "phrases" && (
            <span className="tooltip">View sample sentences</span>
          )}
        </button>
      </div>
      <div className="record-actions">
        <button
          className={`feature-button copy-all-button ${
            !canCopyAll() ? "disabled" : ""
          }`}
          onClick={handleCopyAll}
          disabled={!canCopyAll()}
          onMouseEnter={() => setShowTooltip("copyAll")}
          onMouseLeave={() => setShowTooltip("")}
        >
          <img src={copyAllLogo} alt="Copy All" />
          {showTooltip === "copyAll" && (
            <span className="tooltip">Copy source, target, and ESL text</span>
          )}
        </button>

        <RecordToTranslate
          onTranscript={onTranscript}
          sourceLanguage={sourceLanguage}
          disabled={sourceLanguage === "auto"}
        />
      </div>
      <button
        className={`feature-button screenshot-button ${
          !canTakeScreenshot() ? "disabled" : ""
        }`}
        onClick={handleScreenshot}
        disabled={!canTakeScreenshot()}
        onMouseEnter={() => setShowTooltip("screenshot")}
        onMouseLeave={() => setShowTooltip("")}
      >
        <img src={screenshotLogo} alt="Screenshot" />
        {showTooltip === "screenshot" && (
          <span className="tooltip">Take a screenshot of the translation</span>
        )}
      </button>
    </div>
  );
};

export default AddFeatures;
