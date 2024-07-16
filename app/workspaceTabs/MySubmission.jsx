import React from "react";
import { View, Text } from "react-native";
import { getAllMySubmition } from "../../api/workspaceService";
import useApi from "../../hooks/useApi";

const MySubmission = () => {
  const { data, loading, refetch } = useApi(getAllMySubmition);
  console.log("MySubmission -> data", data);

  return (
    <View>
      <Text>Hello, world!</Text>
    </View>
  );
};

export default MySubmission;
