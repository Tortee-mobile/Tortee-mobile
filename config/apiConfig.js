import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export const apiConfig = {
  baseUrl: "https://totevn.azurewebsites.net/api",
  endpoints: {
    signIn: "/auth/login",
    signUp: "/auth/register",
    getCurrentUser: "/account/my-profile",
    getAllChatBox: "/Messages/my-chats",
    getChatMessages: "/Messages/messages",
    // Add other endpoints as needed
  },
};
