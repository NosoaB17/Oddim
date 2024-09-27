import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../firebase";

// Import icons
import GoogleIcon from "../../assets/auth/GoogleIcon.svg";
import SignUpIcon from "../../assets/auth/signup.svg";
import ShowHideIcon from "../../assets/auth/show-hide.svg";

const SignIn = ({ onSwitchForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [err, setErr] = useState(false);

  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();

  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr(false);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/conversation");
    } catch (err) {
      console.error("Error signing in with email/password:", err);
      setErr(true);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/conversation");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setErr(true);
    }
  };

  return (
    <div className="signin-form">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="password-input">
          <input
            required
            type={passwordShown ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="toggle-password" onClick={togglePasswordVisibility}>
            <img
              src={ShowHideIcon}
              alt="ShowHidePassIcon"
              className="show-hide-icon"
            />
          </span>
        </div>
        <button className="signin-button" type="submit">
          Sign In
        </button>
        {err && <span className="error">Something went wrong</span>}
      </form>
      <button
        className="forgot-password-link"
        onClick={() => onSwitchForm("forgot")}
      >
        Forgot Password?
      </button>
      <p className="account-text">Don't have an account yet?</p>
      <button className="signup-button" onClick={() => onSwitchForm("signup")}>
        <img src={SignUpIcon} alt="Sign Up" />
        Sign Up
      </button>
      <button className="google-signin" onClick={handleGoogleSignIn}>
        <img src={GoogleIcon} alt="Google" />
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
