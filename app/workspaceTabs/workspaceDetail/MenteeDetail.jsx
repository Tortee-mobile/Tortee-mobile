import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import useApi from "../../../hooks/useApi";
import { getMenteeId } from "../../../api/mentorService";
import { images } from "../../../constants";

const InfoRow = ({ icon, label, value }) => (
  <View className="flex flex-row justify-between mb-4">
    <View className="flex flex-row  gap-2 mr-2">
      <Ionicons name={icon} size={25} color="#274a79" />
      <Text className="text-primary font-semibold text-base">{label}</Text>
    </View>
    <Text className="text-base text-right">{value}</Text>
  </View>
);

const MenteeDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { menteeId } = route.params;

  const { data: menteeData, loading: loadingMentee } = useApi(
    () => getMenteeId(menteeId),
    [menteeId]
  );

  if (loadingMentee) {
    return (
      <View className="flex flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#CC7861" />
      </View>
    );
  }

  const mentee = menteeData?.data;

  return (
    <View className="flex-1 bg-white">
      <View className="bg-primary h-[150px] pt-12 px-6 flex flex-row">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="flex flex-row"
        >
          <Ionicons name="chevron-back-sharp" size={30} color="white" />
          <Text className="text-lg text-white ml-2">Mentee Detail</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white flex-1">
        <View className="px-5 flex flex-row items-center -top-10 gap-3 ">
          <Image
            source={
              mentee.profilePic
                ? {
                    uri: mentee.profilePic,
                  }
                : images.avatar // Replace with your default avatar image
            }
            className="w-[120px] h-[120px] rounded-full"
          />
          <Text className="text-primary text-xl tracking-wide font-semibold pt-6">
            {mentee.fullName}
          </Text>
        </View>

        <View className="px-8">
          <InfoRow
            icon="extension-puzzle-outline"
            label="Bio:"
            value={mentee.bio ? mentee.bio : "No bio yet"}
          />
          <InfoRow
            icon="mail-outline"
            label="Email:"
            value={mentee.email || "N/A"}
          />
          <InfoRow
            icon="call-outline"
            label="Phone:"
            value={mentee.phoneNumber || "N/A"}
          />
          <InfoRow
            icon="briefcase-outline"
            label="Job Title:"
            value={mentee.jobTitle || "N/A"}
          />
          <InfoRow
            icon="business"
            label="Company:"
            value={mentee.company || "N/A"}
          />
        </View>

        <View className="mt-7 mb-3 border-b-2 mx-8 pb-2 flex flex-row items-center">
          <Text className="uppercase text-2xl font-semibold mr-4">Skills</Text>
        </View>

        {mentee.userSkills.length > 0 ? (
          <View className="flex flex-row flex-wrap px-4">
            {mentee.userSkills.map((skill) => (
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
};

export default MenteeDetail;
