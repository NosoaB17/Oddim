import React from "react";
import "../../styles/components/_auth.scss";

const ForgotPass = ({ onSwitchForm }) => {
  return (
    <div className="forgot-password-form">
      <h2>Forgot Password</h2>
      <p>We will send a link to your email to help you reset your password</p>
      <input type="email" placeholder="Enter your email" />
      <button className="confirm-button">Confirm</button>
      <div className="cancel-link">
        <span onClick={() => onSwitchForm("signin")}>Cancel</span>
      </div>
    </div>
  );
};

export default ForgotPass;
