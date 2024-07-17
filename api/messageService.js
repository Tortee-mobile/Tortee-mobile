import { apiConfig } from "../config/apiConfig";
import apiClient from "./apiClient";

export const getAllChatBox = async () => {
  try {
    const response = await apiClient.get(apiConfig.endpoints.getAllChatBox);

    return response.data;
  } catch (error) {
    console.error("Error retrieving chat boxes:", error);
    throw error;
  }
};

export const getChatMessages = async (chatPartnerId) => {
  try {
    const response = await apiClient.get(
      `${apiConfig.endpoints.getChatMessages}?ChatPartnerId=${chatPartnerId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error retrieving chat messages:", error);
    throw error;
  }
};

export const readMessages = async (chatPartnerId) => {
  try {
    const response = await apiClient.put(
      `${apiConfig.endpoints.readMessages}?chatPartnerId=${chatPartnerId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error reading messages:", error);
    throw error;
  }
};

export const searchChat = async (search) => {
  try {
    const response = await apiClient.get(apiConfig.endpoints.searchChat, {
      params: { search }, // Thêm tham số vào yêu cầu
    });

    return response.data;
  } catch (error) {
    console.error("Error retrieving chat boxes:", error);
    throw error;
  }
};
