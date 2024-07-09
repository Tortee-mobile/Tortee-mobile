import React, { useEffect, useState } from "react";
import { View, TextInput, Button, FlatList, Text } from "react-native";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const Chat = () => {
  const [connection, setConnection] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [receiverId, setReceiverId] = useState(""); // Set receiverId accordingly
  const connectToMessageHub = async () => {
    const token = await AsyncStorage.getItem("jwtToken");

    const connection = new HubConnectionBuilder()
      .withUrl("https://totevn.azurewebsites.net/chathub", {
        accessTokenFactory: () => token,
      })
      .configureLogging(LogLevel.Information)
      .build();

    connection.on("ReceiveMessage", (message) => {
      console.log("New message received:", message);
      // Handle the received message here
    });

    try {
      await connection.start();
      console.log("Connected to SignalR MessageHub");
    } catch (error) {
      console.error("SignalR Connection Error: ", error);
    }

    return connection;
  };
  const sendMessage = async (connection, receiverId, messageContent) => {
    if (connection) {
      try {
        await connection.invoke("SendMessage", receiverId, messageContent);
      } catch (error) {
        console.error("Send Message Error: ", error);
      }
    }
  };

  useEffect(() => {
    const initializeConnection = async () => {
      const conn = await connectToMessageHub();
      conn.on("ReceiveMessage", (receivedMessage) => {
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
      setConnection(conn);
    };

    initializeConnection();

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);

  const handleSendMessage = async () => {
    await sendMessage(connection, receiverId, message);
    setMessage("");
  };

  const renderMessageItem = ({ item }) => (
    <View
      className={`p-3 my-2 rounded ${
        item.IsSentByCurrentUser
          ? "self-end bg-green-200"
          : "self-start bg-gray-200"
      }`}
    >
      <Text className="font-bold">{item.SenderName}</Text>
      <Text>{item.Content}</Text>
      <Text className="text-xs text-gray-500">
        {new Date(item.SentTime).toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item) => item.Id.toString()}
        className="flex-1"
      />
      <View className="flex-row items-center mt-2">
        <TextInput
          className="flex-1 p-2 border border-gray-300 rounded"
          placeholder="Type your message"
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={handleSendMessage} />
      </View>
    </View>
  );
};

export default Chat;
