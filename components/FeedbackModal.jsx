import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { addFeedbackMentor } from "../api/workspaceService";
import StarRatingInput from "./StartInput";
import { Modal } from "react-native-paper";
import { showErrorMessage, showSuccessMessage } from "./Toast";

const FeedbackModal = ({ visible, refetch, onClose, menteeApplicationId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    const feedbackData = {
      rating,
      comment,
      menteeApplicationId,
    };
    debugger;
    try {
      await addFeedbackMentor(feedbackData);
      showSuccessMessage("Feedback submitted successfully!"); // Hiển thị thông báo thành công
      await refetch(); // Refetch lại dữ liệu
      onClose(); // Đóng modal sau khi gửi
    } catch (error) {
      console.error("Error submitting feedback:", error);
      showErrorMessage("Failed to submit feedback. Please try again."); // Hiển thị thông báo lỗi
    }
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View className="flex-1 justify-center items-center bg-opacity-50">
        <View className="bg-white p-5 rounded-lg w-4/5">
          <Text className="text-lg font-bold mb-4">Submit Feedback</Text>
          <StarRatingInput rating={rating} setRating={setRating} />
          <TextInput
            className="border border-gray-300 rounded p-2 mt-4 w-full"
            placeholder="Write your comment here..."
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
          />
          <TouchableOpacity
            className="bg-[#274a79] rounded-md p-2 mt-4"
            onPress={handleSubmit}
          >
            <Text className="text-white text-center">Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mt-2" onPress={onClose}>
            <Text className="text-center text-red-500">Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FeedbackModal;
