import React, { useState, useEffect } from "react";
import MiddoIntroVideo from "../../assets/home/hero/MiddoIntroVideo.mp4";
import { FaWindows } from "react-icons/fa";
import VideoCover from "../../assets/home/hero/videocover.png";

const Hero = () => {
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const languages = [
    {
      first: "To break all",
      second: "languages boundary",
      lang: "English",
    },
    {
      first: "Phá vỡ mọi",
      second: "rào cản ngôn ngữ",
      lang: "Vietnamese",
    },
    {
      first: "모두 깨뜨리려면",
      second: "언어 경계",
      lang: "Korean",
    },
    {
      first: "Pour briser toutes",
      second: "frontière des langues",
      lang: "French",
    },
    {
      first: "去打破一切",
      second: "语言边界",
      lang: "Chinese",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentLanguage((prev) => (prev + 1) % languages.length);
        setIsFading(false);
      }, 500); // Wait for FaceOut Complete
    }, 2000); // Transition every 2s

    return () => clearInterval(interval);
  }, [languages.length]);

  return (
    <div
      className="flex flex-row-reverse justify-between p-10 bg-gray-50 bg-center bg-contain h-screen/2"
      style={{
        backgroundImage: "url('https://middo.app/landing-page/hero.png')",
      }}
    >
      <div className="flex justify-end flex-1 max-w-[45%] px-8 relative">
        <video
          src={MiddoIntroVideo}
          poster={VideoCover}
          alt="Video call"
          muted
          controls
          playsInline
          className="mt-6 absolute inset-0 object-contain rounded-3xl"
        />
      </div>
      <div className="flex-1 flex flex-col justify-center items-start my-8 mr-8 max-w-[50%]">
        <div className="w-full max-w-[680px]">
          <h1 className="flex flex-col overflow-hidden mb-5">
            <span
              className={`text-6xl font-bold leading-tight text-left transition-opacity duration-500 ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            >
              {languages[currentLanguage].first}
            </span>
            <span
              className={`text-6xl font-bold leading-tight text-left text-blue-500 transition-opacity duration-500 ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            >
              {languages[currentLanguage].second}
            </span>
          </h1>
          <p className="text-base text-gray-600 mb-4">
            Middo can be your trusted tool to do all translation work. Beside
            that we also provide a barrier-free language conversation platform.
          </p>
          <button className="flex items-center px-7 py-4 bg-blue-500 text-white rounded-lg font-semibold transition-colors duration-300 hover:bg-blue-600">
            <FaWindows className="mr-2" />
            Download App
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
