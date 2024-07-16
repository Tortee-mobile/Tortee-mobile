import React from "react";
import { View, Text, StyleSheet } from "react-native";
import useApi from "../../hooks/useApi";
import { getAllMyMentees } from "../../api/workspaceService";

const MyMentees = () => {
  const { data, loading, refetch } = useApi(getAllMyMentees);
  console.log("MyMentees -> data", data);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello, World!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default MyMentees;
