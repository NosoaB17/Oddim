import React, { useState } from "react";
import ActionsButton from "./ActionsButton";
import SearchBar from "./SearchBar";
import Tabs from "./Tabs";
import MessageArea from "./MessageArea";

const ConversationSidebar = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="conversation-sidebar">
      <div className="conversation-sidebar-header">
        <h2 className="conversation-sidebar-title">Conversation</h2>
        <ActionsButton />
      </div>
      <Tabs value={activeTab} onChange={handleTabChange} />
      <SearchBar />
      <MessageArea />
    </div>
  );
};

export default ConversationSidebar;
