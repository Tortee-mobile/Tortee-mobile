import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import MyMentors from "../workspaceTabs/MyMentors";
import MyAssignmentReceived from "../workspaceTabs/MyAssignmentReceived";
import SentFeedback from "../workspaceTabs/SentFeedback";
import MySubmission from "../workspaceTabs/MySubmission";
import Banner from "../../components/BannerTitle";
import MySentAss from "../workspaceTabs/MySentAss";
import MyMentees from "../workspaceTabs/MyMentees";
import { useAuth } from "../../context/AuthContext";

const Workspace = () => {
  const { user } = useAuth();
  const isMentor = user?.userRoles?.map((ur) => ur.name).includes("Mentor");
  const [activeTab, setActiveTab] = useState("My Mentors");

  // Định nghĩa các tab dựa trên vai trò
  const tabs = isMentor
    ? [
        {
          title: "My Mentees",
          icon: "person",
          component: <MyMentees key="MyMentees" />,
        },
        {
          title: "My Assignments Sent",
          icon: "send",
          component: <MySentAss key="MyAssignmentsSent" />,
        },
      ]
    : [
        {
          title: "My Mentors",
          icon: "person",
          component: <MyMentors key="MyMentors" />,
        },
        {
          title: "My Assignment Received",
          icon: "assignment",
          component: <MyAssignmentReceived key="MyAssignmentReceived" />,
        },
        {
          title: "My Submission",
          icon: "send",
          component: <MySubmission key="MySubmission" />,
        },
        {
          title: "Sent Feedback",
          icon: "feedback",
          component: <SentFeedback key="SentFeedback" />,
        },
      ];

  return (
    <SafeAreaView className="flex-1 bg-gray-100  bg-secondary/20">
      <View style={styles.header}>
        <Text style={styles.headerText}>My Workspace</Text>
      </View>
      <View className="p-4">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="space-x-4"
        >
          {tabs.map(({ title, icon }) => (
            <TouchableOpacity
              key={title}
              onPress={() => setActiveTab(title)}
              className={`py-2 px-4 rounded-lg ${
                activeTab === title ? "bg-[#6adbd7]" : "bg-white"
              } shadow`}
            >
              <View className="items-center">
                <MaterialIcons
                  name={icon}
                  size={20}
                  color={activeTab === title ? "#274a79" : "gray"}
                />
                <Text
                  className={`text-[10px] font-semibold mt-2 ${
                    activeTab === title ? "text-[#274a79]" : "text-gray-600"
                  }`}
                >
                  {title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View className="flex-1">
        {tabs.map(({ title, component }) =>
          activeTab === title ? (
            <View key={title} className="flex-1 mx-5">
              <Banner title={title} />
              {component}
            </View>
          ) : null
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#274a79",
    padding: 15,
    borderBottomWidth: 5,
    borderBottomColor: "#6adbd7",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "700",
  },
});

export default Workspace;
