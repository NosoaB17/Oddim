import React, { useContext, useEffect, useState } from "react";
import { db } from "../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

import { AuthContext } from "../../../contexts/AuthContext";
import { ChatContext } from "../../../contexts/ChatContext";

const MessageArea = () => {
  const [chats, setChats] = useState({});
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      if (currentUser && currentUser.uid) {
        const unsub = onSnapshot(
          doc(db, "userChats", currentUser.uid),
          (doc) => {
            setChats(doc.data() || {});
          }
        );

        return () => {
          unsub();
        };
      }
    };

    currentUser?.uid && getChats();
  }, [currentUser]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  // Sort chats by date
  const sortedChats = Object.entries(chats).sort(
    (a, b) => b[1].date - a[1].date
  );

  return (
    <div className="flex-1 overflow-y-auto">
      {sortedChats.length > 0 ? (
        sortedChats.map(([id, chat]) => (
          <div
            key={id}
            onClick={() => handleSelect(chat.userInfo)}
            className="flex items-center p-3 hover:bg-gray-100 cursor-pointer"
          >
            <img
              src={chat.userInfo.photoURL}
              alt=""
              className="w-12 h-12 rounded-full mr-3"
            />
            <div className="flex-1">
              <span className="font-semibold text-gray-800">
                {chat.userInfo.displayName}
              </span>
              <p className="text-sm text-gray-600 truncate">
                {chat.lastMessage?.text}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-4">No chats available</p>
      )}
    </div>
  );
};

export default MessageArea;
