export const apiConfig = {
  baseUrl: "https://totevn.azurewebsites.net/api",
  endpoints: {
    signIn: "/auth/login",
    signUp: "/auth/register",
    getCurrentUser: "/account/my-profile",
    getAllChatBox: "/Messages/my-chats",
    // Add other endpoints as needed
  },
};
