import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import SignIn from "./components/Auth/SignIn";
import SettingGuest from "./components/settings/SettingGuest";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/settings" element={<SettingGuest />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
