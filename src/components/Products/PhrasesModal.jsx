import React, { useState, useEffect } from "react";
import phrasesLogo from "../../assets/products/phrases.svg";

const PhrasesModal = ({ isOpen, onClose, onSelectPhrase }) => {
  const [phrases, setPhrases] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Mô phỏng việc lấy dữ liệu phrases từ API
  useEffect(() => {
    // Trong thực tế, bạn sẽ gọi API ở đây
    const mockPhrases = [
      { id: 1, text: "Hello, how are you?", category: "Greetings" },
      { id: 2, text: "What's the weather like today?", category: "Small Talk" },
      { id: 3, text: "Could you help me, please?", category: "Requests" },
      // Thêm nhiều phrases khác ở đây
    ];
    setPhrases(mockPhrases);
  }, []);

  const categories = [
    "All",
    ...new Set(phrases.map((phrase) => phrase.category)),
  ];

  const filteredPhrases =
    selectedCategory === "All"
      ? phrases
      : phrases.filter((phrase) => phrase.category === selectedCategory);

  return (
    <div
      className={`fixed top-0 right-0 w-1/4 h-screen bg-white shadow-lg transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center mt-12 p-4 border-b border-gray-200">
        <img src={phrasesLogo} alt="Phrases" className="w-5 h-5 mr-2" />
        <span className="text-lg font-bold text-blue-500">Phrases</span>
        <button
          className="ml-auto text-2xl text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      <div className="p-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-200px)] p-4">
        {filteredPhrases.map((phrase) => (
          <div
            key={phrase.id}
            className="bg-gray-50 rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-100"
            onClick={() => onSelectPhrase(phrase.text)}
          >
            <p className="text-sm text-gray-600 mb-1">{phrase.category}</p>
            <p className="text-base">{phrase.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhrasesModal;
