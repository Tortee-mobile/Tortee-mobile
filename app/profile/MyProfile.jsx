import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Ionicons, FontAwesome,Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import useApi from "../../hooks/useApi";
import { getCurrentUser } from "../../api/userService";
import { router } from "expo-router";
import avatar from "../../assets/images/avatar.jpg";
import { images } from "../../constants";

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
    <View className="flex-1 bg-white">
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
            source={profile.profilePic ? { uri: profile.profilePic } : avatar}
            className="w-[120px] h-[120px] rounded-full"
          />

          <View className='flex flex-col pt-6 gap-y-2'>
          <Text className="text-primary text-xl tracking-wide font-semibold">
            {profile.fullName}
          </Text>
          <TouchableOpacity onPress={()=> router.navigate('profile/UpdateProfile')} >
            <Feather name="edit" size={20} color="#6adbd7" />
          </TouchableOpacity>
          </View>
          
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
