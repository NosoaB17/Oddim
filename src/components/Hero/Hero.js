import videoHomePage from "../../assets/MiddoIntroVideo.mp4";
import "../../assets/scss/components/Hero.scss";
import { FaWindows } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="hero-container">
      <div className="video-container">
        <video controls muted>
          <source src={videoHomePage} type="video/mp4" />
        </video>
      </div>
      <div className="hero-content">
        <h1 className="title1"> Pha vo moi </h1>
        <h1 className="title2"> rao can ngon ngu </h1>
        <div className="title3">
          Middo can be your trusted tool to do all translation work. Beisde that
          we also provide a barrier-free language conversation platform.
        </div>
        <div className="title4">
          <button>
            <FaWindows fw-500 lh-24 />
            Download App
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
