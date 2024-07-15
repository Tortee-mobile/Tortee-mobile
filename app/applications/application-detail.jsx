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

const ApplicationDetail = () => {
  const { id } = useLocalSearchParams();
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
  console.log(application);
  if (loading) return <Loader isLoading={loading} />;

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <View className="bg-white p-6 rounded-lg shadow-md">
        <Text className="text-3xl font-bold mb-4 text-gray-800">
          {application.menteePlan.descriptionOfPlan}
        </Text>
        <View className="flex-row items-center mb-4">
          <Image
            source={{ uri: application.user.profilePic }}
            className="w-12 h-12 rounded-full mr-4"
          />
          <View>
            <Text className="text-xl font-semibold text-gray-700">
              {application.user.fullName}
            </Text>
            <Text className="text-sm text-gray-500">
              {application.user.jobTitle} at {application.user.company}
            </Text>
          </View>
        </View>
        <Text className="text-lg mb-2">
          <Text className="font-semibold">Status:</Text> {application.status}
        </Text>
        <Text className="text-lg mb-2">
          <Text className="font-semibold">Applied on:</Text>{" "}
          {new Date(application.appliedDate).toLocaleDateString()}
        </Text>
        <Text className="text-lg mb-2">
          <Text className="font-semibold">Price:</Text> ${application.price}
        </Text>
        <Text className="text-lg mb-2">
          <Text className="font-semibold">Mentor:</Text>{" "}
          {application.mentor.fullName}
        </Text>
        <Text className="text-lg mb-2">
          <Text className="font-semibold">Mentorship Plan:</Text>{" "}
          {application.menteePlan.callPerMonth} calls/month,{" "}
          {application.menteePlan.durationOfMeeting} mins each, $
          {application.menteePlan.price}
        </Text>
        {application.answers && (
          <View className="mt-4">
            {application.answers.map((answer) => (
              <View key={answer.id} className="mb-6">
                <Text className="text-lg font-bold mb-2">
                  {answer.question}
                </Text>
                <Text className="text-lg text-gray-600">
                  {answer.responseContent}
                </Text>
              </View>
            ))}
          </View>
        )}
        <View className="flex-row justify-between mt-4">
          <TouchableOpacity
            className="flex-1 py-3 rounded-lg bg-green-500 mx-2 items-center"
            onPress={() => handleUpdateStatus("Accepted")}
          >
            <Text className="text-white text-lg font-bold">Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-1 py-3 rounded-lg bg-red-500 mx-2 items-center"
            onPress={() => handleUpdateStatus("Denied")}
          >
            <Text className="text-white text-lg font-bold">Deny</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ApplicationDetail;
