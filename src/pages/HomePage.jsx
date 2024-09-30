import React from "react";
import Hero from "../components/HomeCard/Hero";
import Solution from "../components/HomeCard/Solution";
import AboutUs from "../components/HomeCard/AboutUs";
import UserGuide from "../components/HomeCard/UserGuide";
import CallToAction from "../components/HomeCard/CallToAction";
import Footer from "../components/HomeCard/Footer";

const HomePage = () => {
  return (
    <div className="relative overflow-x-hidden">
      <Hero />
      <Solution />
      <AboutUs />
      <UserGuide />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default HomePage;
