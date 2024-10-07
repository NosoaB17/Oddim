import React from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ConversationProvider } from "./contexts/ConversationContext";

import "./styles/index.css";

const App = () => {
  return (
    <AuthContextProvider>
      <ConversationProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </ConversationProvider>
    </AuthContextProvider>
  );
};

export default App;
