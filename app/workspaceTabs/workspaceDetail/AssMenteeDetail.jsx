import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import useApi from "../../../hooks/useApi";
import {
  addGrade,
  getAssDetailMentee,
  getListSubmitInAss,
  submitAssignment,
} from "../../../api/workspaceService";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../../../components/Toast";
import FlashMessage from "react-native-flash-message";
import { Modal, TextInput, Title } from "react-native-paper";
import { useAuth } from "../../../context/AuthContext";

const AssMenteeDetail = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const isMentor = user.userRoles.map((ur) => ur.name).includes("Mentor");

  const [visible, setVisible] = useState(3); // Số sản phẩm hiển thị ban đầu
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [commentOfMentor, setCommentOfMentor] = useState("");
  const [grade, setGrade] = useState("");

  const route = useRoute();
  const { assId, mentorName } = route.params;
  const {
    data: initialAssData,
    loading: loadingAss,
    refetch,
  } = useApi(() => getAssDetailMentee(assId), [assId]);

  console.log("user", user);

  const initialAss = initialAssData?.data;

  useLayoutEffect(() => {
    if (assId) {
      navigation.setOptions({
        headerTitle: "Detail Assignment",
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="#6adbd7" />
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, assId]);

  const handleLoadMore = () => {
    if (initialAss.submissions.length > visible) {
      setVisible((prevVisible) => prevVisible + 3); // Tăng số lượng sản phẩm hiển thị khi nhấn nút "Xem thêm"
    }
  };

  const submissions = initialAss?.submissions.slice(0, visible);

  const openModal = (submission) => {
    setSelectedSubmission(submission);
    setCommentOfMentor(submission.commentOfMentor || "");
    setGrade(submission.grade || "");
    setModalVisible(true);
  };

  const handleGradeSubmit = async () => {
    try {
      await addGrade({
        id: selectedSubmission.id,
        commentOfMentor,
        grade,
      });
      showSuccessMessage("Grade submitted successfully");
      setModalVisible(false);
      refetch();
    } catch (error) {
      showErrorMessage("Failed to submit grade");
    }
  };

  return (
    <View className="flex-1 p-4 bg-secondary/20">
      <ScrollView>
        <View className=" p-4 rounded-md bg-[#6adbd7]">
          <Text className="text-xl font-bold text-[#274a79] mb-4">
            Title: {initialAss?.title}
          </Text>
          {!isMentor ? (
            <Text className="text-base font-semibold text-[#274a79]">
              Assigned by:{" "}
              {initialAss?.mentor?.fullName || mentorName || "Unknown"}
            </Text>
          ) : (
            <Text className="text-base font-semibold text-[#274a79]">
              Assigned by: Me
            </Text>
          )}
          {isMentor ? (
            <Text className="text-base font-semibold text-[#274a79] mb-4">
              Assigned to: {initialAss?.mentee?.fullName || "Unknown"}
            </Text>
          ) : (
            <Text className="text-base font-semibold text-[#274a79]">
              Assigned to: Me
            </Text>
          )}
          <Text className="text-xs text-gray-800">
            Description: {initialAss?.description}
          </Text>
          <Text className="text-xs text-gray-800">
            Assigned Date: {new Date(initialAss?.assignedDate).toLocaleString()}
          </Text>
          <Text className="text-xs font-semibold text-gray-800">
            Deadline: {new Date(initialAss?.deadline).toLocaleString()}
          </Text>
          {initialAss?.file && (
            <Text
              className="text-[#274a79] text-center text-lg font-semibold mt-4 bg-white p-1 rounded-md"
              onPress={() => Linking.openURL(initialAss.file)}
            >
              Download File
            </Text>
          )}
        </View>

        {initialAss && user.userRoles[0].name === "Mentee" && (
          <View className="flex-1 justify-center items-center p-4 bg-white mt-4 mb-2  rounded-md">
            <Text className="text-center text-base font-medium text-gray-600">
              Please go to the website to submit your assignment:{" "}
            </Text>
            <Text
              className="text-blue-500 underline font-semibold"
              onPress={() =>
                Linking.openURL(
                  `https://feexe.vercel.app/workspace/assignment/${initialAss.id}`
                )
              }
            >
              Submit Assignment
            </Text>
          </View>
        )}
        {submissions && (
          <View className="mt-4 ">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Submitted Assignments ({initialAss?.submissions?.length || 0} file
              submited)
            </Text>
            {submissions?.map((submission, index) => (
              <View
                key={submission.id}
                className="mb-4 p-4 bg-white rounded shadow flex-row "
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
                  {submission.commentOfMentor && (
                    <Text className="font-semibold text-gray-500">
                      Comment Of Mentor: "{submission.commentOfMentor}"
                    </Text>
                  )}
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
                    {isMentor && submission.status === "UNGRADED" && (
                      <TouchableOpacity
                        className="bg-[#b2cdf0] border-2 border-gray-500 rounded-md p-1 text-center w-[40%] mt-4 flex-row justify-center items-center"
                        onPress={() => openModal(submission)}
                      >
                        <Ionicons
                          name="pencil"
                          size={16}
                          color="black"
                          style={{ marginRight: 4 }}
                        />
                        <Title className="text-black text-center text-xs font-semibold">
                          GRADE
                        </Title>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            ))}
            {initialAss?.submissions.length > visible && (
              <TouchableOpacity
                className="bg-white rounded-md p-1 text-center w-[40%] mt-4 mx-auto"
                onPress={handleLoadMore}
              >
                <Title className="text-[#274a79] text-center text-sm font-semibold">
                  Xem thêm
                </Title>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
      <Modal
        visible={isModalVisible}
        onDismiss={() => setModalVisible(false)}
        contentContainerStyle={{
          padding: 20,
          backgroundColor: "white",
          margin: 20,
        }}
      >
        <Title>Submit Grade</Title>
        <TextInput
          label="Comment"
          value={commentOfMentor}
          onChangeText={setCommentOfMentor}
          mode="outlined"
          style={{ marginBottom: 20 }}
        />
        <TextInput
          label="Grade"
          value={grade}
          onChangeText={setGrade}
          mode="outlined"
          keyboardType="numeric"
          style={{ marginBottom: 20 }}
        />

        <Button title="Submit" onPress={handleGradeSubmit} />
        <Button title="Cancel" onPress={() => setModalVisible(false)} />
      </Modal>
    </View>
  );
};

export default AssMenteeDetail;
