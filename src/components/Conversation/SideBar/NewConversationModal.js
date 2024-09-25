import React, { useState } from "react";

const NewConversationModal = ({ open, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Dữ liệu mẫu cho gợi ý
  const suggestions = [
    { id: 1, name: "shhong", username: "@sipqko" },
    { id: 2, name: "이대규", username: "@leeorb29" },
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Ở đây bạn sẽ gọi API để lấy kết quả tìm kiếm
  };

  const handleCreateGroupChat = () => {
    // Logic để tạo group chat
    console.log("Creating group chat");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="new-conversation-modal">
        <div className="new-conversation-modal__header">
          <h2>New conversation</h2>
          <button className="close-button" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="new-conversation-modal__content">
          <div className="search-container">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              placeholder="Search for people or groups"
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>
          <button
            className="create-group-button"
            onClick={handleCreateGroupChat}
          >
            <i className="fas fa-users"></i>
            Create group chat
          </button>
          <h3>Suggestion</h3>
          <ul className="suggestion-list">
            {suggestions.map((suggestion) => (
              <li key={suggestion.id} className="suggestion-item">
                <div className="suggestion-avatar">
                  {suggestion.name[0].toUpperCase()}
                </div>
                <div className="suggestion-info">
                  <span className="suggestion-name">{suggestion.name}</span>
                  <span className="suggestion-username">
                    {suggestion.username}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewConversationModal;
