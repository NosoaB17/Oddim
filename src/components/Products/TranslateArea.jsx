import React, { useCallback } from "react";
import axios from "axios";
import copyLogo from "../../assets/products/copy.svg";
import speakerLogo from "../../assets/products/speaker.svg";
import editLogo from "../../assets/products/edit.svg";
import checkIcon from "../../assets/products/check.svg";

const TranslateArea = ({
  type,
  text,
  setText,
  language,
  onTranslate,
  detectedLanguage,
  languages = {},
}) => {
  const getCountryCode = (lang) => {
    const languageToCountry = {
      en: "gb",
      ko: "kr",
      vi: "vn",
    };
    return languageToCountry[lang] || lang;
  };

  const getLanguageDisplay = (lang, languages) => {
    if (lang === "auto" && detectedLanguage) {
      return `Detected: ${languages[detectedLanguage]}`;
    }
    if (lang === "auto") {
      return "Detect Language";
    }
    return languages[lang] || lang;
  };

  const handleTextChange = useCallback(
    (e) => {
      setText(e.target.value);
      if (type === "source") {
        const debounceTranslate = setTimeout(() => {
          onTranslate(e.target.value);
        }, 500);
        return () => clearTimeout(debounceTranslate);
      }
    },
    [setText, type, onTranslate]
  );

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard!");
  }, [text]);

  const handleSpeak = useCallback(async () => {
    try {
      const response = await axios({
        method: "get",
        url: "http://localhost:8000/tts",
        params: {
          text: encodeURIComponent(text),
          lang: language,
        },
        responseType: "blob",
      });

      const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  }, [text, language]);

  return (
    <div
      className={`flex h-full w-full flex-col gap-5  py-3 md:flex-row md:justify-evenly md:gap-[88px] ${
        type === "target" ? "pl-0 pr-16" : "px-[5vw]"
      }`}
    >
      <div
        className={`bg-white rounded-[20px] border-solid  text-[#020817] flex flex-col basis-0 leading-[24px] p-[20px] relative transition-all md:min-h-[320px] md:flex-1 min-h-[320px] ${
          type === "target"
            ? "border border-[#f2f2f2]"
            : "border border-[#3d88ed]"
        } `}
      >
        <div className="flex items-center justify-start gap-2 text-[#020817] leading-[24px] mb-[12px]">
          <div className="size-5 overflow-hidden rounded-full">
            {(language !== "auto" || detectedLanguage) && (
              <img
                src={`https://hatscripts.github.io/circle-flags/flags/${getCountryCode(
                  detectedLanguage || language
                )}.svg`}
                alt={detectedLanguage || language}
                height="35"
                className="w-5 h-5 mr-2"
              />
            )}
          </div>
          <span className="opacity-40">
            {getLanguageDisplay(language, languages)}
          </span>
        </div>
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder={
            type === "source" ? "Enter your text here" : "Translation"
          }
          readOnly={type === "target"}
          className="basis-0 text-[#020817] text-[22px] leading-[33px] h-full font-medium flex-1 border-none resize-none outline-none bg-transparent"
        />
        <div className="bottom-0 left-0 mt-auto w-full">
          {" "}
          <div className="bottom-3 right-3 mt-3 flex justify-end gap-2">
            <button
              onClick={handleSpeak}
              title="Listen"
              className="inline-flex items-center justify-center transition-all rounded-full md:w-9 md:h-9 opacity-50 hover:opacity-100"
            >
              <img src={speakerLogo} alt="Speak" className="w-5 h-5" />
            </button>
            <button
              onClick={handleCopy}
              title="Copy to clipboard"
              className="inline-flex items-center justify-center transition-all rounded-full md:w-9 md:h-9 opacity-50 hover:opacity-100"
            >
              <img src={copyLogo} alt="Copy" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default TranslateArea;
