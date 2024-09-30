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
    <div className="flex justify-between mb-4 bg-gray-100 rounded-lg p-1">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`flex-1 py-2 px-4 rounded-md transition-colors ${
            value === index
              ? "bg-white text-blue-500 shadow"
              : "text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => onChange(index)}
        >
          {value === index ? (
            tab.name
          ) : (
            <img src={tab.icon} alt={tab.name} className="w-5 h-5 mx-auto" />
          )}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
