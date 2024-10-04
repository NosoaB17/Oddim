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
      <div className="flex w-full justify-end gap-2 px-[5vw]">
        <button
          onClick={onHistoryClick}
          className="flex items-center justify-center bg-[#f2f2f2] md:hover:bg-gray-200 py-2 px-3 rounded-2xl"
        >
          <img src={historyLogo} alt="History" className="w-4 h-4 mr-2" />
          <span className="text-base font-semibold text-[#4d4d4d]">
            History
          </span>
        </button>
        <button className="flex items-center justify-center font-semibold bg-[#f2f2f2] text-[#4d4d4d] md:hover:bg-gray-200 py-2 px-3 rounded-2xl">
          <img src={phrasesLogo} alt="Phrases" className="w-4 h-4 mr-2" />
          <span className="text-base font-semibold text-[#4d4d4d]">
            Phrases
          </span>
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
