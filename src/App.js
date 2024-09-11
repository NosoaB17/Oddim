import "./App.scss";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import SolutionCard from "./components/Solution/SolutionCard";

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="content-container">
        <div className="hero-container">
          <Hero />
        </div>
        <div className="solution-container">
          <SolutionCard />
        </div>
      </div>
      <div className="footer-container"></div>
    </div>
  );
};

export default App;
