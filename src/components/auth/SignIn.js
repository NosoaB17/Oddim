import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "../../assets/GoogleIcon.svg";
import SignUpIcon from "../../assets/signup.svg";
import ShowHideIcon from "../../assets/show-hide.svg";

const SignIn = ({ onSwitchForm }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (email === "ngsn176@gmail.com" && password === "password123") {
      navigate("/conversation");
    } else {
      alert("Invalid email or password");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSignIn();
    }
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="signin-form">
      <h2>Sign In</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="password-input">
        <input
          type={passwordShown ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <span className="toggle-password" onClick={togglePasswordVisiblity}>
          <img
            src={ShowHideIcon}
            alt="ShowHidePassIcon"
            className="show-hide-icon"
          />
        </span>
      </div>
      <button
        className="forgot-password-link"
        onClick={() => onSwitchForm("forgot")}
      >
        Forgot Password?
      </button>
      <button className="signin-button" onClick={handleSignIn}>
        Sign In
      </button>
      <p className="account-text">Not have account yet?</p>
      <button className="signup-button" onClick={() => onSwitchForm("signup")}>
        <img src={SignUpIcon} alt="Sign Up" />
        Sign Up
      </button>
      <button className="google-signin">
        <img src={GoogleIcon} alt="Google" />
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
