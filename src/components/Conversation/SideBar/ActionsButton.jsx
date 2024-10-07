import React from "react";
import { PenSquare, PhoneCall, MoreVertical } from "lucide-react";

const ActionsButton = () => {
  return (
    <div className="flex items-center space-x-2">
      <button className="p-2 rounded-full hover:bg-gray-100">
        <PenSquare size={20} />
      </button>
      <button className="p-2 rounded-full hover:bg-gray-100">
        <PhoneCall size={20} />
      </button>
      <button className="p-2 rounded-full hover:bg-gray-100">
        <MoreVertical size={20} />
      </button>
    </div>
  );
};

export default ActionsButton;
