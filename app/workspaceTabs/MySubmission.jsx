import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { getAllMySubmition } from "../../api/workspaceService";
import useApi from "../../hooks/useApi";
import { Title } from "react-native-paper";
import { useNavigation } from "expo-router";

const MySubmission = () => {
  const navigation = useNavigation();

  const { data, loading, refetch } = useApi(getAllMySubmition);
  const [visible, setVisible] = useState(4); // Số sản phẩm hiển thị ban đầu

  console.log("MySubmission -> data", data);

  const mySubmission = data?.data || []; // Ensure mySubmission is an array

  const handleLoadMore = () => {
    if (mySubmission.length > visible) {
      setVisible((prevVisible) => prevVisible + 4); // Tăng số lượng sản phẩm hiển thị khi nhấn nút "Xem thêm"
    }
  };

  const submissions = mySubmission?.slice(0, visible);

  return (
    <View className="flex-1 my-2">
      <ScrollView>
        {submissions ? (
          submissions.map((submission, index) => (
            <TouchableOpacity
              key={submission.id}
              className="mb-4 p-4 bg-white rounded shadow flex-row "
              onPress={() =>
                navigation.navigate(
                  "workspaceTabs/workspaceDetail/AssMenteeDetail",
                  {
                    assId: submission.assignmentId,
                  }
                )
              }
            >
              <Text className="text-sm font-semibold text-gray-700 mr-3">
                {index + 1}
              </Text>
              <View className="w-full">
                <Text className="font-bold">
                  {submission.file ? "Submitted File" : "No File"}
                </Text>
                <View className="flex-row items-center">
                  <Text className="text-sm mr-2 text-gray-500">Status:</Text>
                  <Text
                    className={`text-sm font-bold ${
                      submission.status === "UNGRADED"
                        ? "text-gray-500"
                        : "text-green-500"
                    }`}
                  >
                    {submission.status}
                  </Text>
                </View>
                <Text className="font-semibold text-gray-500">
                  Grade: {submission.grade}
                </Text>

                <Text className="text-sm text-gray-500">
                  Submitted Date:{" "}
                  {new Date(submission.submitedDate).toLocaleString()}
                </Text>
                <View className="flex-row justify-around items-center w-[90%]">
                  <View className="flex-1 ">
                    {submission.file && (
                      <TouchableOpacity
                        className="mt-2"
                        onPress={() => Linking.openURL(submission.file)}
                      >
                        <Text className="text-blue-500 underline">
                          Download Submit File
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                  <TouchableOpacity
                    className="bg-[#274a79] rounded-md p-1 text-center w-[40%] mt-4"
                    onPress={() =>
                      navigation.navigate(
                        "workspaceTabs/workspaceDetail/AssMenteeDetail",
                        {
                          assId: submission.assignmentId,
                        }
                      )
                    }
                  >
                    <Title className="text-white text-center text-xs font-semibold">
                      View Assignment
                    </Title>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No data</Text>
        )}
        {mySubmission?.length > visible && (
          <TouchableOpacity
            className="bg-white rounded-md p-1 text-center w-[40%] mt-4 mx-auto"
            onPress={handleLoadMore}
          >
            <Title className="text-[#274a79] text-center text-sm font-semibold">
              Xem thêm
            </Title>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default MySubmission;
