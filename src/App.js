import "./App.scss";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="app-container">
      Hello, This is Oddim Project
      <div className="header-container"></div>
      <div className="app-content">
        <Outlet />
      </div>
      <div className="main-container"></div>
      <div className="footer-container"></div>
    </div>
  );
};

export default App;
