import React from "react";
import headerIcon from "../../assets/home/solution/sparkle.svg";

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <img src={headerIcon} alt="headerIcon" className="header-icon" />
        <span>About us</span>
      </div>
      <div className="about-title">
        <h1>Dudaji Vietnam</h1>
      </div>
      <div className="about-description">
        <p>
          Dudaji supports you to quickly build a deep learning utilization
          service in a timely and timely place.
        </p>
      </div>
      <div className="about-content">
        <p>
          To put machine learning and deep learning techniques into practice,
          you can not only design algorithms, but also there is a great need for
          infrastructure know-how, such as data preprocessing, building a
          distributed development environment, resource management, and process
          management.Based on the experience of conducting various AI projects,
          Dudaji accelerates the implementation of related data and ideas as a
          service quickly.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
