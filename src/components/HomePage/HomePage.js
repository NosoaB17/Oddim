import React from "react";
import Hero from "./Hero";
import SolutionCard from "./SolutionCard";
import HelpCenter from "./HelpCenter";
import AboutUs from "./AboutUs";
import ReadyStart from "./ReadyStart";
import Footer from "./Footer";
import "./HomePage.scss";

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      {/* <section id="solutions" className="solutions-section">
        <h2>Our Solutions</h2>
        <div className="solution-cards">
          <SolutionCard title="Translation" />
          <SolutionCard title="Conversation" />
          <SolutionCard title="Middo Call" />
          <SolutionCard title="Extension" />
        </div>
      </section>
      <HelpCenter />
      <AboutUs />
      <ReadyStart />
      <Footer /> */}
    </div>
  );
};

export default HomePage;
