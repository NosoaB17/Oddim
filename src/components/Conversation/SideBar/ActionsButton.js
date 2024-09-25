import React, { useState } from "react";
import NewConversationModal from "./NewConversationModal";

import NewMessageIcon from "../../../assets/conversation/newmessage.svg";
import SettingsIcon from "../../../assets/conversation/settings.svg";
const ActionsButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    console.log("Modal button clicked");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSettingsClick = () => {
    console.log("Settings button clicked");
  };

  return (
    <div className="actions-button-container">
      <div className="icon-button" onClick={handleOpenModal}>
        <img src={NewMessageIcon} alt="new-message-icon" />
        {/* <span className="new-message-text">New Conversation</span> */}
      </div>

      <div className="icon-button" onClick={handleSettingsClick}>
        <img src={SettingsIcon} alt="settings-icon" />
        {/* <span className="new-settings-text">Settings</span> */}
      </div>

      <NewConversationModal open={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ActionsButton;
