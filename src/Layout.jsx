import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import Auth from "./pages/Auth";
import Conversation from "./pages/Conversation";
import Settings from "./components/Settings/Settings";

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      {isHomePage ? <Header /> : <Navbar />}
      <div className="flex-grow relative overflow-y-auto">
        <main className="w-full transition-all duration-300 ease-in-out">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/signin" element={<Auth />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/conversation" element={<Conversation />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Layout;
