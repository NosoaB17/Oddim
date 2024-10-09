import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";

import "./styles/index.css";

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
