import React, { useEffect, useState } from "react";
import { images } from "../../constants";
import { Loader } from "../../components";
import { router } from "expo-router";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  RefreshControl,
  TouchableOpacity,
  Pressable,
} from "react-native";
import useApi from "../../hooks/useApi";
import { getAllChatBox, searchChat } from "../../api/messageService";
import { connectToMessageHub } from "../../api/signalRService";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Message = () => {
  const [searchText, setSearchText] = useState("");
  const [chatboxes, setChatboxes] = useState([]);
  const { data, loading, refetch } = useApi(getAllChatBox);
  const [refreshing, setRefreshing] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  console.log("searchResults", searchResults);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useEffect(() => {
    if (data && data.data) {
      setChatboxes(data.data);
    }
  }, [data]);

  useEffect(() => {
    const initializeSignalR = async () => {
      const connection = await connectToMessageHub(async (message) => {
        await refetch();
      });
      return () => connection.stop();
    };

    initializeSignalR();
  }, []);

  const handleChatboxPress = (
    chatPartnerId,
    chatPartnerPhoto,
    chatPartnerName
  ) => {
    setChatboxes((prevChatboxes) =>
      prevChatboxes.map((chatbox) =>
        chatbox.chatPartnerId === chatPartnerId
          ? { ...chatbox, unreadCount: 0 }
          : chatbox
      )
    );
    router.push({
      pathname: "chat/chatbox",
      params: { chatPartnerId, chatPartnerPhoto, chatPartnerName },
    });
  };

  const renderChatbox = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        handleChatboxPress(
          item.chatPartnerId,
          item.chatPartnerPhoto || "",
          item.chatPartnerName
        )
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
          {item.messages && (
            <Text className="text-gray-600">{item.messages[0].content}</Text>
          )}
        </View>
        {item.unreadCount > 0 && (
          <View className="bg-red-500 rounded-full px-3 py-1 ml-auto">
            <Text className="text-white text-sm font-semibold">
              {item.unreadCount}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const handleSearch = async () => {
    if (searchText) {
      const results = await searchChat(searchText);
      setSearchResults(results.data); // Giả sử bạn lấy dữ liệu từ API và lưu vào state
    } else {
      setSearchResults(chatboxes); // Nếu không có từ khóa tìm kiếm, hiển thị tất cả
    }
  };

  const handleResetSearch = () => {
    setSearchText(""); // Reset search text
    setSearchResults([]); // Clear search results
  };

  if (loading) return <Loader isLoading={loading} />;

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-6 flex-1">
        <Text className="text-2xl font-bold text-gray-900 mb-4">Messages</Text>
        <View className="flex-row mb-6">
          <TextInput
            className="h-12 border border-gray-300 rounded-lg px-4 flex-1 bg-white shadow-sm"
            placeholder="Search Name User..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <Pressable
            onPress={handleSearch}
            className="h-12 w-12 justify-center items-center bg-blue-500 rounded-lg ml-2"
          >
            <Ionicons name="search" size={20} color="white" />
          </Pressable>
          {searchResults.length > 0 && (
            <Pressable
              onPress={handleResetSearch}
              className="h-12 w-12 justify-center items-center bg-red-500 rounded-lg ml-2"
            >
              <Ionicons name="close" size={20} color="white" />
            </Pressable>
          )}
        </View>
        <Text className="text-gray-600 my-3">
          Total {chatboxes?.length || 0} user chat with you!
        </Text>
        <FlatList
          data={searchResults.length > 0 ? searchResults : chatboxes}
          renderItem={renderChatbox}
          keyExtractor={(item) => item.chatPartnerId.toString()}
          className="bg-transparent flex-1"
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Message;
