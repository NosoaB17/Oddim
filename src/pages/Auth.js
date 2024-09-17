import React, { useState, useEffect } from "react";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import ForgotPass from "../components/Auth/ForgotPass";
import worldMap from "../assets/auth/content-background.png";

const Auth = () => {
  const [currentForm, setCurrentForm] = useState("signin");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const renderForm = () => {
    switch (currentForm) {
      case "signin":
        return <SignIn onSwitchForm={setCurrentForm} />;
      case "signup":
        return <SignUp onSwitchForm={setCurrentForm} />;
      case "forgot":
        return <ForgotPass onSwitchForm={setCurrentForm} />;
      default:
        return <SignIn onSwitchForm={setCurrentForm} />;
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-image">
        <img src={worldMap} alt="World Map" className="world-map" />
      </div>
      <div className={`auth-form ${showForm ? "show" : ""}`}>
        {renderForm()}
      </div>
    </div>
  );
};

export default Auth;
