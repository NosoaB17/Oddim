import React, { useState } from "react";
import searchIcon from "../../../assets/conversation/search.svg";
import filterIcon from "../../../assets/conversation/filter.svg";
const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    console.log("Searching", e.target.value);
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={handleInputChange}
        />
        <img src={searchIcon} alt="search-icon" />
      </div>
      <button className="filter-button">
        <img src={filterIcon} alt="filter-icon" />
      </button>
    </div>
  );
};

export default SearchBar;
