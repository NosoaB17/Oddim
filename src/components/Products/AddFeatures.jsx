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
    <div className="flex flex-col">
      <div className="flex items-center justify-end py-2 ml-auto gap-2 max-w-[90%]">
        <button
          onClick={onHistoryClick}
          className="flex items-center bg-gray-100 hover:bg-gray-200 transition-colors duration-300 rounded-full px-3 py-2"
        >
          <img src={historyLogo} alt="History" className="w-5 h-5 mr-2" />
          <span className="text-sm text-gray-700">History</span>
        </button>
        <button className="flex items-center bg-gray-100 hover:bg-gray-200 transition-colors duration-300 rounded-full px-3 py-2">
          <img src={phrasesLogo} alt="Phrases" className="w-5 h-5 mr-2" />
          <span className="text-sm text-gray-700">Phrases</span>
        </button>
      </div>
      <div className="flex justify-center items-center gap-8 mt-4">
        <button
          onClick={onCopyAll}
          disabled={!canCopyAll}
          title={canCopyAll ? "Copy all text" : "Cannot copy all text"}
          className={`bg-blue-100 rounded-full w-12 h-12 flex justify-center items-center transition-colors duration-300 
            ${
              canCopyAll ? "hover:bg-blue-200" : "opacity-50 cursor-not-allowed"
            }`}
        >
          <img src={copyAllLogo} alt="Copy All" className="w-5 h-5" />
        </button>
        <div className="bg-white rounded-full w-18 h-18 flex justify-center items-center shadow-md">
          <RecordToTranslate
            onTranscript={onTranscript}
            sourceLanguage={sourceLanguage}
          />
        </div>
        <button
          disabled={!canTakeScreenshot}
          title={
            canTakeScreenshot ? "Take screenshot" : "Cannot take screenshot"
          }
          className={`bg-blue-100 rounded-full w-12 h-12 flex justify-center items-center transition-colors duration-300 
            ${
              canTakeScreenshot
                ? "hover:bg-blue-200"
                : "opacity-50 cursor-not-allowed"
            }`}
        >
          <img src={screenshotLogo} alt="Screenshot" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default AddFeatures;
