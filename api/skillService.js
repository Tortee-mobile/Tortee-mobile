import { apiConfig } from "../config/apiConfig";
import apiClient from "./apiClient";

export const getSkills = async (searchTerm) => { 
    const response = await apiClient.get(apiConfig.endpoints.getSkill, {
      params: { search: searchTerm },
    });
    return response.data; 
};

export const updateMySkills = async (skillsToUpdate) => {
    const response = await apiClient.put(apiConfig.endpoints.addSkill, {
      skills: skillsToUpdate,
    });
    return response.data;
};
