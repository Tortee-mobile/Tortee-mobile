import { apiConfig } from "../config/apiConfig";
import apiClient from "./apiClient";

export const signIn = async (email, password) => {
  const response = await apiClient.post(apiConfig.endpoints.signIn, {
    email,
    password,
  });
  return response.data;
};

export const signUp = async (firstName, lastName, email, password) => {
  const response = await apiClient.post(apiConfig.endpoints.signUp, {
    firstName,
    lastName,
    email,
    password,
  });
  return response.data;
};

export const signOut = async () => {
  const response = await apiClient.post("/auth/signout");
  return response.data;
};
