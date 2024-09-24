import React from "react";
import historyLogo from "../../assets/products/history2.svg";
import clearLogo from "../../assets/products/clear.svg";
import copyAllLogo from "../../assets/products/copy-all.svg";
import deleteLogo from "../../assets/products/delete.svg";

const getCountryCode = (lang) => {
  const countryMap = {
    en: "gb",
    ko: "kr",
    vi: "vn",
    // Add more mappings as needed
  };
  return countryMap[lang] || lang;
};

const HistoryModal = ({
  isOpen,
  onClose,
  history,
  onDeleteTranslation,
  onClearHistory,
}) => {
  const handleCopyTranslation = (item) => {
    const textToCopy = `${item.sourceText}\n${item.targetText}\n${item.eslSource}`;
    navigator.clipboard.writeText(textToCopy);
    alert("Translation copied to clipboard!");
  };

  const handleDelete = (id) => {
    onDeleteTranslation(id);
  };

  return (
    <div className={`history-modal ${isOpen ? "open" : ""}`}>
      <div className="history-modal-header">
        <img src={historyLogo} alt="History" />
        <span className="text">History</span>
        <button className="close-button" onClick={onClose}>
          ×
        </button>
      </div>
      <div className="history-modal-actions">
        <button onClick={onClearHistory}>
          <img src={clearLogo} alt="Clear" />
          <span>Clear all</span>
        </button>
      </div>
      <div className="history-modal-content">
        {history.map((item) => (
          <div key={item.id} className="history-item">
            <div className="language">
              <img
                src={`https://hatscripts.github.io/circle-flags/flags/${getCountryCode(
                  item.sourceLanguage
                )}.svg`}
                alt={item.sourceLanguage}
              />
              <span>{item.sourceLanguage}</span>
            </div>
            <div className="text">{item.sourceText}</div>
            <div className="language">
              <img
                src={`https://hatscripts.github.io/circle-flags/flags/${getCountryCode(
                  item.targetLanguage
                )}.svg`}
                alt={item.targetLanguage}
              />
              <span>{item.targetLanguage}</span>
            </div>
            <div className="text">{item.targetText}</div>
            <div className="actions">
              <button
                className="copy-button"
                onClick={() => handleCopyTranslation(item)}
                disabled={!item.isEslMatched}
              >
                <img src={copyAllLogo} alt="Copy" />
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(item.id)}
              >
                <img src={deleteLogo} alt="Delete" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryModal;
