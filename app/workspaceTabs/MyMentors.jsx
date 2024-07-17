import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import useApi from "../../hooks/useApi";
import { getAllMyMentorList } from "../../api/mentorService";
import { useNavigation } from "expo-router";

const MyMentors = () => {
  const navigation = useNavigation();

  const { data, loading, refetch } = useApi(getAllMyMentorList);

  return (
    <View className="flex-1 p-4 ">
      <Text className="text-sm font-semibold text-gray-800 mb-4">
        Total my mentors: ({data?.data?.length || 0})
      </Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : data?.data.length > 0 ? (
        data.data.map((mentor) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("mentor/mentorDetail", {
                mentorId: mentor.id,
              })
            }
            key={mentor.id}
            className="bg-white p-4 rounded-lg shadow-lg mb-4 w-full flex-row items-center"
          >
            <Image
              source={{ uri: mentor.profilePic }}
              className="w-24 h-24 rounded-md mr-4"
            />
            <View>
              <Text
                className="text-lg font-bold text-[#274a79]"
                onPress={() =>
                  navigation.navigate("mentor/mentorDetail", {
                    mentorId: mentor.id,
                  })
                }
              >
                {mentor.fullName}
              </Text>
              <Text className="text-sm text-gray-600 ">{mentor.email}</Text>
              <Text className="text-sm text-gray-600">{mentor.jobTitle}</Text>
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
    </View>
  );
};

export default MyMentors;
