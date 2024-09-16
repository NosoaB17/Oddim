import React from 'react';

const TranslationArea = () => {
  return (
    <div className="translation-area">
      <div className="input-area">
        <div className="language-tag">Vietnamese</div>
        <textarea placeholder="Enter your text here" />
        <div className="action-buttons">
          <button className="listen-button">🔊</button>
          <button className="copy-button">📋</button>
        </div>
      </div>
      <div className="output-area">
        <div className="language-tag">English</div>
        <div className="translated-text"></div>
        <div className="action-buttons">
          <button className="listen-button">🔊</button>
          <button className="copy-button">📋</button>
        </div>
      </div>
    </div>
  );
};

export default TranslationArea;
