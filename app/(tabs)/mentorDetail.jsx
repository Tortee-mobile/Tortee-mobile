import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import useApi from "../../hooks/useApi";
import { router, useNavigation } from "expo-router";
import { getMentorId, getMentorshipPlan } from "../../api/mentorService";
import { useRoute } from "@react-navigation/native";
import { FAB } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useChat } from "../../context/ChatContext";

const MentorDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { mentorId } = route.params;
  const { setChatboxes } = useChat();
  const [showTooltip, setShowTooltip] = useState(false);
  const [isFABOpen, setIsFABOpen] = useState(false);

  const [isMentorshipPlanVisible, setIsMentorshipPlanVisible] = useState(false);

  const toggleMentorshipPlan = () => {
    setIsMentorshipPlanVisible(!isMentorshipPlanVisible);
  };

  const {
    data: initialMentorData,
    loading: loadingMentor,
    refetch: refetchMentor,
  } = useApi(() => getMentorId(mentorId), [mentorId]);

  const {
    data: mentorPlanData,
    loading: loadingMentorPlan,
    refetch: refetchMentorPlan,
  } = useApi(() => getMentorshipPlan(mentorId), [mentorId]);

  const initialMentor = initialMentorData?.data;
  const mentorPlan = mentorPlanData?.data;

  console.log("mentorPlan", mentorPlan);

  useLayoutEffect(() => {
    if (initialMentor) {
      navigation.setOptions({
        headerTitle: "Mentor Detail",
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            className="ml-4"
          >
            <Ionicons name="arrow-back" size={24} color="#6adbd7" />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => handleChatPress(initialMentor?.id)}
            className="mr-10"
          >
            <Ionicons name="chatbubbles" size={24} color="#6adbd7" />
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, initialMentor, mentorId]);

  useEffect(() => {
    refetchMentor();
    refetchMentorPlan();
  }, [mentorId]); // Refetch when mentorId changes

  const handleChatPress = (chatPartnerId) => {
    setChatboxes((prevChatboxes) =>
      prevChatboxes.map((chatbox) =>
        chatbox.chatPartnerId === chatPartnerId
          ? { ...chatbox, unreadCount: 0 }
          : chatbox
      )
    );
    router.push({
      pathname: "chat/chatbox",
      params: { chatPartnerId },
    });
  };

  const toggleTooltip = () => {
    setShowTooltip((prev) => !prev);
  };

  if (loadingMentor || loadingMentorPlan) {
    return <Text>Loading...</Text>;
  }

  if (!initialMentor || !mentorPlan) {
    return <Text>No mentor found.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: initialMentor?.profilePic }}
          style={styles.profilePic}
        />
        <Text style={styles.fullName}>{initialMentor?.fullName}</Text>
        <Text style={styles.jobTitle}>{initialMentor?.jobTitle}</Text>
        <Text style={styles.company}>{initialMentor?.company}</Text>

        <Text style={styles.bio}>{initialMentor?.bio}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.contactText}>Email: {initialMentor?.email}</Text>
        {initialMentor?.phoneNumber ? (
          <Text style={styles.contactText}>
            Phone: {initialMentor?.phoneNumber}
          </Text>
        ) : (
          <Text style={styles.contactText}>Phone: Not available</Text>
        )}
      </View>

      <View style={styles.skillsContainer}>
        <Text style={styles.sectionTitle}>Skills</Text>
        {initialMentor.userSkills.length > 0 ? (
          initialMentor?.userSkills.map((skill, index) => (
            <View key={index} style={styles.skillItem}>
              <Text style={styles.skillBullet}>•</Text> {/* Dấu chấm tròn */}
              <Text style={styles.skillText}>{skill.skillName}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.skillText}>No skills listed.</Text>
        )}
      </View>

      <TouchableOpacity
        style={styles.mentorshipButton}
        onPress={toggleMentorshipPlan}
      >
        <Text style={styles.buttonText}>Show Mentorship Plan</Text>
      </TouchableOpacity>

      {isMentorshipPlanVisible && (
        <View style={styles.mentorshipPlanContainer} className="shadow-lg p-6">
          <Text style={styles.sectionTitle1}>Mentorship Plan</Text>
          <View style={styles.detailRow}>
            <Text style={styles.labelText}>Description:</Text>
            <Text style={styles.valueText} className="font-semibold text-gray">
              {mentorPlan.descriptionOfPlan}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.labelText}>Calls per Month:</Text>
            <Text style={styles.valueText}>{mentorPlan.callPerMonth}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.labelText}>Duration of Meeting:</Text>
            <Text style={styles.valueText}>
              {mentorPlan.durationOfMeeting} minutes
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.labelText}>Remaining Slots:</Text>
            <Text style={styles.valueText}>{mentorPlan.remainSlot} slot</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.labelText}>Price:</Text>
            <Text style={styles.priceText}>
              {mentorPlan.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.labelText}>Status:</Text>
            <Text style={styles.valueText}>{mentorPlan.status}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text
              style={[
                styles.labelText,
                mentorPlan.isInMentorship
                  ? styles.inMentorship
                  : styles.notInMentorship,
              ]}
            >
              Is in Mentorship:
            </Text>
            <Text
              style={[
                styles.valueText,
                mentorPlan.isInMentorship
                  ? styles.inMentorship
                  : styles.notInMentorship,
              ]}
            >
              {mentorPlan.isInMentorship ? "Yes" : "No"}
            </Text>
          </View>
          <Text className=" bg-[#6adbd7] text-[#274a79] p-2 mt-5 rounded-md  text-center font-bold uppercase text-lg">
            Apply now
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f7fcff",
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  fullName: {
    fontSize: 24,
    fontWeight: "700",
  },
  jobTitle: {
    fontSize: 16,
    color: "gray",
  },
  company: {
    fontSize: 16,
    color: "gray",
    marginBottom: 8,
  },
  bio: {
    textAlign: "center",
    marginVertical: 8,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    width: "100%",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
  },
  sectionTitle1: {
    width: "100%",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },
  contactText: {
    fontSize: 16,
    marginBottom: 4,
  },
  skillsContainer: {
    marginBottom: 16,
  },
  skillText: {
    fontSize: 16,
    marginBottom: 4,
  },
  rolesContainer: {
    marginBottom: 16,
  },
  roleText: {
    fontSize: 16,
    marginBottom: 4,
  },
  createdDateContainer: {
    marginBottom: 16,
  },
  createdDateText: {
    fontSize: 16,
    marginBottom: 4,
  },
  skillItem: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    marginBottom: 4,
  },
  skillBullet: {
    marginRight: 8, // Khoảng cách giữa dấu chấm tròn và tên kỹ năng
  },
  skillText: {
    fontSize: 16,
    marginBottom: 4,
  },
  menTorPlanButton: { marginVertical: 16 },
  tooltip: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    elevation: 4,
    marginVertical: 10,
  },
  tooltipTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#ccac00",
  },
  fabActions: {
    position: "absolute",
    right: 24,
    bottom: 120,
    flexDirection: "column",
    alignItems: "flex-end",
  },
  actionButton: {
    backgroundColor: "#6adbd7",
    padding: 10,
    borderRadius: 30,
    marginBottom: 12,
    alignItems: "center",
  },
  mentorshipButton: {
    backgroundColor: "#274a79",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },
  mentorshipPlanContainer: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  labelText: {
    fontSize: 16,
    color: "#274a79",
    fontWeight: "600",
    flex: 2,
  },
  valueText: {
    fontSize: 16,
    flex: 2,
  },
  priceText: {
    fontSize: 20,
    color: "#6adbd7",
    fontWeight: "700",
    flex: 2,
  },
  inMentorship: {
    color: "#274a79",
    fontWeight: "600",
  },
  notInMentorship: {
    color: "gray",
    fontWeight: "600",
  },
});

export default MentorDetail;
