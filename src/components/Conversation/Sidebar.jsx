import React, { useState } from "react";
import SearchBar from "./Sidebar/SearchBar";
import Tabs from "./Sidebar/Tabs";
import ConversationList from "./Sidebar/ConversationList";
import ActionsButton from "./Sidebar/ActionsButton";

const Sidebar = ({ conversations, onSelectConversation }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Conversation</h2>
        <ActionsButton />
      </div>
      <SearchBar />
      <Tabs value={activeTab} onChange={handleTabChange} />
      <ConversationList
        conversations={conversations}
        activeTab={activeTab}
        onSelectConversation={onSelectConversation}
      />
    </div>
  );
};

export default Sidebar;
