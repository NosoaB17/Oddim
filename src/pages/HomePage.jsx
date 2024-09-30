import React from "react";
import Header from "../components/Header/Header";
import Hero from "../components/HomeCard/Hero";
import Solution from "../components/HomeCard/Solution";
import AboutUs from "../components/HomeCard/AboutUs";
import UserGuide from "../components/HomeCard/UserGuide";
import CallToAction from "../components/HomeCard/CallToAction";
import Footer from "../components/HomeCard/Footer";

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Hero />
        <Solution />
        <AboutUs />
        <UserGuide />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
