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
    <div className="input-message-box">
      <div className="esl-toggle">
        <img src={detectLanguageIcon} alt="Translate" />
        <span>E.S.L Translation Tool</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={eslEnabled}
            onChange={() => setEslEnabled(!eslEnabled)}
          />
          <span className="slider round"></span>
        </label>
      </div>
      {eslEnabled && showEslPreview && (
        <div className="esl-preview">
          <div className="detected-language">
            <img src={detectLanguageIcon} alt="Detected language" />
            <span>Detected: {detectedLanguage}</span>
          </div>
          <div className="translation-text">{eslTranslation}</div>
        </div>
      )}
      <div className="message-input-container">
        <div className="input-tools">
          <label htmlFor="file-input">
            <img src={attachIcon} alt="Attach" />
          </label>
          <input
            type="file"
            id="file-input"
            style={{ display: "none" }}
            onChange={(e) => setImg(e.target.files[0])}
          />
          <button>
            <img src={emojiIcon} alt="Emoji" />
          </button>
          <button>
            <img src={micIcon} alt="Voice" />
          </button>
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="message-input"
        />
        {message && (
          <button className="send-button" onClick={handleSend}>
            <img src={sendIcon} alt="Send" />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputBox;
