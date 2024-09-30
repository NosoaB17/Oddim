import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { AuthContextProvider } from "./contexts/AuthContext";

import "./styles/index.css";

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
