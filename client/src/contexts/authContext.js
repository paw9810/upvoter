import React from "react";

const AuthContext = React.createContext({
  user: "guest",
  setUser: () => {},
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export default AuthContext;
