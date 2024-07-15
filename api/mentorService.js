import { apiConfig } from "../config/apiConfig";
import apiClient from "./apiClient";

export const getAllMentorList = async (pageIndex = 1, pageSize = 10) => {
  try {
    const response = await apiClient.get(apiConfig.endpoints.listMentor, {
      params: {
        PageIndex: pageIndex,
        PageSize: pageSize,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error retrieving mentor list:", error);
    throw error;
  }
};

export const getMentorId = async (mentorId) => {
  try {
    const response = await apiClient.get(
      `${apiConfig.endpoints.mentorId}/${mentorId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error retrieving this mentor:", error);
    throw error;
  }
};

export const getMentorshipPlan = async (
  mentorId,
  pageIndex = 1,
  pageSize = 10
) => {
  try {
    const response = await apiClient.get(
      `${apiConfig.endpoints.mentorPlan}/${mentorId}`,
      {
        params: {
          PageIndex: pageIndex,
          PageSize: pageSize,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error retrieving mentor list:", error);
    throw error;
  }
};
