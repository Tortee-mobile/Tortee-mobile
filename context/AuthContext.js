// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import { getCurrentUser } from "../api/userService";
import { signIn, signOut } from "../api/authService";
import { Alert } from "react-native";

const AuthContext = createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        //const currentUser = await getCurrentUser();
        const currentUser = null;
        setUser(currentUser);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    await signIn(email, password);
    const currentUser = await getCurrentUser();
    setUser(currentUser);
  };

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
