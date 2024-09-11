import React from "react";
import SolutionItem from "./SolutionItem";

const SolutionCard = () => {
  const solutions = [
    { title: "Title 1", content: "Content for title 1" },
    { title: "Title 2", content: "Content for title 2" },
    { title: "Title 3", content: "Content for title 3" },
    { title: "Title 4", content: "Content for title 4" },
  ];

  return (
    <div className="solution">
      {solutions.map((solution, index) => (
        <SolutionItem
          key={index}
          title={solution.title}
          content={solution.content}
        />
      ))}
    </div>
  );
};

export default SolutionCard;
