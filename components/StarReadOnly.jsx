import React from "react";
import { Ionicons } from "@expo/vector-icons"; // Add this import
import { View } from "react-native-web";

const StarRating = ({ rating }) => {
  const stars = Array(5)
    .fill(0)
    .map((_, index) => (
      <Ionicons
        key={index}
        name={index < rating ? "star" : "star-outline"}
        size={16}
        color={index < rating ? "#FFD700" : "#ccc"}
      />
    ));

  return <View style={{ flexDirection: "row" }}>{stars}</View>;
};

export default StarRating;
