import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import useApi from "../../hooks/useApi";
import {
  getApplicationDetail,
  updateApplicationStatus,
} from "../../api/applicationService";
import { Loader } from "../../components";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/AuthContext";
import { showErrorMessage } from "../../components/Toast";
import { createPaymentUrl } from "../../api/mentorService";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const ApplicationDetail = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const {
    user: { userRoles, id: userId },
  } = useAuth();
  const {
    data: { data: application },
    loading,
  } = useApi(() => getApplicationDetail(id));

  const [paymentLoading, setPaymentLoading] = useState(false);
  const handleUpdateStatus = async (status) => {
    try {
      await updateApplicationStatus({ id, status });
      Alert.alert("Success", `Application has been ${status.toLowerCase()}ed`);
      router.back();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const handlePayment = async () => {
    setPaymentLoading(true);
    try {
      const paymentData = {
        orderInfo: application.id,
        fullName: application.user.fullName,
        orderType: "Bank Transfer",
        description: "Booking mentorship",
        amount: application.price,
      };
      const response = await createPaymentUrl(paymentData);
      const paymentUrl = response.data; // Get payment URL from response
      Linking.openURL(paymentUrl); // Open payment URL in browser
    } catch (error) {
      showErrorMessage("Failed to create payment URL. Please try again.");
    } finally {
      setPaymentLoading(false);
    }
  };

  if (loading) return <Loader isLoading={loading} />;

  return (
    <SafeAreaView className="h-full">
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
                    {application.mentor.jobTitle} at{" "}
                    {application.mentor.company}
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
              <Text className="font-semibold">Status:</Text>{" "}
              {application.status}
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
          {application.status === "ACCEPTED" &&
          userId === application.menteePlan.mentorId ? (
            <View>
              <TouchableOpacity
                onPress={handlePayment}
                disabled={paymentLoading}
              >
                {paymentLoading ? (
                  <ActivityIndicator color="#274a79" />
                ) : (
                  <Text className=" bg-[#6adbd7] text-[#274a79] p-2 mt-5 rounded-md  text-center font-bold uppercase text-lg">
                    Payment Now
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          ) : null}
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
          {userId === application.menteePlan.mentorId &&
          application.status === "PENDING" ? (
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
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplicationDetail;
