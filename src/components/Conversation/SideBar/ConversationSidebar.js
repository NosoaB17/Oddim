import React, { useState } from "react";
import ActionsButton from "./ActionsButton";
import ConversationList from "./ConversationList/ConversationList";
import SearchBar from "./SearchBar";
import Tabs from "./Tabs";
import NewConversationModal from "./NewConversationModal";

const ConversationSidebar = () => {
  const [activeTab, setActiveTab] = useState(0);

  const [conversations, setConversations] = useState([]);
  const [isNewConversationModalOpen, setIsNewConversationModalOpen] =
    useState(false);

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleOpenNewConversationModal = () => {
    setIsNewConversationModalOpen(true);
  };

  const handleCloseNewConversationModal = () => {
    setIsNewConversationModalOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 0: // All
        return <ConversationList />;
      case 1: // Group
        return <div className="no-messages">No group messages yet</div>;
      case 2: // Archive
        return <div className="no-messages">No archived messages yet</div>;
      case 3: // Waiting
        return <div className="no-messages">No waiting messages yet</div>;
      default:
        return null;
    }
  };

  return (
    <div className="conversation-sidebar">
      <div className="conversation-sidebar-header">
        <h2 className="conversation-sidebar-title">Conversation</h2>
        <ActionsButton />
      </div>
      <SearchBar />

      <Tabs value={activeTab} onChange={handleTabChange} />
      <ConversationList conversations={conversations} />
      {renderContent()}
      <NewConversationModal
        open={isNewConversationModalOpen}
        onClose={handleCloseNewConversationModal}
      />
    </div>
  );
};

export default ConversationSidebar;
