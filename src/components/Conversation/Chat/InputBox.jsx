import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../contexts/AuthContext";
import { ChatContext } from "../../../contexts/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import detectLanguageIcon from "../../../assets/products/lang-detect.svg";
import attachIcon from "../../../assets/conversation/attach.svg";
import emojiIcon from "../../../assets/conversation/emoji.svg";
import micIcon from "../../../assets/conversation/mic.svg";
import sendIcon from "../../../assets/conversation/send.svg";

const InputBox = () => {
  const [message, setMessage] = useState("");
  const [img, setImg] = useState(null);
  const [eslEnabled, setEslEnabled] = useState(false);
  const [eslTranslation, setEslTranslation] = useState("");
  const [detectedLanguage, setDetectedLanguage] = useState("Detect language");
  const [showEslPreview, setShowEslPreview] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    if (eslEnabled && message) {
      const translateMessage = async () => {
        try {
          const response = await axios.post("http://localhost:5000/translate", {
            text: message,
            source: "auto",
            target: "en",
          });
          setEslTranslation(response.data.translatedText);
          setDetectedLanguage(response.data.detectedLanguage.toUpperCase());
          setShowEslPreview(true);
        } catch (error) {
          console.error("Translation error:", error);
          setEslTranslation("Translation error occurred");
        }
      };

      const timeoutId = setTimeout(translateMessage, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setShowEslPreview(false);
    }
  }, [message, eslEnabled]);

  const handleSend = async () => {
    if (message.trim() === "" && !img) return;

    let messageToSend = {
      id: uuid(),
      text: message,
      senderId: currentUser.uid,
      date: Timestamp.now(),
    };

    if (eslEnabled && eslTranslation) {
      messageToSend.eslTranslation = eslTranslation;
    }

    if (img) {
      try {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          "state_changed",
          null,
          (error) => console.error(error),
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            messageToSend.img = downloadURL;

            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion(messageToSend),
            });
          }
        );
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion(messageToSend),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text: message,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text: message,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setMessage("");
    setImg(null);
    setEslTranslation("");
    setShowEslPreview(false);
  };

  return (
    <div className="bg-white border-t border-gray-200 p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <img
            src={detectLanguageIcon}
            alt="Translate"
            className="w-5 h-5 mr-2"
          />
          <span className="text-sm font-medium text-gray-700">
            E.S.L Translation Tool
          </span>
        </div>
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={eslEnabled}
            onChange={() => setEslEnabled(!eslEnabled)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
      {eslEnabled && showEslPreview && (
        <div className="bg-blue-50 rounded p-2 mb-2">
          <div className="flex items-center mb-1">
            <img
              src={detectLanguageIcon}
              alt="Detected language"
              className="w-4 h-4 mr-1"
            />
            <span className="text-xs font-medium text-gray-600">
              Detected: {detectedLanguage}
            </span>
          </div>
          <div className="text-sm text-gray-700">{eslTranslation}</div>
        </div>
      )}
      <div className="flex items-center bg-gray-100 rounded-full p-2">
        <div className="flex items-center space-x-2 mr-2">
          <label htmlFor="file-input" className="cursor-pointer">
            <img src={attachIcon} alt="Attach" className="w-5 h-5" />
          </label>
          <input
            type="file"
            id="file-input"
            className="hidden"
            onChange={(e) => setImg(e.target.files[0])}
          />
          <button className="focus:outline-none">
            <img src={emojiIcon} alt="Emoji" className="w-5 h-5" />
          </button>
          <button className="focus:outline-none">
            <img src={micIcon} alt="Voice" className="w-5 h-5" />
          </button>
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="flex-1 bg-transparent text-sm focus:outline-none"
        />
        {message && (
          <button className="ml-2 focus:outline-none" onClick={handleSend}>
            <img src={sendIcon} alt="Send" className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputBox;
