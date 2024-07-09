import { apiConfig } from "../config/apiConfig";
import apiClient from "./apiClient";

export const getAllChatBox = async () => {
  try {
    const response = await apiClient.get(apiConfig.getAllChatBox);
    return response.data.data;
  } catch (error) {
    console.error("Error retrieving chat boxes:", error);
    throw error;
  }
};
