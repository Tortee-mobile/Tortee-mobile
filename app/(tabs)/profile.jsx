import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TabInfo from "../../components/profile/TabInfo";
import Menu from "../../components/profile/Menu";
import useApi from "../../hooks/useApi";
import { getCurrentUser } from "../../api/userService";
import { Ionicons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import avatar from "../../assets/images/avatar.jpg";

const Profile = () => {
  const { data: profile, loading } = useApi(getCurrentUser);
  const handleUpdateProfilePress = () => {
    router.push({
      pathname: "profile/UpdateProfile"
    });
  }
  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="flex flex-col items-center justify-center my-4">
        <View className="flex flex-row items-center justify-center mb-2 pb-3 w-full">
          <Text className="text-xl font-semibold text-center flex-1">
            My Profile
          </Text>

          <TouchableOpacity onPress={handleUpdateProfilePress} className="absolute right-8 pb-4">
            <Feather name="edit" size={30} color="#6adbd7" />
          </TouchableOpacity>
        </View>

        <Image
          source={profile.profilePic ? { uri: profile.profilePic } : avatar}
          className="w-[120px] h-[120px] rounded-full"
        />
        <Text className="font-semibold text-primary text-2xl tracking-wide mt-3">
          {profile.fullName}
        </Text>

        {profile.userRoles?.map((role) => (
          <View className="flex flex-row items-center tracking-wide my-3 bg-[#B3FFAC] px-2 py-1 rounded-lg shadow-md">
            <Ionicons name="bonfire-outline" size={20} color="#2D6B22" />
            <Text
              key={role.id}
              className=" text-[#2D6B22] font-semibold tracking-wider ml-1"
            >
              {role.name}
            </Text>
          </View>
        ))}
      </View>
      <TabInfo />
      <Menu />
    </SafeAreaView>
  );
};

export default Profile;
