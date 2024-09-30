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
    <div className="flex-1 flex flex-col">
      <div className="bg-blue-600 text-white p-4">
        <span>{data.user?.displayName}</span>
      </div>
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        {messages.map((m) => (
          <div
            ref={scrollRef}
            className={`flex mb-4 ${
              m.senderId === currentUser.uid ? "justify-end" : "justify-start"
            }`}
            key={m.id}
          >
            <div
              className={`max-w-[80%] ${
                m.senderId === currentUser.uid
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              } rounded-lg p-3 shadow`}
            >
              <div className="flex items-center mb-1">
                <img
                  src={
                    m.senderId === currentUser.uid
                      ? currentUser.photoURL
                      : data.user.photoURL
                  }
                  alt=""
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-xs text-gray-500">
                  {formatTime(m.date)}
                </span>
              </div>
              <p>{m.text}</p>
              {m.img && (
                <img
                  src={m.img}
                  alt=""
                  className="mt-2 rounded-lg max-w-full"
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <InputBox />
    </div>
  );
};

export default Chat;
