export const apiConfig = {
  baseUrl: "https://totevn.azurewebsites.net/api",
  endpoints: {
    signIn: "/auth/login",
    signUp: "/auth/register",
    getCurrentUser: "/Account/my-profile",
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
    feedbackMentor: "/Feedback",
    menteeAplly: "mentee/apply",
    applicationQuestions: "/ApplicationQuestion",
    payment: "/Payment/create-payment-url",
    myMentors: "Workspace/mentee/my-mentors",
    myAss: "Workspace/mentee/my-assignments",
    mySubmition: "Workspace/mentee/my-submissions",
    myFeedback: "Feedback/send-feedback",
    myMentees: "Workspace/mentor/my-mentees",
    mySentAss: "Workspace/mentor/assignments",

    // Add other endpoints as needed
    getSkill: "/Skill",
    addSkill: "/Skill/update-my-skill",
  },
  hubs: {
    chatHub: "https://totevn.azurewebsites.net/chathub",
    notificationHub: "https://totevn.azurewebsites.net/notificationhub",
  },
};
