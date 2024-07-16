import { showErrorMessage, showSuccessMessage } from "../components/Toast";
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

export const getMenteeId = async (menteeId) => {
  try {
    const response = await apiClient.get(
      `${apiConfig.endpoints.mentorId}/${menteeId}`
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
  pageSize = 100
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

export const getMentorReview = async (
  mentorId,
  pageIndex = 1,
  pageSize = 10
) => {
  try {
    const response = await apiClient.get(
      `${apiConfig.endpoints.feedbackMentor}/${mentorId}`,
      {
        params: {
          PageIndex: pageIndex,
          PageSize: pageSize,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error retrieving this mentor:", error);
    throw error;
  }
};

export const getApplicationQuestions = async () => {
  try {
    const response = await apiClient.get(
      apiConfig.endpoints.applicationQuestions
    );
    return response.data;
  } catch (error) {
    console.error("Error retrieving application questions:", error);
    throw error;
  }
};

export const applyForMentee = async (
  menteePlanId,
  menteeApplicationAnswers
) => {
  try {
    const applicationData = {
      menteePlanId,
      menteeApplicationAnswers, // Directly use the array of answers
    };

    const response = await apiClient.post(
      apiConfig.endpoints.menteeAplly,
      applicationData
    );

    showSuccessMessage("Application submitted successfully!"); // Show success message
    return response.data;
  } catch (error) {
    console.error("Error submitting application:", error);
    showErrorMessage("Failed to submit application."); // Show error message
    throw error;
  }
};

export const createPaymentUrl = async (data) => {
  const response = await apiClient.post(apiConfig.endpoints.payment, data);
  return response.data;
};

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
