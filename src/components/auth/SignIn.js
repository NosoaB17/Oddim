import React from "react";
import GoogleIcon from "../../assets/GoogleIcon.svg";
import SignUpIcon from "../../assets/signup.svg";
import ShowHideIcon from "../../assets/show-hide.svg";

const SignIn = ({ onSwitchForm }) => {
  return (
    <div className="signin-form">
      <h2>Sign In</h2>
      <input type="email" placeholder="Enter your email" />
      <div className="password-input">
        <input type="password" placeholder="Enter your password" />
        <span className="toggle-password">
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
      <button className="signin-button">Sign In</button>
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
