import React, { useState, useContext } from "react";
import ActionsButton from "./ActionsButton";
import SearchBar from "./SearchBar";
import Tabs from "./Tabs";
import MessageArea from "./MessageArea";
import { ChatContext } from "../../../contexts/ChatContext";

const ConversationSidebar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { dispatch } = useContext(ChatContext);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleSelectUser = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="conversation-sidebar">
      <div className="conversation-sidebar-header">
        <h2 className="conversation-sidebar-title">Conversation</h2>
        <ActionsButton />
      </div>
      <Tabs value={activeTab} onChange={handleTabChange} />
      <SearchBar onSelectUser={handleSelectUser} />
      <MessageArea />
    </div>
  );
};

export default ConversationSidebar;
