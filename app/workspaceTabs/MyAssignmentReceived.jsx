import React from "react";
import { View, Text, Image, Linking, TouchableOpacity } from "react-native";
import useApi from "../../hooks/useApi";
import { getAllMyAssignment } from "../../api/workspaceService";
import { useNavigation } from "expo-router";

const MyAssignmentReceived = () => {
  const navigation = useNavigation();

  const { data, loading } = useApi(getAllMyAssignment);
  console.log("MyAssignmentReceived -> data", data);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const formattedDate = `${("0" + date.getDate()).slice(-2)}/${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}/${date.getFullYear()}`;

    return `${formattedTime}, ${formattedDate}`;
  };

  return (
    <View className="flex-1 p-4 ">
      <Text className="text-sm font-semibold text-[#274a79] mb-4">
        Total my Assignment Received: ({data?.data?.length || 0})
      </Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : data?.data.length > 0 ? (
        data.data.map((assignment) => (
          <TouchableOpacity
            key={assignment.id}
            onPress={() =>
              navigation.navigate(
                "workspaceTabs/workspaceDetail/AssMenteeDetail",
                {
                  assId: assignment.id,
                  mentorName: assignment.mentor.fullName,
                }
              )
            }
            className="bg-white p-4 rounded-lg shadow-lg mb-4 w-full"
          >
            <Text className="text-lg font-bold text-[#274a79]">
              {assignment.title}
            </Text>
            <Text className="text-gray-600">{assignment.description}</Text>
            <Text
              className={`text-gray-800 font-bold mt-3 uppercase ${
                assignment.isSubmited ? "text-green-500" : "text-gray-500"
              }`}
            >
              {assignment.isSubmited ? "SUBMITTED" : "not submitted yet"}
            </Text>

            <Text className="text-sm text-gray-700 font-semibold my-2">
              Assigned by: {assignment.mentor.fullName}
            </Text>
            <Text className="text-sm text-gray-500">
              Deadline: {formatDate(assignment.deadline)}
            </Text>
            {assignment.file && (
              <Text
                className="text-blue-500 mt-2 underline"
                onPress={() => Linking.openURL(assignment.file)}
              >
                Download Assignment
              </Text>
            )}
          </TouchableOpacity>
        ))
      ) : (
        <Text className="text-gray-600 text-center">
          You have no assignments received.
        </Text>
      )}
    </View>
  );
};

export default MyAssignmentReceived;
