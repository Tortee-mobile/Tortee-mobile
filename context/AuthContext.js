import React, { createContext, useState, useEffect, useContext } from "react";
import { getCurrentUser } from "../api/userService";
import { signIn, signOut } from "../api/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        const token = await AsyncStorage.getItem("token");

        if (token) {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    const response = await signIn(email, password);

    await AsyncStorage.setItem("token", response.data.token);
    const currentUser = await getCurrentUser();

    setUser(currentUser);
  };

  const logout = async () => {
    //await signOut();
    setUser(null);
    await AsyncStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
