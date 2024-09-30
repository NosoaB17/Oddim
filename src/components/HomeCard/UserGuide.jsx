import React from "react";
import headerIcon from "../../assets/home/solution/sparkle.svg";
const UserGuide = () => {
  return (
    <div className="guide-container">
      <div className="guide-header">
        <img src={headerIcon} alt="headerIcon" />
        <span className="headerText">Help Center</span>
      </div>
      <h1 className="guide-title">User Guide</h1>
      <div className="guide-menu"></div>
    </div>
  );
};

export default UserGuide;
