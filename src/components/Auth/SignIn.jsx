import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../contexts/AuthContext";
import { auth } from "../../firebase";

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
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Sign In
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="relative">
          <input
            required
            type={passwordShown ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={togglePasswordVisibility}
          >
            <img
              src={ShowHideIcon}
              alt="ShowHidePassIcon"
              className="h-5 w-5 text-gray-400"
            />
          </button>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md transition duration-300"
        >
          Sign In
        </button>
        {err && (
          <span className="text-red-500 text-sm">Something went wrong</span>
        )}
      </form>
      <button
        className="w-full text-sm text-gray-600 text-right mt-2 hover:underline"
        onClick={() => onSwitchForm("forgot")}
      >
        Forgot Password?
      </button>
      <p className="text-center text-gray-600 my-4">
        Don't have an account yet?
      </p>
      <button
        onClick={() => onSwitchForm("signup")}
        className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-md transition duration-300 flex items-center justify-center"
      >
        <img src={SignUpIcon} alt="Sign Up" className="mr-2 h-5 w-5" />
        Sign Up
      </button>
      <button
        onClick={handleGoogleSignIn}
        className="w-full mt-4 py-2 px-4 bg-white hover:bg-gray-100 text-gray-800 font-bold rounded-md border border-gray-300 transition duration-300 flex items-center justify-center"
      >
        <img src={GoogleIcon} alt="Google" className="mr-2 h-5 w-5" />
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
