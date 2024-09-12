import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import "./Layout.scss";
import HomePage from "./components/HomePage/HomePage";

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSolutions = useCallback(() => {
    if (location.pathname !== "/") {
      navigate("/#solutions");
    } else {
      const solutionsSection = document.getElementById("solutions");
      if (solutionsSection) {
        solutionsSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location.pathname, navigate]);

  return (
    <div className="layout">
      <Header scrollToSolutions={scrollToSolutions} />
      <main className="main-content">
        <HomePage />
      </main>
    </div>
  );
};

export default Layout;
