import React, { useState } from "react";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import ForgotPass from "../components/Auth/ForgotPass";

const Auth = () => {
  const [currentForm, setCurrentForm] = useState("signin");

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
      <div className="auth-image"></div>
      <div className="auth-form">{renderForm()}</div>
    </div>
  );
};

export default Auth;
