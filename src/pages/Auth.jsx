import React, { useState } from "react";
import SignIn from "../components/Auth/SignIn";
import SignUp from "../components/Auth/SignUp";
import ForgotPass from "../components/Auth/ForgotPass";
import worldMapImage from "../assets/auth/content-background.png";
import backgroundImage from "../assets/auth/background.png";

const Auth = () => {
  const [currentForm, setCurrentForm] = useState("signin");

  const handleSwitchForm = (form) => {
    setCurrentForm(form);
  };

  return (
    <div className="flex h-screen">
      <div
        className="flex-1 bg-cover bg-center flex items-center justify-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <img
          src={worldMapImage}
          alt="World Map"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[90%] max-h-[90%] object-contain"
        />
      </div>
      <div
        className={`flex-none w-[30%] flex items-center justify-center p-8 bg-white transform transition-transform duration-500 ease-out ${
          currentForm === "signin" ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {currentForm === "signin" && <SignIn onSwitchForm={handleSwitchForm} />}
        {currentForm === "signup" && <SignUp onSwitchForm={handleSwitchForm} />}
        {currentForm === "forgot" && (
          <ForgotPass onSwitchForm={handleSwitchForm} />
        )}
      </div>
    </div>
  );
};

export default Auth;
