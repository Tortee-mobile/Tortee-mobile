import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Touchable,
} from "react-native";
import React from "react";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useApi from "../../hooks/useApi";
import { getCurrentUser } from "../../api/userService";
import { router } from "expo-router";

const InfoRow = ({ icon, label, value }) => (
  <View className="flex flex-row justify-between mb-4">
    <View className="flex flex-row items-center gap-2">
      <Ionicons name={icon} size={25} color="#274a79" />
      <Text className="text-primary font-semibold text-base">{label}</Text>
    </View>
    <Text className="text-base">{value}</Text>
  </View>
);

export default function MyProfile() {
  const navigation = useNavigation();
  const { data: profile, loading } = useApi(getCurrentUser);

  if (loading) {
    return (
      <View className="flex flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#CC7861" />
      </View>
    );
  }

  const handleUpdateSkillPress = () => {
    router.push({
      pathname: "profile/UpdateSkill",
    });
  };

  return (
    <View className='flex-1 bg-white'>
      <View className="bg-primary h-[150px] pt-12 px-6 flex flex-row">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex flex-row"
        >
          <Ionicons name="chevron-back-sharp" size={30} color="white" />
          <Text className="text-lg text-white ml-2">Profile</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white flex-1">
        <View className="px-5 flex flex-row items-center -top-10 gap-3 ">
          <Image
            source={{
              uri: profile.profilePic
                ? profile.profilePic
                : "data:image/jpeg;base64,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",
            }}
            className="w-[120px] h-[120px] rounded-full"
          />
          <Text className="text-primary text-xl tracking-wide font-semibold pt-6">
            {profile.fullName}
          </Text>
        </View>

        <View className="px-8">
          <InfoRow
            icon="extension-puzzle-outline"
            label="Bio:"
            value={profile.bio ? profile.bio : "No bio yet"}
          />
          <InfoRow
            icon="mail-outline"
            label="Email:"
            value={profile.email || "N/A"}
          />
          <InfoRow
            icon="call-outline"
            label="Phone:"
            value={profile.phoneNumber || "N/A"}
          />
          <InfoRow
            icon="briefcase-outline"
            label="Job Title:"
            value={profile.jobTitle || "N/A"}
          />
          <InfoRow
            icon="business"
            label="Company:"
            value={profile.company || "N/A"}
          />
        </View>

        <View className="mt-7 mb-3 border-b-2 mx-8 pb-2 flex flex-row items-center">
          <Text className="uppercase text-2xl font-semibold mr-4">Skills</Text>
          <TouchableOpacity onPress={handleUpdateSkillPress}>
            <Ionicons
              name="add-sharp"
              size={26}
              color="black"
              style={{
                backgroundColor: "#6adbd7",
                width: 40,
                height: 40,
                borderRadius: 50,
                textAlign: "center",
                paddingTop: 6,
              }}
            />
          </TouchableOpacity>
        </View>

        {profile.userSkills.length > 0 ? (
          <View className="flex flex-row flex-wrap px-4">
            {profile.userSkills.map((skill) => (
              <Text
                key={skill.id}
                className="bg-slate-200 text-primary font-semibold mx-2 mt-3 p-2 text-center rounded-xl shadow-lg"
              >
                {skill.skillName}
              </Text>
            ))}
          </View>
        ) : (
          <View className="flex flex-col items-center justify-center my-4 py-8">
            <FontAwesome name="inbox" size={60} color="#9197B3" />
            <Text className="mt-3 text-lg italic text-red-400">
              Skills not added yet
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
