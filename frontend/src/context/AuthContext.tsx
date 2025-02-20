import { createContext, useContext, useState } from "react";

const AuthContext = createContext({ isAuthenticated: false, login: () => {}, logout: () => {} });

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("auth_token"));

  const login = (token: any) => {
    localStorage.setItem("auth_token", token);
    setIsAuthenticated(true); // React will re-render components
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
