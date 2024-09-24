import React from "react";
import micLogo from "../../assets/products/mic.svg";

const RecordToTranslate = () => {
  return (
    <button className="record-button">
      <img src={micLogo} alt="Record" />
    </button>
  );
};

export default RecordToTranslate;
