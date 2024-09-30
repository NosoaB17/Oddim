import React, { useState, useContext } from "react";
import ActionsButton from "./ActionsButton.jsx";
import SearchBar from "./SearchBar.jsx";
import Tabs from "./Tabs.jsx";
import MessageArea from "./MessageArea.jsx";
import { ChatContext } from "../../../contexts/ChatContext.js";

const SideBar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { dispatch } = useContext(ChatContext);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleSelectUser = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="h-full flex flex-col p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Conversation</h2>
        <ActionsButton />
      </div>
      <Tabs value={activeTab} onChange={handleTabChange} />
      <SearchBar onSelectUser={handleSelectUser} />
      <MessageArea />
    </div>
  );
};

export default SideBar;
