export const apiConfig = {
  baseUrl: "https://totevn.azurewebsites.net/api",
  endpoints: {
    signIn: "/auth/login",
    signUp: "/auth/register",
    getCurrentUser: "/account/my-profile",
    getAllChatBox: "/Messages/my-chats",
    getChatMessages: "/Messages/messages",
    sendMessage: "/Messages/send-message",
    searchChat: "/Messages/search-chat",
    getTotalUnreadNotification: "/Notifications/unread-notification",
    readNotification: "/Notifications/read-notification",
    readMessages: "/Messages/read-messages",
    listMentor: "/Mentor/browse-mentor",
    mentorId: "/Account",
    mentorPlan: "/MenteePlan",
    getMenteeApplicationsSent: "/mentee/applications",
    getMenteeApplicationsReceived: "/mentor/applications",
    getApplicationDetail: "/application",
    updateApplicationStatus: "/mentor/update-application",

    // Add other endpoints as needed
  },
  hubs: {
    chatHub: "https://totevn.azurewebsites.net/chathub",
    notificationHub: "https://totevn.azurewebsites.net/notificationhub",
  },
};
