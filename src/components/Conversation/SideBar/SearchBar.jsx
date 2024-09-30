import React, { useState, useContext, useEffect, useCallback } from "react";
import { db } from "../../../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { AuthContext } from "../../../contexts/AuthContext";
import debounce from "lodash.debounce";

import searchIcon from "../../../assets/conversation/search.svg";

const SearchBar = ({ onSelectUser }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  // Debounce search function
  const debouncedSearch = useCallback(
    debounce(async (term) => {
      if (term.length < 2) {
        setSuggestions([]);
        return;
      }

      const q = query(
        collection(db, "users"),
        where("displayName", ">=", term),
        where("displayName", "<=", term + "\uf8ff")
      );

      try {
        const querySnapshot = await getDocs(q);
        const userSuggestions = querySnapshot.docs
          .map((doc) => doc.data())
          .filter((user) => user.uid !== currentUser.uid); // Exclude current user
        setSuggestions(userSuggestions);
      } catch (err) {
        console.error("Error searching users:", err);
        setErr(true);
      }
    }, 300),
    [currentUser]
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setErr(false);
  };

  const handleSelect = async (user) => {
    setSelectedUser(user);
    setSearchTerm(user.displayName);
    setSuggestions([]);

    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        // Create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // Create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }

      onSelectUser(user);
      setSelectedUser(null);
      setSearchTerm("");
    } catch (err) {
      console.error(err);
      setErr(true);
    }
  };

  return (
    <div className="relative mb-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Find a user"
          onChange={handleSearch}
          value={searchTerm}
          className="w-full p-2 pl-10 pr-4 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <img
          src={searchIcon}
          alt="search-icon"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
        />
      </div>
      {err && (
        <span className="text-red-500 text-sm mt-1">
          Error occurred during search
        </span>
      )}
      {suggestions.length > 0 && (
        <ul className="absolute w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
          {suggestions.map((user) => (
            <li
              key={user.uid}
              onClick={() => handleSelect(user)}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
            >
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span>{user.displayName}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
