import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const StarRatingInput = ({ rating, setRating }) => {
  const stars = Array(5)
    .fill(0)
    .map((_, index) => (
      <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
        <Ionicons
          name={index < rating ? "star" : "star-outline"}
          size={24}
          color={index < rating ? "#FFD700" : "#ccc"}
        />
      </TouchableOpacity>
    ));

  return <View className="flex-row">{stars}</View>;
};

export default StarRatingInput;
