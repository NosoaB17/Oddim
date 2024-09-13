import React, { useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import SignIn from "./components/Auth/SignIn";
import SettingGuest from "./components/settings/SettingGuest";
import "./Layout.scss";

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

  const renderContent = () => {
    switch (location.pathname) {
      case "/":
        return <HomePage />;
      case "/signin":
        return <SignIn />;
      case "/settings":
        return <SettingGuest />;
      case "/products":
        return <Products />;
      default:
        return <HomePage />;
    }
  };

  const isProductsPage = location.pathname === "/products";

  return (
    <div className="layout">
      {!isProductsPage && <Header scrollToSolutions={scrollToSolutions} />}
      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default Layout;
