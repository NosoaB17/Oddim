import React from "react";
import copyLogo from "../../assets/products/copy.svg";
import speakerLogo from "../../assets/products/speaker.svg";

const TranslationArea = () => {
  return (
    <div className="translation-area">
      <div className="input-area">
        <div className="language-tag">Vietnamese</div>
        <textarea placeholder="Enter your text here" />
        <div className="action-buttons">
          <img src={speakerLogo} alt="speakerLogo" className="speakerLogo" />
          <img src={copyLogo} alt="copyLogo" className="copyLogo" />
        </div>
      </div>
      <div className="output-area">
        <div className="language-tag">English</div>
        <div className="translated-text"></div>
        <div className="action-buttons">
          <img src={speakerLogo} alt="speakerLogo" className="speakerLogo" />
          <img src={copyLogo} alt="copyLogo" className="copyLogo" />
        </div>
      </div>
    </div>
  );
};

export default TranslationArea;
