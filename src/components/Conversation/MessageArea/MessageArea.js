import React from "react";
import ConversationHeader from "./ConversationHeader";
import MessageList from "./MessageList";
import InputMessageBox from "./InputMessageBox";

const MessageArea = () => {
  return (
    <div className="message-area">
      <ConversationHeader />
      <MessageList />
      <InputMessageBox />
    </div>
  );
};

export default MessageArea;
