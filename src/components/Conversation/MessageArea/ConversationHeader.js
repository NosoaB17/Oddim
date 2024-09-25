const ConversationHeader = () => {
  return (
    <header className="conversation-header">
      <div className="online-status"></div>
      <h2 className="conversation-title">Conversation Title</h2>
      <button className="start-call-btn">Start Call</button>
      <button className="show-info-btn">Show Info</button>
    </header>
  );
};

export default ConversationHeader;
