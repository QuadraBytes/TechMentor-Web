import React, { createContext, useState, useEffect } from "react";
import StorageService from "../services/storageService";
import { setLogoutHandler } from "./authHandler";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setLogoutHandler(logout);
    loadAuthData();
  }, []);

  const loadAuthData = () => {
    const token = StorageService.get("accessToken");
    const refreshToken = StorageService.get("refreshToken");
    const userId = StorageService.get("userId");
    const userRole = StorageService.get("userRole");

    if (token && refreshToken && userId && userRole) {
      if (userRole === "student") {
        navigate("/student");
      } else {
        navigate("/instructor");
      }
      setAuthData({ userId, userRole });
      setIsAuthenticated(true);
      console.log("Auth data loaded successfully");
    } else {
      setIsAuthenticated(false);
      setAuthData(null);
    }
    setLoading(false);
  };

  const login = (token, refreshToken, userId, userRole) => {
    StorageService.save("accessToken", token);
    StorageService.save("refreshToken", refreshToken);
    StorageService.save("userId", userId);
    StorageService.save("userRole", userRole);

    if (userRole === "student") {
      navigate("/student");
    } else {
      navigate("/instructor");
    }
    setAuthData({ userId, userRole });
    setIsAuthenticated(true);
    console.log("Login successful");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthData(null);
    StorageService.clearAll();
    navigate("/login");
    console.log("Logout successful");
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        login,
        logout,
        loading,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
