import React from "react";
import Hero from "../components/HomeCard/Hero";
import Solution from "../components/HomeCard/Solution";
import UserGuide from "../components/HomeCard/UserGuide";
import AboutUs from "../components/HomeCard/AboutUs";
import CallToAction from "../components/HomeCard/CallToAction";
import Footer from "../components/HomeCard/Footer";

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <Solution />
      <UserGuide />
      <AboutUs />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default HomePage;
