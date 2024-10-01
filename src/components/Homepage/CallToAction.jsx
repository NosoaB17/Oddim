import React from "react";
import { FaWindows } from "react-icons/fa";

const CallToAction = () => {
  return (
    <div
      className="bg-center bg-cover bg-no-repeat flex flex-col items-center justify-center h-1/4 p-12.5 bg-gray-50"
      style={{
        backgroundImage: "url('https://middo.app/landing-page/hero.png')",
      }}
    >
      <h2 className="text-3xl font-semibold text-gray-800 mb-5">
        Ready to get started?
      </h2>
      <button className="flex items-center px-7 py-4 bg-blue-500 text-white rounded-lg font-medium transition-colors duration-300 hover:bg-blue-600">
        <FaWindows className="mr-2" />
        Download App
      </button>
    </div>
  );
};

export default CallToAction;
