import { apiConfig } from "../config/apiConfig";
import apiClient from "./apiClient";

export const getCurrentUser = async () => {
  const response = await apiClient.get(apiConfig.endpoints.getCurrentUser);
  return response.data.data;

};
