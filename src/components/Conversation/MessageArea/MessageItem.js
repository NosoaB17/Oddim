import React, { useState } from "react";

const MessageItem = ({ message, eslTranslationEnabled }) => {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => setShowInfo(!showInfo);

  return (
    <div className="message-item" onClick={toggleInfo}>
      {message.editStatus && <span className="edit-status">Edited</span>}
      <p className="message-content">{message.content}</p>
      {eslTranslationEnabled && message.eslTranslation && (
        <p className="esl-translated-message">{message.eslTranslation}</p>
      )}
      {showInfo && (
        <div className="message-info">
          <p>Original language: {message.sourceLanguage || "Unknown"}</p>
          <p>Target language: {message.targetLanguage || "Unknown"}</p>
          <p>Timestamp: {message.timestamp.toLocaleString()}</p>
        </div>
      )}
      <div className="message-status">
        {message.isPinned && <span className="pinned-status">📌</span>}
        {message.hasReply && <span className="reply-status">💬</span>}
        {message.hasEmoji && <span className="emoji-status">😊</span>}
        {message.seenBy && <span className="seen-status">👁️</span>}
      </div>
    </div>
  );
};

export default MessageItem;
