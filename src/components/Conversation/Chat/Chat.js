import React, { useContext, useEffect, useState, useRef } from "react";
import { ChatContext } from "../../../contexts/ChatContext";
import { AuthContext } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import InputBox from "./InputBox";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const scrollRef = useRef();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="chat">
      <div className="chat-info">
        <span>{data.user?.displayName}</span>
      </div>
      <div className="messages">
        {messages.map((m) => (
          <div
            ref={scrollRef}
            className={`message ${m.senderId === currentUser.uid && "owner"}`}
            key={m.id}
          >
            <div className="message-info">
              <img
                src={
                  m.senderId === currentUser.uid
                    ? currentUser.photoURL
                    : data.user.photoURL
                }
                alt=""
              />
              <span>{formatTime(m.date)}</span>
            </div>
            <div className="message-content">
              <p>{m.text}</p>
              {m.img && <img src={m.img} alt="" />}
            </div>
          </div>
        ))}
      </div>
      <InputBox />
    </div>
  );
};

export default Chat;
