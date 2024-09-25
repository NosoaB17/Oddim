const InputMessageBox = () => {
  return (
    <div className="input-message-box">
      <button className="esl-toggle-btn">ESL</button>
      <div className="input-tools">{/* Input tools icons */}</div>
      <input
        type="text"
        placeholder="Type a message..."
        className="message-input"
      />
      <button className="send-btn">Send</button>
    </div>
  );
};

export default InputMessageBox;
