import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { FontAwesome5, Ionicons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Menu() {
  return (
    <View>
      <TouchableOpacity onPress={()=> router.navigate('profile/AccountSetting')} className="flex flex-row items-center justify-between mx-10 mb-5">
        <View className="flex flex-row items-center gap-4 ">
          <Ionicons
            name="settings-outline"
            size={25}
            style={{
              backgroundColor: "#6adbd7",
              width: 40,
              height: 40,
              borderRadius: 50,
              textAlign: "center",
              paddingTop: 6,
            }}
          />
          <Text className="text-lg">Account Setting</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={25} />
      </TouchableOpacity>

      <View className="flex flex-row items-center justify-between mx-10 mb-5">
        <View className="flex flex-row items-center gap-4 ">
          <Ionicons
            name="shield-checkmark-outline"
            size={25}
            style={{
              backgroundColor: "#6adbd7",
              width: 40,
              height: 40,
              borderRadius: 50,
              textAlign: "center",
              paddingTop: 6,
            }}
          />
          <Text className="text-lg">Privacy Policy</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={25} />
      </View>

      <View className="flex flex-row items-center justify-between mx-10 mb-5">
        <View className="flex flex-row items-center gap-4 ">
          <Ionicons
            name="help-circle-outline"
            size={25}
            style={{
              backgroundColor: "#6adbd7",
              width: 40,
              height: 40,
              borderRadius: 50,
              textAlign: "center",
              paddingTop: 6,
            }}
          />
          <Text className="text-lg">Help</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={25} />
      </View>

      <View className="flex flex-row items-center justify-between mx-10 mb-5">
        <View className="flex flex-row items-center gap-4 ">
          <Ionicons
            name="log-out-outline"
            size={25}
            style={{
              backgroundColor: "#6adbd7",
              width: 40,
              height: 40,
              borderRadius: 50,
              textAlign: "center",
              paddingTop: 6,
            }}
          />
          <Text className="text-lg">Logout</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={25} />
      </View>
    </View>
  );
}
