import React from "react";

const ConversationList = ({
  conversations,
  activeTab,
  onSelectConversation,
}) => {
  // TODO: Filter conversations based on activeTab

  return (
    <div className="flex-1 overflow-y-auto">
      {conversations.map((conversation) => (
        <div
          key={conversation.id}
          className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelectConversation(conversation)}
        >
          <div className="relative">
            <img
              src={conversation.avatar}
              alt={conversation.name}
              className="w-12 h-12 rounded-full mr-3"
            />
            {conversation.online && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <span className="font-semibold">{conversation.name}</span>
              <span className="text-xs text-gray-500">
                {conversation.lastMessageTime}
              </span>
            </div>
            <p className="text-sm text-gray-600 truncate">
              {conversation.lastMessage}
            </p>
          </div>
          {conversation.unreadCount > 0 && (
            <div className="ml-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {conversation.unreadCount}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
