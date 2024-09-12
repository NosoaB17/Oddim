import React, { useState, useEffect } from "react";
import MiddoIntroVideo from "../../assets/MiddoIntroVideo.mp4";

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
      }, 500); // Đợi hiệu ứng fade out hoàn thành
    }, 2000); // Chuyển đổi mỗi 2 giây

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero">
      <div className="hero-content">
        <h1>
          <span className="changing-text">
            {languages[currentLanguage].first}
          </span>
          <br />
          <span className="changing-text">
            {languages[currentLanguage].second}
          </span>
        </h1>
        <p>
          Middo can be your trusted tool to do all translation work. Beside that
          we also provide a barrier-free language conversation platform.
        </p>
        <button className="download-btn">Download App</button>
      </div>
      <div className="hero-video">
        <div className="video-container">
          <video src={MiddoIntroVideo} alt="Video call" muted />
        </div>
      </div>
    </div>
  );
};

export default Hero;
