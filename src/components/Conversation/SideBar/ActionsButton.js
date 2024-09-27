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
    <div className="actions-button-container">
      <div className="icon-button">
        <img
          src={NewMessageIcon}
          alt="new-message-icon"
          onClick={handleNewConversationClick}
        />
        {/* <span className="new-message-text">New Conversation</span> */}
      </div>

      <div className="icon-button" onClick={handleSettingsClick}>
        <img src={SettingsIcon} alt="settings-icon" />
        {/* <span className="new-settings-text">Settings</span> */}
      </div>
    </div>
  );
};

export default ActionsButton;
