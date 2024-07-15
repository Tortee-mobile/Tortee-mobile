import { apiConfig } from "../config/apiConfig";
import apiClient from "./apiClient";

export const getMenteeApplicationsSent = async () => {
  return await apiClient.get(apiConfig.endpoints.getMenteeApplicationsSent);
};

export const getMenteeApplicationsReceived = async () => {
  return await apiClient.get(apiConfig.endpoints.getMenteeApplicationsReceived);
};

export const getApplicationDetail = async (id) => {
  const response = await apiClient.get(
    `${apiConfig.endpoints.getApplicationDetail}/${id}`
  );
  return response.data;
};

export const updateApplicationStatus = async (data) => {
  return await apiClient.put(apiConfig.endpoints.updateApplicationStatus, data);
};
