import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import useApi from "../../hooks/useApi";
import { getAllMyFeedback } from "../../api/workspaceService";
import { useNavigation } from "expo-router";
import { Title } from "react-native-paper";
import FeedbackModal from "../../components/FeedbackModal";

const SentFeedback = () => {
  const navigation = useNavigation();
  const { data, loading, refetch } = useApi(getAllMyFeedback);
  console.log("SentFeedback -> data", data);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMenteeId, setSelectedMenteeId] = useState(null);

  return (
    <View className="flex-1 p-4 ">
      <Text className="text-sm font-semibold text-gray-800 mb-4">
        Total my mentors: ({data?.data?.length || 0})
      </Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : data?.data?.length > 0 ? (
        data.data.map((feedback) => (
          <TouchableOpacity
            key={feedback.menteeApplicationId}
            className="bg-white p-4 rounded-lg shadow-lg mb-4 w-full flex-row items-center"
          >
            <Image
              source={{ uri: feedback.userResponse.profilePic }}
              className="w-24 h-24 rounded-md mr-4"
            />
            <View>
              <Text
                className="text-lg font-bold text-[#274a79]"
                onPress={() =>
                  navigation.navigate("mentor/mentorDetail", {
                    mentorId: feedback.userResponse.id,
                  })
                }
              >
                {feedback.userResponse.fullName}
              </Text>
              <Text className="text-sm text-gray-600 ">
                {feedback.userResponse.email}
              </Text>
              <Text className="text-sm text-gray-600">
                {feedback.userResponse.jobTitle}
              </Text>
              {feedback.isFeedbacked === false ? (
                <TouchableOpacity
                  className="bg-[#274a79] rounded-md p-1 text-center w-full mt-4"
                  onPress={() => {
                    setSelectedMenteeId(feedback.menteeApplicationId);
                    setModalVisible(true);
                  }}
                >
                  <Title className="text-white text-center text-xs font-semibold">
                    Feedback Mentor
                  </Title>
                </TouchableOpacity>
              ) : (
                <Text className="text-green-500 text-center text-xs font-semibold mt-4">
                  You have sent feedback!
                </Text>
              )}
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View className="bg-white p-4 rounded-lg shadow-lg mb-4 w-full">
          <Text className="text-gray-700 text-center">
            You have not connected with any mentors! Please connect with the
            <TouchableOpacity onPress={() => navigation.navigate("home")}>
              <Text className="font-semibold p-2 mx-2 rounded-md text-[#274a79] bg-[#6adbd7]">
                {" "}
                Mentor List{" "}
              </Text>
            </TouchableOpacity>
            of Tortee!
          </Text>
        </View>
      )}
      <FeedbackModal
        refetch={refetch}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        menteeApplicationId={selectedMenteeId}
      />
    </View>
  );
};

export default SentFeedback;
