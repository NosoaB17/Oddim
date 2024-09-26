import React from "react";

const ConversationHeader = ({ onStartCall, onShowInfo }) => {
  // Giả định rằng chúng ta có một hàm để kiểm tra trạng thái online
  const getOnlineStatus = () => {
    // Implement logic to determine online status
    return "green"; // Có thể là "grey", "green", hoặc "red"
  };

  return (
    <header className="conversation-header">
      <div className={`online-status ${getOnlineStatus()}`}></div>
      <h2 className="conversation-title">Conversation Title</h2>
      <button className="start-call-btn" onClick={onStartCall}>
        Start Middo Call
      </button>
      <button className="show-info-btn" onClick={onShowInfo}>
        Show Info
      </button>
    </header>
  );
};

export default ConversationHeader;
