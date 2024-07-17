import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Linking } from "react-native";
import useApi from "../../hooks/useApi";
import { getAllMyMentees } from "../../api/workspaceService";
import { Button, Card, Modal, Portal, Title } from "react-native-paper";
import { useNavigation } from "expo-router";

const MyMentees = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const { data, loading, refetch } = useApi(getAllMyMentees);
  console.log("MyMentees -> data", data);

  return (
    <View className="flex-1 p-4 ">
      <Text className="text-sm font-semibold text-gray-800 mb-4">
        Total my mentees: ({data?.data?.length || 0})
      </Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : data?.data.length > 0 ? (
        data?.data.map((mentee) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                "workspaceTabs/workspaceDetail/MenteeDetail",
                {
                  menteeId: mentee.id,
                }
              )
            }
            key={mentee.id}
            className="bg-white p-4 rounded-lg shadow-lg mb-4 w-full flex-row items-center"
          >
            <Image
              source={{
                uri: mentee?.profilePic
                  ? mentee?.profilePic
                  : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1725655669.jpg",
              }}
              className="w-24 h-24 rounded-md mr-4"
            />
            <View>
              <Text
                className="text-lg font-bold text-[#274a79]"
                onPress={() =>
                  navigation.navigate(
                    "workspaceTabs/workspaceDetail/MenteeDetail",
                    {
                      menteeId: mentee.id,
                    }
                  )
                }
              >
                {mentee.fullName}
              </Text>
              <Text className="text-sm text-gray-600 ">{mentee.email}</Text>
              <Text className="text-sm text-gray-600">{mentee.jobTitle}</Text>
              <TouchableOpacity
                onPress={showModal}
                className="bg-[#274a79] rounded-md p-1 text-center w-full mt-4"
              >
                <Title className="text-white text-center text-xs font-semibold">
                  + Add Assignment
                </Title>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View className="bg-white p-4 rounded-lg shadow-lg mb-4 w-full">
          <Text className="text-gray-700 text-center">
            You have not connected with any mentees!
          </Text>
        </View>
      )}
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          backgroundColor: "white",
          padding: 20,
          margin: 20,
          borderRadius: 10,
        }}
      >
        <View>
          <Text className="text-center">Please visit the website Tỏ Tê: </Text>
          <Text
            className=" text-center text-blue-600 underline"
            onPress={() => {
              Linking.openURL("https://feexe.vercel.app/mentor/workspace");
            }}
          >
            Add Assignment
          </Text>
          <Text className="text-center">
            to create assignments for your mentee!
          </Text>
          <Text
            className="p-2 bg-[#274a79] rounded-md text-white font-semibold text-center my-4"
            onPress={hideModal}
          >
            Close
          </Text>
        </View>
      </Modal>
    </View>
  );
};

export default MyMentees;
