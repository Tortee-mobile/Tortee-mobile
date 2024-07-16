import { showErrorMessage, showSuccessMessage } from "../components/Toast";
import { apiConfig } from "../config/apiConfig";
import apiClient from "./apiClient";

export const getAllMyMentorList = async (pageIndex = 1, pageSize = 10) => {
  try {
    const response = await apiClient.get(apiConfig.endpoints.myMentors, {
      params: {
        PageIndex: pageIndex,
        PageSize: pageSize,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error retrieving my mentor list:", error);
    throw error;
  }
};

export const getAllMyAssignment = async (pageIndex = 1, pageSize = 10) => {
  try {
    const response = await apiClient.get(apiConfig.endpoints.myAss, {
      params: {
        PageIndex: pageIndex,
        PageSize: pageSize,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error retrieving my Assignment list:", error);
    throw error;
  }
};

export const getAllMySubmition = async (pageIndex = 1, pageSize = 10) => {
  try {
    const response = await apiClient.get(apiConfig.endpoints.mySubmition, {
      params: {
        PageIndex: pageIndex,
        PageSize: pageSize,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error retrieving my submition list:", error);
    throw error;
  }
};

export const getAllMyFeedback = async (pageIndex = 1, pageSize = 10) => {
  try {
    const response = await apiClient.get(apiConfig.endpoints.myFeedback, {
      params: {
        PageIndex: pageIndex,
        PageSize: pageSize,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error retrieving my feedback list:", error);
    throw error;
  }
};

export const getAllMyMentees = async (pageIndex = 1, pageSize = 10) => {
  try {
    const response = await apiClient.get(apiConfig.endpoints.myMentees, {
      params: {
        PageIndex: pageIndex,
        PageSize: pageSize,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error retrieving my feedback list:", error);
    throw error;
  }
};

export const getAllMySentAss = async (pageIndex = 1, pageSize = 10) => {
  try {
    const response = await apiClient.get(apiConfig.endpoints.mySentAss, {
      params: {
        PageIndex: pageIndex,
        PageSize: pageSize,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error retrieving my feedback list:", error);
    throw error;
  }
};
