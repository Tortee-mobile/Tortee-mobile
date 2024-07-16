import { apiConfig } from "../config/apiConfig";
import apiClient from "./apiClient";

export const getNotifications = async (pageIndex = 1, pageSize = 100) => {
  try {
    const response = await apiClient.get(apiConfig.endpoints.getNotifications, {
      params: {
        PageIndex: pageIndex,
        PageSize: pageSize,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Error retrieving notifications:", error);
    throw error;
  }
};

export const getTotalUnreadNotifications = async () => {
  const response = await apiClient.get(
    apiConfig.endpoints.getTotalUnreadNotifications
  );
  return response.data;
};

export const markNotificationAsRead = async () => {
  const response = await apiClient.put(
    apiClient.endpoints.markNotificationAsRead
  );
  return response.data;
};
