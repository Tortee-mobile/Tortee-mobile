import React from "react";
import { View, Text } from "react-native";
import useApi from "../../hooks/useApi";
import { getAllMyFeedback } from "../../api/workspaceService";

const SentFeedback = () => {
  const { data, loading, refetch } = useApi(getAllMyFeedback);
  console.log("SentFeedback -> data", data);

  return (
    <View>
      <Text>Sent Feedback</Text>
    </View>
  );
};

export default SentFeedback;
