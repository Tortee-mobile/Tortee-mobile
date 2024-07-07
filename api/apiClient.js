import axios from "axios";
import { apiConfig } from "../config/apiConfig";

const apiClient = axios.create({
  baseURL: apiConfig.baseUrl,
  withCredentials: true, // Ensure cookies are sent with requests
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)
    }
    return Promise.reject(error);
  }
);

export default apiClient;
