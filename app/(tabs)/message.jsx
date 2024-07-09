import React, { useState } from "react";
import { images } from "../../constants";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  TextInput,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import useApi from "../../hooks/useApi";
import { getAllChatBox } from "../../api/messageService";

const Message = () => {
  const [searchText, setSearchText] = useState("");
  const {
    data: { data: chatboxes },
  } = useApi(getAllChatBox);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const renderChatbox = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("chatbox", { chatPartnerId: item.chatPartnerId })
      }
    >
      <View className="flex-row items-center p-4 bg-white rounded-lg shadow-lg mb-3">
        <Image
          source={
            item.chatPartnerPhoto
              ? { uri: item.chatPartnerPhoto }
              : images.avatar
          }
          className="w-14 h-14 rounded-full"
        />
        <View className="ml-4 flex-1">
          <Text className="font-bold text-lg text-gray-900">
            {item.chatPartnerName}
          </Text>
          <Text className="text-gray-600">{item.messages[0].content}</Text>
        </View>
        {item.unreadMessages > 0 && (
          <View className="bg-red-500 rounded-full px-3 py-1 ml-auto">
            <Text className="text-white text-sm font-semibold">
              {item.unreadMessages}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-4">
        <Text className="text-2xl font-bold text-gray-900 mb-4">Messages</Text>
        <TextInput
          className="h-12 border border-gray-300 rounded-lg px-4 mb-6 bg-white shadow-sm"
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
        <FlatList
          data={chatboxes}
          renderItem={renderChatbox}
          keyExtractor={(item) => item.chatPartnerId.toString()}
          className="bg-transparent"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Message;
