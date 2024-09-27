import React, { useContext } from "react";

import InputBox from "./InputBox";
import { ChatContext } from "../context/ChatContext";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.email}</span>
        <div className="chatIcons"></div>
      </div>
      <InputBox />
    </div>
  );
};

export default Chat;
