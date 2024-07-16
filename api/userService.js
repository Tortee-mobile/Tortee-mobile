import { apiConfig } from "../config/apiConfig";
import apiClient from "./apiClient";

export const getCurrentUser = async () => {
  const response = await apiClient.get(apiConfig.endpoints.getCurrentUser);
  return response.data.data;
};

export const updateUser = async (data) => {
  const formData = new FormData();
  formData.append("FullName", data.fullName);
  formData.append("PhoneNumber", data.phoneNumber);
  formData.append("Bio", data.bio);
  formData.append("Company", data.company);
  formData.append("JobTitle", data.jobTitle);

  const response = await apiClient.put(apiConfig.endpoints.updateUser, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};


export const changePassword = async (data) => {
  return await apiClient.put(apiConfig.endpoints.changePassword, data);
};

export const uploadImage = async (uri) => {
  let formData = new FormData();
  formData.append("avatar", {
    uri,
    name: "avatar.jpg",
    type: "image/jpeg",
  });

  try {
    const response = await apiClient.put(apiConfig.endpoints.updateAvatar, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to upload image");
  }
};