import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import avatar from "../../assets/images/avatar.jpg";
import useApi from "../../hooks/useApi";
import { getCurrentUser, updateUser, uploadImage } from "../../api/userService";
import { router } from "expo-router";

const InputField = ({ label, placeholder, value, onChangeText, error }) => (
  <View className="mb-3 px-3">
    <Text className="mx-4 my-2 text-sm text-slate-700 font-medium">{label}</Text>
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      className="w-full bg-slate-100 flex flex-row border-[1px] border-slate-300 py-2 px-5 rounded-3xl text-base ml-3"
    />
    {error && <Text className="mx-4 my-1 text-sm text-red-500">{error}</Text>}
  </View>
);

export default function UpdateProfile() {
  const { data: profile, loading, refetch } = useApi(getCurrentUser);
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    bio: "",
    company: "",
    jobTitle: "",
  });
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.fullName,
        phoneNumber: profile.phoneNumber,
        bio: profile.bio,
        company: profile.company,
        jobTitle: profile.jobTitle,
      });
      setImage(profile.profilePic ? { uri: profile.profilePic } : avatar);
    }
  }, [profile]);

  const handleChange = (name, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async () => {
    let isValid = true;
    let newErrors = {};

    if (!form.fullName.trim()) {
      newErrors.fullName = "Full Name cannot be empty.";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
      await updateUser(form);
      Alert.alert("Success", "Profile updated successfully");
      refetch();
      router.navigate("profile/MyProfile");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      setImage({ uri: pickerResult.uri });
      try {
        await uploadImage(pickerResult.uri);
        refetch();
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#CC7861" />
      </View>
    );
  }

  return (
    <ScrollView className="flex flex-1 mx-auto my-auto py-4 bg-white w-full h-full">
      <View className="flex-1 items-center justify-center mx-auto w-full ">
        <View className="relative">
          <Image source={image} className="w-[120px] h-[120px] rounded-full" />
          <TouchableOpacity
            onPress={pickImage}
            className="absolute bottom-0 right-0 bg-primary p-2 rounded-full"
          >
            <Ionicons name="camera" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <Text className="font-semibold text-primary text-2xl tracking-wide mt-3">
          {profile.fullName}
        </Text>
        {profile.userRoles?.map((role) => (
          <View key={role.name} className="flex flex-row items-center tracking-wide mt-3 bg-[#B3FFAC] px-2 py-1 rounded-lg shadow-md">
            <Ionicons name="bonfire-outline" size={20} color="#2D6B22" />
            <Text className=" text-[#2D6B22] font-semibold tracking-wider ml-1">
              {role.name}
            </Text>
          </View>
        ))}
        <View className=" w-full mr-6 px-5">
          <InputField
            label="Full Name"
            placeholder="Full Name"
            value={form.fullName}
            onChangeText={(value) => handleChange("fullName", value)}
            error={errors.fullName}
          />
          <InputField
            label="Phone Number"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChangeText={(value) => handleChange("phoneNumber", value)}
          />
          <InputField
            label="Bio"
            placeholder="Bio"
            value={form.bio}
            onChangeText={(value) => handleChange("bio", value)}
          />
          <InputField
            label="Company"
            placeholder="Company"
            value={form.company}
            onChangeText={(value) => handleChange("company", value)}
          />
          <InputField
            label="Job Title"
            placeholder="Job Title"
            value={form.jobTitle}
            onChangeText={(value) => handleChange("jobTitle", value)}
          />
        </View>
        <TouchableOpacity
          className="mx-auto mt-3 bg-primary rounded-3xl"
          onPress={handleSubmit}
        >
          <Text className="text-xl text-white px-8 py-3 font-semibold tracking-wider">
            Update Profile
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
