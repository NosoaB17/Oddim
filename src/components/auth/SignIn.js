import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import GoogleIcon from "../../assets/auth/GoogleIcon.svg";
import SignUpIcon from "../../assets/auth/signup.svg";
import ShowHideIcon from "../../assets/auth/show-hide.svg";

import { useAuth } from "../../contexts/AuthContext";

const SignIn = ({ onSwitchForm }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // Handle regular sign in
  const handleSignIn = () => {
    if (email === "ngsn176@gmail.com" && password === "password123") {
      login({ email, name: "Test User" });
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

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      alert("Google login successful. Fetching user info...");
      try {
        const userInfoResponse = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer ${tokenResponse.access_token}` } }
        );

        const userInfo = userInfoResponse.data;
        login({
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
          googleId: userInfo.sub,
        });
        alert(`Welcome, ${userInfo.name}!`);
        navigate("/conversation");
      } catch (error) {
        console.error("Error fetching user info:", error.response || error);
        alert("Failed to get user information from Google. Please try again.");
      }
    },
    onError: (error) => {
      console.error("Google Login Failed:", error);
      alert("Google sign in was unsuccessful. Please try again.");
    },
  });

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
      <button className="google-signin" onClick={() => googleLogin()}>
        <img src={GoogleIcon} alt="Google" />
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
