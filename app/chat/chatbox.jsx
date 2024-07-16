import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { Loader } from "../../components";
import { images } from "../../constants";
import { useLocalSearchParams, useNavigation } from "expo-router";
import useApi from "../../hooks/useApi";
import { getChatMessages, readMessages } from "../../api/messageService";
import { connectToMessageHub, sendMessage } from "../../api/signalRService";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";

const ChatBox = () => {
  const navigation = useNavigation();

  const { chatPartnerId, initialMentor } = useLocalSearchParams();
  const [newMessage, setNewMessage] = useState("");
  const [partner, setPartner] = useState({});
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);

  const parsedInitialMentor = JSON.parse(initialMentor);

  useLayoutEffect(() => {
    if (chatPartnerId) {
      navigation.setOptions({
        headerTitle: "Chat with Mentor",
        headerShown: true,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ padding: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color="#6adbd7" />
          </TouchableOpacity>
        ),
      });
    }
  }, [navigation, chatPartnerId]);

  const {
    data: { data: initialMessages },
    loading,
  } = useApi(() => getChatMessages(chatPartnerId));

  useEffect(() => {
    const initializeMessages = async () => {
      if (initialMessages && initialMessages.length > 0) {
        setMessages(initialMessages);
        if (flatListRef.current) {
          flatListRef.current.scrollToEnd({ animated: false });
        }
        // debugger;
        setPartner({
          senderName: initialMessages[0].senderName,
          avatar: initialMessages[0].senderPhotoUrl,
        });
        await readMessages(chatPartnerId);
      }
    };

    initializeMessages();
  }, [initialMessages, chatPartnerId]);

  useEffect(() => {
    const initializeSignalR = async () => {
      const connection = await connectToMessageHub((message) => {
        if (
          message.isSentByCurrentUser ||
          (!message.isSentByCurrentUser && message.senderId === chatPartnerId)
        ) {
          setMessages((prevMessages) => [...prevMessages, message]);
          if (flatListRef.current) {
            flatListRef.current.scrollToEnd({ animated: true });
          }
        }
      });
      return () => connection.stop();
    };

    initializeSignalR();
  }, [chatPartnerId]);

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

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const newMsg = {
        chatPartnerId,
        content: newMessage,
      };
      // Send the message to the SignalR hub
      await sendMessage(newMsg);
      // Clear the input field
      setNewMessage("");
    }
  };

  if (loading) return <Loader isLoading={loading} />;

  return (
    <SafeAreaView className="flex-1 h-full pt-5">
      {parsedInitialMentor && (
        <View className="px-4 shadow-md py-2 flex-row items-center mb-4 border-b border-primary sticky top-0 z-10">
          <Image
            source={
              parsedInitialMentor.profilePic
                ? { uri: parsedInitialMentor.profilePic }
                : images.avatar
            }
            className="w-12 h-12 rounded-full"
          />
          <Text className="ml-4 text-xl font-semibold text-gray-900">
            {parsedInitialMentor.fullName}
          </Text>
        </View>
      )}
      {messages.length !== 0 ? (
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.sentTime.toString()}
          className="flex-1 px-4"
          contentContainerStyle={{ paddingBottom: 20 }}
          onContentSizeChange={() =>
            flatListRef.current &&
            flatListRef.current.scrollToEnd({ animated: true })
          }
        />
      ) : (
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-600 italic">
            You have no chat messages with this mentor yet.
          </Text>
        </View>
      )}
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
