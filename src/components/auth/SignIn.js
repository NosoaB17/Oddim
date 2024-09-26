import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

import GoogleIcon from "../../assets/auth/GoogleIcon.svg";
import SignUpIcon from "../../assets/auth/signup.svg";
import ShowHideIcon from "../../assets/auth/show-hide.svg";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useOAuth } from "../../contexts/OAuthContext";
import { auth } from "../../firebase";

const SignIn = ({ onSwitchForm }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login } = useOAuth();

  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/conversation");
    } catch (err) {
      setErr(true);
    }
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
      <form onSubmit={handleSubmit}>
        <input required type="email" placeholder="Enter your email" />
        <div className="password-input">
          <input
            required
            type={passwordShown ? "text" : "password"}
            placeholder="Enter your password"
          />
          <span className="toggle-password" onClick={togglePasswordVisiblity}>
            <img
              src={ShowHideIcon}
              alt="ShowHidePassIcon"
              className="show-hide-icon"
            />
          </span>
        </div>
        <button className="signin-button">Sign In</button>
        {err && <span>Something went wrong</span>}
      </form>
      <button
        className="forgot-password-link"
        onClick={() => onSwitchForm("forgot")}
      >
        Forgot Password?
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
