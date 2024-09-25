import React from "react";
import ConversationItem from "./ConversationItem";

const ConversationList = ({ conversations = [] }) => {
  // Kiểm tra nếu conversations là undefined hoặc không phải là một mảng
  if (!Array.isArray(conversations)) {
    return <div className="no-conversations">No conversations available</div>;
  }

  if (conversations.length === 0) {
    return (
      <div className="empty-conversations">Your conversation list is empty</div>
    );
  }

  return (
    <div className="conversation-list">
      {conversations.map((conversation) => (
        <ConversationItem key={conversation.id} {...conversation} />
      ))}
    </div>
  );
};

export default ConversationList;
