import React from "react";
import headerIcon from "../../assets/home/solution/sparkle.svg";
import featureIcon from "../../assets/home/solution/star.svg";

const SolutionCard = ({ title, description, icon, features }) => {
  return (
    <div className="solution-card">
      <div className="solution-content">
        <div className="solution-header">
          <img src={headerIcon} alt="Sparkle icon" className="header-icon" />
          <span className="header-text">Solution</span>
          <h3 className="solution-title">{title}</h3>
          <p className="solution-description">{description}</p>
        </div>
        <ul className="feature-list">
          {features.map((feature, index) => (
            <li key={index}>
              <img
                src={featureIcon}
                alt="featureIcon"
                className="star-icon"
              ></img>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="solution-image">
        <img src={icon} alt={`${title} illustration`} />
      </div>
    </div>
  );
};

export default SolutionCard;
