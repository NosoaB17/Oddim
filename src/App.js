import React from "react";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./Layout";

const App = () => {
  // Ensure that the Google Client ID is available
  if (!process.env.REACT_APP_GOOGLE_CLIENT_ID) {
    console.error(
      "Google Client ID is not set. OAuth will not work correctly."
    );
  }
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
