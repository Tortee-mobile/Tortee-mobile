import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Banner = ({ title }) => {
  return (
    <View style={styles.banner}>
      <Text style={styles.bannerText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: "#6adbd7",
    borderRadius: 10,
    boxShadow: "5px 5px 10px #274a79", // Không hỗ trợ box-shadow trong React Native
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    elevation: 5, // Để tạo hiệu ứng bóng
  },
  bannerText: {
    color: "#274a79",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Banner;
