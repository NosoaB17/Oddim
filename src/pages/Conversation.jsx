import React from "react";
import Bar from "../components/Conversation/SideBar/Bar";
import Chat from "../components/Conversation/Chat/Chat";

const Conversation = () => {
  return (
    <div className="flex h-[calc(100vh-60px)]">
      <Bar />
      <Chat />
    </div>
  );
};

export default Conversation;
