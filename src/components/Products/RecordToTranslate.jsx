import React, { useState, useEffect } from "react";
import micLogo from "../../assets/products/mic.svg";

const RecordToTranslate = ({ onTranscript, sourceLanguage }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = sourceLanguage;

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        onTranscript(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      setRecognition(recognition);
    } else {
      console.log("Speech recognition not supported");
    }

    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [sourceLanguage, onTranscript]);

  const toggleRecording = () => {
    if (isRecording) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsRecording(!isRecording);
  };

  return (
    <button
      onClick={toggleRecording}
      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
        isRecording
          ? "bg-red-500 hover:bg-red-600"
          : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      <img src={micLogo} alt="Record" className="w-6 h-6 filter invert" />
    </button>
  );
};

export default RecordToTranslate;
