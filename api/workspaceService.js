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

export const getAssDetailMentee = async (assId) => {
  try {
    const response = await apiClient.get(
      `${apiConfig.endpoints.AssDetail}/${assId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error retrieving this mentor:", error);
    throw error;
  }
};

export const submitAssignment = async (assignmentId, file) => {
  try {
    const formData = new FormData();
    formData.append("AssignmentId", assignmentId);
    formData.append("file", {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || "application/octet-stream",
    });

    // Log FormData entries
    for (let pair of formData.entries()) {
      if (pair[0] === "file") {
        console.log(`${pair[0]}:`);
        console.log(`  Name: ${pair[1].name}`);
        console.log(`  URI: ${pair[1].uri}`);
        console.log(`  Type: ${pair[1].type}`);
        console.log(`  Size: ${pair[1].size}`);
      } else {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    }

    debugger;

    const response = await apiClient.post(
      apiConfig.endpoints.SubmitAss,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    showSuccessMessage("File uploaded successfully!");
    return response.data;
  } catch (error) {
    console.error("Error submitting assignment:", error);
    showErrorMessage("Failed to upload file.");
    throw error;
  }
};

export const getListSubmitInAss = async (assId) => {
  try {
    const response = await apiClient.get(
      `${apiConfig.endpoints.getAllSubmitInAss}/${assId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error retrieving this mentor:", error);
    throw error;
  }
};

export const addFeedbackMentor = async (data) => {
  const response = await apiClient.post(apiConfig.endpoints.addFeedback, data);
  return response.data;
};

export const addGrade = async (data) => {
  const response = await apiClient.put(apiConfig.endpoints.addGrade, data);
  return response.data;
};
