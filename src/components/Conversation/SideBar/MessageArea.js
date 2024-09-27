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
    <div className="message-area-container">
      {sortedChats.length > 0 ? (
        sortedChats.map(([id, chat]) => (
          <div
            className="user-chat"
            key={id}
            onClick={() => handleSelect(chat.userInfo)}
          >
            <img src={chat.userInfo.photoURL} alt="" />
            <div className="user-info">
              <span>{chat.userInfo.displayName}</span>
              <p>{chat.lastMessage?.text}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No chats available</p>
      )}
    </div>
  );
};

export default MessageArea;
