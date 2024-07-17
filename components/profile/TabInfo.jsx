import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5, Ionicons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

export default function TabInfo() {
  const handleMyProfilePress = () => {
    router.push({
      pathname: "profile/MyProfile"
    });
  }
  return (
    <View className="flex flex-row items-center justify-around bg-primary mx-7 mb-7 py-5 rounded-xl">
      <TouchableOpacity
         onPress={handleMyProfilePress}
        className="w-1/3 flex flex-col border-r-2 border-neutral-400 items-center justify-center"
      >
        <Feather name="user" color="white" size={30} />
        <Text className="text-neutral-200 text-base mt-1">Profile</Text>
      </TouchableOpacity>
      <View className="w-1/3 flex flex-col border-r-2 border-neutral-400 items-center justify-center">
        <Ionicons name="school-outline" color="white" size={30} />
        <Text className="text-neutral-200 text-base mt-1">My Mentors</Text>
      </View>

      <TouchableOpacity  onPress={() => router.navigate('(tabs)/application')} className="w-1/3 flex flex-col items-center justify-center">
        <Ionicons name="receipt-outline" color="white" size={30} />
        <Text className="text-neutral-200 text-base mt-1">Bookings</Text>
      </TouchableOpacity>

    </View>
  );
}
