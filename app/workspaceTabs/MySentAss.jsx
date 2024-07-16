import React from "react";
import { View, Text } from "react-native";
import useApi from "../../hooks/useApi";
import { getAllMySentAss } from "../../api/workspaceService";

const MySentAss = () => {
  const { data, loading, refetch } = useApi(getAllMySentAss);
  console.log("MySentAss -> data", data);
  return (
    <View>
      <Text>Hello, World!</Text>
    </View>
  );
};

export default MySentAss;
