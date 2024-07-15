import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import useApi from "../../hooks/useApi";
import {
  getApplicationDetail,
  updateApplicationStatus,
} from "../../api/applicationService";
import { Loader } from "../../components";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";

const ApplicationDetail = () => {
  const { id } = useLocalSearchParams();
  const {
    user: { userRoles, id: userId },
  } = useAuth();
  const {
    data: { data: application },
    loading,
  } = useApi(() => getApplicationDetail(id));

  const handleUpdateStatus = async (status) => {
    try {
      await updateApplicationStatus({ id, status });
      Alert.alert("Success", `Application has been ${status.toLowerCase()}ed`);
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  if (loading) return <Loader isLoading={loading} />;

  return (
    <ScrollView className="flex-1 bg-gray-100 ">
      <View className="bg-white p-8 pt-4 rounded-lg shadow-md mb-4 ">
        <View className="flex-row items-center mb-3">
          {application.mentor.id !== userId ? (
            <View className="flex-row items-center">
              <Image
                source={{ uri: application.mentor.profilePic }}
                className="w-14 h-14 rounded-full mr-4"
              />
              <View>
                <Text className="text-xl font-semibold text-gray-700">
                  Mentor: {application.mentor.fullName}
                </Text>
                <Text className="text-sm text-gray-500">
                  {application.mentor.jobTitle} at {application.mentor.company}
                </Text>
              </View>
            </View>
          ) : (
            <>
              {application.user.profilePic ? (
                <Image
                  source={{ uri: application.user.profilePic }}
                  className="w-14 h-14 rounded-full mr-4"
                />
              ) : (
                <View className="w-14 h-14 rounded-full mr-4 bg-gray-300 flex items-center justify-center">
                  <Text className="text-xl text-gray-500">
                    {application.user.fullName[0]}
                  </Text>
                </View>
              )}
              <View>
                <Text className="text-xl font-semibold text-gray-700">
                  From: {application.user.fullName}
                </Text>
                {application.user.jobTitle && application.user.company && (
                  <Text className="text-sm text-gray-500">
                    {application.user.jobTitle} at {application.user.company}
                  </Text>
                )}
              </View>
            </>
          )}
        </View>
        <View className="flex-row items-center mb-2">
          <Ionicons
            name="checkmark-circle"
            size={24}
            color={application.status === "DENIED" ? "red" : "green"}
          />
          <Text className="text-lg ml-2">
            <Text className="font-semibold">Status:</Text> {application.status}
          </Text>
        </View>
        <View className="flex-row items-center mb-2">
          <Ionicons name="calendar" size={24} color="gray" />
          <Text className="text-lg ml-2">
            <Text className="font-semibold">Applied on:</Text>{" "}
            {new Date(application.appliedDate).toLocaleDateString()}
          </Text>
        </View>
        <View className="flex-row items-center mb-2">
          <Ionicons name="cash" size={24} color="gray" />
          <Text className="text-lg ml-2">
            <Text className="font-semibold">Price:</Text>{" "}
            {application.price.toLocaleString()} vnd
          </Text>
        </View>

        <View className="flex-row items-center mb-2">
          <Ionicons name="call" size={24} color="gray" />
          <Text className="text-lg ml-2 flex-row">
            <Text className="font-semibold">Mentorship Plan:</Text>{" "}
            <Text>{application.menteePlan.callPerMonth} calls/month, </Text>
            <Text>{application.menteePlan.durationOfMeeting} mins each</Text>
          </Text>
        </View>
        {application.menteeApplicationAnswers &&
          application.menteeApplicationAnswers.length > 0 && (
            <View className="mt-4">
              <Text className="text-2xl font-bold mb-4 text-gray-800">
                Answers:
              </Text>
              {application.menteeApplicationAnswers.map((answer) => (
                <View
                  key={answer.id}
                  className="mb-6 p-4 bg-gray-50 rounded-lg"
                >
                  <Text className="text-lg font-bold mb-2 text-gray-700">
                    {answer.question}
                  </Text>
                  <Text className="text-lg text-gray-600">
                    {answer.responseContent || "No response provided."}
                  </Text>
                </View>
              ))}
            </View>
          )}
        {userRoles.map((ur) => ur.name).includes("Mentor") && (
          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              className="flex-1 py-3 rounded-lg bg-green-500 mx-2 items-center shadow-lg"
              onPress={() => handleUpdateStatus("Accepted")}
            >
              <Text className="text-white text-lg font-bold">Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 py-3 rounded-lg bg-red-500 mx-2 items-center shadow-lg"
              onPress={() => handleUpdateStatus("Denied")}
            >
              <Text className="text-white text-lg font-bold">Deny</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ApplicationDetail;
