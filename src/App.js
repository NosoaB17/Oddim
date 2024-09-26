import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { OAuthProvider } from "./contexts/OAuthContext";
import Layout from "./Layout";
import { AuthContext } from "./contexts/AuthContext";

const App = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <OAuthProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </OAuthProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
