import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import Auth from "./pages/Auth";
import SettingGuest from "./components/Settings/SettingGuest";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/signin" element={<Auth />} />
          <Route path="/settings" element={<SettingGuest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
