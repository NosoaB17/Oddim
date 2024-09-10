import videoHomePage from "../../assets/MiddoIntroVideo.mp4";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <video autoPlay muted>
        <source src={videoHomePage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="title1">
          {" "}
          Pha vo moi rao can ngon ngu trong 5 thu tieng{" "}
        </div>
        <div className="title2">
          Middo can be your trusted tool to do all translation work. Beisde that
          we also provide a barrier-free language conversation platform.
        </div>
        <div className="title3">
          <button>Download App</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
