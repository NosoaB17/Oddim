import React from "react";
import MessageItem from "./MessageItem";

const MessageList = ({ eslTranslationEnabled }) => {
  // Giả định rằng chúng ta có một mảng các tin nhắn
  const messages = [
    // Array of message objects
  ];

  // Hàm để hiển thị timestamp mỗi 10 phút
  const renderTimestamp = (timestamp) => {
    // Implement logic to show timestamp every 10 minutes
    return <div className="timestamp">{timestamp}</div>;
  };

  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <React.Fragment key={message.id}>
          {renderTimestamp(message.timestamp)}
          <MessageItem
            message={message}
            eslTranslationEnabled={eslTranslationEnabled}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

export default MessageList;
