import { useState, useCallback } from "react";

const useRecordToTranslate = (onTranscript) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const startRecording = useCallback(
    (lang) => {
      if ("webkitSpeechRecognition" in window) {
        const recognition = new window.webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = lang;

        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
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
        recognition.start();
        setIsRecording(true);
      } else {
        console.error("Speech recognition not supported in this browser.");
      }
    },
    [onTranscript]
  );

  const stopRecording = useCallback(() => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
    }
  }, [recognition]);

  return { isRecording, startRecording, stopRecording };
};

export default useRecordToTranslate;
