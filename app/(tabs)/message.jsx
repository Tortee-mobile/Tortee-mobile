import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  TextInput,
} from "react-native";

const Message = () => {
  const [searchText, setSearchText] = useState("");

  // Dummy data for chatboxes
  const chatboxes = [
    {
      id: 1,
      avatar: require("../../assets/images/logo.png"),
      name: "John Doe",
      latestMessage: "Hello, how are you?",
      unreadMessages: 2,
    },
    {
      id: 2,
      avatar: require("../../assets/images/logo.png"),
      name: "Jane Smith",
      latestMessage: "Hey, what's up?",
      unreadMessages: 0,
    },
    // Add more chatboxes as needed
  ];

  const renderChatbox = ({ item }) => (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
      }}
    >
      <Image
        source={item.avatar}
        style={{ width: 50, height: 50, borderRadius: 25 }}
      />
      <View style={{ marginLeft: 10 }}>
        <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
        <Text>{item.latestMessage}</Text>
      </View>
      {item.unreadMessages > 0 && (
        <View
          style={{
            backgroundColor: "red",
            borderRadius: 10,
            paddingHorizontal: 5,
            marginLeft: "auto",
          }}
        >
          <Text style={{ color: "white" }}>{item.unreadMessages}</Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="mx-4 my-12">
      <View style={{ padding: 10 }}>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            paddingHorizontal: 10,
            marginBottom: 10,
          }}
          placeholder="Search"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <FlatList
        data={chatboxes}
        renderItem={renderChatbox}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default Message;
