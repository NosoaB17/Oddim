import React from "react";
import { Users, Archive, Clock } from "lucide-react";

const Tabs = ({ value, onChange }) => {
  const tabs = [
    { name: "All", icon: null },
    { name: "Group", icon: Users },
    { name: "Archive", icon: Archive },
    { name: "Waiting", icon: Clock },
  ];

  return (
    <div className="flex justify-between px-4 mb-2">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`flex items-center justify-center p-2 ${
            value === index
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => onChange(index)}
        >
          {tab.icon ? <tab.icon size={20} /> : tab.name}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
