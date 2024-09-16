import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import Auth from "./pages/Auth";
import SettingGuest from "./components/Settings/SettingGuest";

const Layout = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/":
        return <HomePage />;
      case "/products":
        return <Products />;
      case "/signin":
        return <Auth />;
      case "/settings":
        return <SettingGuest />;
      default:
        return <HomePage />;
    }
  };

  const isHomePage = location.pathname === "/";

  return (
    <div className="layout">
      {isHomePage ? <Header /> : <Navbar />}
      <main className="main-content">{renderContent()}</main>
    </div>
  );
};

export default Layout;
