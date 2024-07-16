import React from "react";
import { View, Text, Image, Linking } from "react-native";
import useApi from "../../hooks/useApi";
import { getAllMyAssignment } from "../../api/workspaceService";

const MyAssignmentReceived = () => {
  const { data, loading } = useApi(getAllMyAssignment);
  console.log("MyAssignmentReceived -> data", data);

  const formatDate = (dateString) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(dateString)
      .toLocaleString("en-US", options)
      .replace(",", "");
  };

  return (
    <View className="flex-1 p-4 ">
      <Text className="text-sm font-semibold text-gray-800 mb-4">
        Total my Assignment Received: ({data?.data?.length || 0})
      </Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : data?.data.length > 0 ? (
        data.data.map((assignment) => (
          <View
            key={assignment.id}
            className="bg-white p-4 rounded-lg shadow-lg mb-4 w-full"
          >
            <Text className="text-lg font-bold text-[rgb(39,74,121)]">
              {assignment.title}
            </Text>
            <Text className="text-gray-600">{assignment.description}</Text>
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
          </View>
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
