import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { images } from "../../constants";
import { useLocalSearchParams } from "expo-router";
import useApi from "../../hooks/useApi";
import { getChatMessages } from "../../api/messageService";
import dayjs from "dayjs"; // Import dayjs for formatting date

const ChatBox = () => {
  const { chatPartnerId } = useLocalSearchParams();
  const [newMessage, setNewMessage] = useState("");
  const [partner, setPartner] = useState({});
  const {
    data: { data: messages },
  } = useApi(() => getChatMessages(chatPartnerId));
  const flatListRef = useRef(null);

  useEffect(() => {
    if (messages && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
      setPartner({
        senderName: messages[0].senderName,
        avatar: messages[0].senderPhotoUrl,
      });
    }
  }, [messages]);

  const renderMessage = ({ item }) => (
    <View
      className={`flex items-start p-3 mb-2 rounded-3xl max-w-[80%] ${
        item.isSentByCurrentUser
          ? "self-end bg-primary"
          : "self-start bg-secondary"
      }`}
    >
      <Text
        className={`text-sm ${
          item.isSentByCurrentUser ? "text-white" : "text-primary"
        }`}
      >
        {item.content}
      </Text>
      <Text className="text-[9px] text-gray-400 ml-2 self-end">
        {dayjs(item.sentTime).format("YYYY-MM-DD HH:mm:ss")}
      </Text>
    </View>
  );

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Send the message to the API
      // Update the local state
      const newMsg = {
        id: Date.now(),
        content: newMessage,
        sentTime: new Date().toISOString(),
        isSentByCurrentUser: true,
      };
      setMessages((prevMessages) => [...prevMessages, newMsg]);
      setNewMessage("");
    }
  };

  return (
    <SafeAreaView className="flex-1 h-full bg-white">
      <View className="bg-white px-4 shadow-md py-2 flex-row items-center mb-4 border-b border-primary sticky top-0 z-10">
        <Image
          source={partner.avatar ? { uri: partner.avatar } : images.avatar}
          className="w-12 h-12 rounded-full"
        />
        <Text className="ml-4 text-xl font-semibold text-gray-900">
          {partner.senderName}
        </Text>
      </View>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.sentTime.toString()}
        className="flex-1 px-4"
        contentContainerStyle={{ paddingBottom: 20 }}
        onContentSizeChange={() =>
          flatListRef.current.scrollToEnd({ animated: true })
        }
      />
      <View className="flex-row items-center px-4 py-4 bg-white">
        <TextInput
          className="flex-1 h-12 border border-gray-300 rounded-full px-4 bg-white shadow-sm"
          placeholder="Type a message"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity
          onPress={handleSendMessage}
          className="ml-2 bg-primary rounded-full px-4 py-2"
        >
          <Text className="text-white font-semibold">Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatBox;
