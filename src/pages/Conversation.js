import React, { useState } from "react";
import ConversationSidebar from "../components/Conversation/ConversationSidebar";
import DefaultWelcome from "../components/Conversation/DefaultWelcome";
import MessageArea from "../components/Conversation/MessageArea";
import StationShorcut from "../components/Conversation/StationShortcut";

const Conversation = (props) => {
  const [hasStarted, setHasStarted] = useState(false);

  const handleStart = () => {
    setHasStarted(true);
  };

  return (
    <div>
      <StationShorcut />
      <ConversationSidebar />
      {hasStarted ? <MessageArea /> : <DefaultWelcome onStart={handleStart} />}
    </div>
  );
};

export default Conversation;
