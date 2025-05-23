import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api"; // We'll create this

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        try {
          // Optional: verify token with a /profile or /me endpoint
          const response = await api.get("/auth/profile");
          setUser(response.data);
        } catch (error) {
          console.error("Failed to load user from token", error);
          localStorage.removeItem("authToken");
          delete api.defaults.headers.common["Authorization"];
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("authToken", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
    // Potentially redirect or notify other parts of the app
  };

  // Listen for messages from Google OAuth popup window
  useEffect(() => {
    const handleAuthMessage = (event) => {
      // IMPORTANT: Check event.origin in production to ensure message is from your domain
      // if (event.origin !== 'http://localhost:5001') return;

      if (event.data && event.data.type === "AUTH_SUCCESS") {
        const { token, user: googleUser } = event.data.payload;
        login(googleUser, token);
      }
    };

    window.addEventListener("message", handleAuthMessage);
    return () => {
      window.removeEventListener("message", handleAuthMessage);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
