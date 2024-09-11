import React from "react";

const SolutionItem = ({ title, content }) => {
  return (
    <div className="solution-item">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default SolutionItem;
