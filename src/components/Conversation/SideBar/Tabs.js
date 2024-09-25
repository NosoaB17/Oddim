import React from "react";
import Tab1 from "../../../assets/conversation/tab1.svg";
import Tab2 from "../../../assets/conversation/tab2.svg";
import Tab3 from "../../../assets/conversation/tab3.svg";
import Tab4 from "../../../assets/conversation/tab4.svg";

const Tabs = ({ value, onChange }) => {
  const tabs = [
    { name: "All", icon: Tab1 },
    { name: "Group", icon: Tab2 },
    { name: "Archive", icon: Tab3 },
    { name: "Waiting", icon: Tab4 },
  ];

  return (
    <div className="tabs">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`tabs-button ${
            value === index ? "tabs-button--active" : ""
          }`}
          onClick={() => onChange(index)}
        >
          {value === index ? (
            tab.name
          ) : (
            <img src={tab.icon} alt={tab.name} className="tabs__icon" />
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
