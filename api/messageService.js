import { apiConfig } from "../config/apiConfig";
import apiClient from "./apiClient";

export const getAllChatBox = async () => {
  try {
    console.log(apiConfig.getAllChatBox);
    const response = await apiClient.get(apiConfig.endpoints.getAllChatBox);

    return response.data;
  } catch (error) {
    console.error("Error retrieving chat boxes:", error);
    throw error;
  }
};
