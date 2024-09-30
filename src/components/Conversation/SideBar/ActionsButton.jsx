import React from "react";

import NewMessageIcon from "../../../assets/conversation/newmessage.svg";
import SettingsIcon from "../../../assets/conversation/settings.svg";

const ActionsButton = () => {
  const handleNewConversationClick = () => {
    alert("Create new conversation");
  };
  const handleSettingsClick = () => {
    console.log("Settings button clicked");
  };

  return (
    <div className="flex gap-2">
      <button
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={handleNewConversationClick}
      >
        <img src={NewMessageIcon} alt="New Message" className="w-10 h-10" />
      </button>
      <button
        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={handleSettingsClick}
      >
        <img src={SettingsIcon} alt="Settings" className="w-10 h-10" />
      </button>
    </div>
  );
};

export default ActionsButton;
