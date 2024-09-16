import React from "react";

const SignUp = ({ onSwitchForm }) => {
  return (
    <div className="signup-form">
      <h2>Sign Up</h2>
      <input type="email" placeholder="Enter your email" />
      <input type="password" placeholder="Enter your password" />
      <input type="password" placeholder="Re-enter your new password" />
      <div className="password-requirements">
        <p>At least 8 characters</p>
        <p>At least 1 capital letter</p>
      </div>
      <button className="signup-button">Sign Up</button>
      <div className="signin-link">
        Already have an account?{" "}
        <span onClick={() => onSwitchForm("signin")} className="signin-direct">
          Sign in
        </span>
      </div>
    </div>
  );
};

export default SignUp;
