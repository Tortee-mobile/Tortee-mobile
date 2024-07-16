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
} from "react-native";
import useApi from "../../hooks/useApi";
import { getAllChatBox } from "../../api/messageService";
import { connectToMessageHub } from "../../api/signalRService";
import { SafeAreaView } from "react-native-safe-area-context";
import { getMentorId } from "../../api/mentorService";

const Message = () => {
  const [searchText, setSearchText] = useState("");
  const [chatboxes, setChatboxes] = useState([]);
  const { data, loading, refetch } = useApi(getAllChatBox);
  const [refreshing, setRefreshing] = useState(false);

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

  if (loading) return <Loader isLoading={loading} />;

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="p-6">
        <Text className="text-2xl font-bold text-gray-900 mb-4">Messages</Text>
        <TextInput
          className="h-12 border border-gray-300 rounded-lg px-4 mb-6 bg-white shadow-sm"
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
        <FlatList
          data={chatboxes}
          renderItem={({ item }) => (
            <ChatboxItem item={item} refetch={refetch} />
          )}
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

const ChatboxItem = ({ item, refetch }) => {
  const { data: initialMentorData, loading: loadingMentor } = useApi(
    () => getMentorId(item.chatPartnerId),
    [item.chatPartnerId]
  );
  const initialMentor = initialMentorData?.data;

  const handleChatboxPress = () => {
    refetch(); // Refetch to reset unread count
    router.push({
      pathname: "chat/chatbox",
      params: {
        chatPartnerId: item.chatPartnerId,
        initialMentor: JSON.stringify(initialMentor),
      },
    });
  };

  if (loadingMentor) return null; // Handle loading state

  return (
    <TouchableOpacity onPress={handleChatboxPress}>
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
};

export default Message;
