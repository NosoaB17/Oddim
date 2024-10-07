import React, { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="relative p-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 pr-10 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <SlidersHorizontal className="text-gray-400" size={20} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
