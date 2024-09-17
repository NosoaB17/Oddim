import { FaWindows } from "react-icons/fa";

const CallToAction = () => {
  return (
    <div className="cta-container">
      <h2>Ready to get started?</h2>
      <button className="download-btn">
        <span className="icon">
          <FaWindows />{" "}
        </span>
        Download App
      </button>
    </div>
  );
};

export default CallToAction;
