import React from "react";
import useRecordToTranslate from "../../hooks/useRecordToTranslate.js";
import micLogo from "../../assets/products/mic.svg";

const RecordToTranslate = ({ onTranscript, sourceLanguage }) => {
  const { isRecording, startRecording, stopRecording } =
    useRecordToTranslate(onTranscript);

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording(sourceLanguage);
    }
  };

  return (
    <button
      className={`record-button ${isRecording ? "recording" : ""}`}
      onClick={handleToggleRecording}
    >
      <img src={micLogo} alt="Record" />
    </button>
  );
};

export default RecordToTranslate;
