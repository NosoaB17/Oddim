import React, { createContext, useState, useContext, useEffect } from "react";

const OAuthContext = createContext(null);

export const OAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("oauthUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    console.log("Logging in OAuth user:", userData);
    setUser({
      email: userData.email,
      name: userData.name,
      picture: userData.picture,
    });
    localStorage.setItem("oauthUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("oauthUser");
  };

  return (
    <OAuthContext.Provider value={{ user, login, logout }}>
      {children}
    </OAuthContext.Provider>
  );
};

export const useOAuth = () => {
  const context = useContext(OAuthContext);
  if (context === undefined) {
    throw new Error("useOAuth must be used within an OAuthProvider");
  }
  return context;
};
