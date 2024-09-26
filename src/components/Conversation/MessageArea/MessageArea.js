import React, { useState } from "react";
import InputMessageBox from "./InputMessageBox";
import MessageList from "./MessageList";

// Import các icon cần thiết
import detectIcon from "../../../assets/products/lang-detect.svg";
import attachIcon from "../../../assets/conversation/attach.svg";
import emojiIcon from "../../../assets/conversation/emoji.svg";
import micIcon from "../../../assets/conversation/mic.svg";

const MessageArea = () => {
  const [messages, setMessages] = useState([
    { id: 1, content: "hello", sender: "user" },
    { id: 2, content: "hi", sender: "user" },
    {
      id: 3,
      content: "Xin chào, Tôi tên là Son.",
      sender: "user",
      eslTranslation: "Hello, my name is Son.",
    },
  ]);

  const addMessage = (newMessage) => {
    setMessages([...messages, { id: messages.length + 1, ...newMessage }]);
  };

  return (
    <div className="message-area">
      <MessageList messages={messages} />
      <InputMessageBox
        onSendMessage={addMessage}
        icons={{ detectIcon, attachIcon, emojiIcon, micIcon }}
      />
    </div>
  );
};

export default MessageArea;
