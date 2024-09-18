import React from "react";
import headerIcon from "../../assets/home/solution/sparkle.svg";
const UserGuide = () => {
  return (
    <div className="guide-container">
      <div className="guide-header">
        <img src={headerIcon} alt="headerIcon" />
        <span></span>
      </div>
      <h1 className="guide-title">
        User Guide, Dinh Header va Dieu huong Solution
      </h1>
      <div className="guide-menu"></div>
    </div>
  );
};

export default UserGuide;
