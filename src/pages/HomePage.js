import React from "react";
import Hero from "../components/HomeCard/Hero";
import SolutionCard from "../components/HomeCard/SolutionCard";
import HelpCenter from "../components/HomeCard/HelpCenter";
import AboutUs from "../components/HomeCard/AboutUs";
import ReadyStart from "../components/HomeCard/ReadyStart";
import Footer from "../components/HomeCard/Footer";
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
