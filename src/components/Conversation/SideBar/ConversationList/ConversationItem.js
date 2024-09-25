import React from "react";

const ConversationItem = ({
  avatar,
  name,
  lastMessage,
  notificationOff,
  isPinned,
}) => {
  return (
    <div className="conversation-item">
      <img src={avatar} alt={name} className="conversation-item-avatar" />
      <div className="conversation-item-content">
        <h3 className="conversation-item-name">{name}</h3>
        <p className="conversation-item-message">{lastMessage}</p>
      </div>
      <div className="conversation-item__actions">
        {notificationOff && (
          <i className="fas fa-bell-slash conversation-item-icon"></i>
        )}
        {isPinned && (
          <i className="fas fa-thumbtack conversation-item-icon"></i>
        )}
      </div>
    </div>
  );
};

export default ConversationItem;
