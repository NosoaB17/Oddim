import React, { useContext, useEffect, useState } from "react";
import InputBox from "../Chat/InputBox";
import { db } from "../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

import detectIcon from "../../../assets/products/lang-detect.svg";
import attachIcon from "../../../assets/conversation/attach.svg";
import emojiIcon from "../../../assets/conversation/emoji.svg";
import micIcon from "../../../assets/conversation/mic.svg";

import { AuthContext } from "../../../contexts/AuthContext";
import { ChatContext } from "../../../contexts/ChatContext";

const MessageArea = () => {
  const [chats, setChats] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      if (currentUser && currentUser.uid) {
        const unsub = onSnapshot(
          doc(db, "userChats", currentUser.uid),
          (doc) => {
            setChats(doc.data());
          }
        );

        return () => {
          unsub();
        };
      }
    };
    // currentUser.uid &&
    getChats();
  }, [currentUser]);

  console.log(Object.entries(chats));

  // const handleSelect = (u) => {
  //   dispatch({ type: "CHANGE_USER", payload: u });
  // };

  return (
    <div className="message-area-container">
      {Object.entries(chats).map((chat) => (
        <div
          className="user-chat"
          key={chat[0]}
          // onClick={handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="user-info">
            <span>{chat[1].userInfo.email}</span>
            <p>{chat[1].userInfo.lastMessage?.text}</p>
          </div>
        </div>
      ))}
      {/* <div className="input-box">
        <InputBox icons={{ detectIcon, attachIcon, emojiIcon, micIcon }} />
      </div> */}
    </div>
  );
};

export default MessageArea;
