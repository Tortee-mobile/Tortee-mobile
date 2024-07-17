import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { changePassword } from "../../api/userService";
import { router } from "expo-router";

const PasswordInput = ({ label, placeholder, secureTextEntry, onChangeText, toggleVisibility, icon, error }) => (
  <View className="my-3 px-3">
    <Text className="mx-4 my-2 text-lg text-slate-700 font-medium">{label}</Text>
    <View className="bg-slate-100 flex flex-row mx-3 border-[1px] border-slate-300 p-2.5 rounded-3xl">
      <TextInput
        placeholder={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        className="w-5/6 text-lg ml-3 text-slate-800"
      />
      <TouchableOpacity onPress={toggleVisibility} className="w-1/6">
        <Feather name={icon} size={24} color="black" />
      </TouchableOpacity>
    </View>
    {error && <Text className="mx-4 my-1 text-sm text-red-500">{error}</Text>}
  </View>
);

export default function ChangePassword() {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handlePasswordVisibility = () => {
    setRightIcon((prevIcon) => (prevIcon === "eye" ? "eye-off" : "eye"));
    setPasswordVisibility(!passwordVisibility);
  };

  const handleChange = (name, value) => {
    setForm({
      ...form,
      [name]: value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async () => {
    let isValid = true;
    let newErrors = {};

    if (!form.oldPassword.trim()) {
      newErrors.oldPassword = "Current Password cannot be empty.";
      isValid = false;
    }
    if (!form.newPassword.trim()) {
      newErrors.newPassword = "New Password cannot be empty.";
      isValid = false;
    }
    if (!form.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm New Password cannot be empty.";
      isValid = false;
    }
    if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = "New passwords do not match.";
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    try {
      await changePassword(form);
      Alert.alert("Success", "Password changed successfully");
      router.navigate("profile");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View className="flex mx-auto my-auto bg-white w-full h-full">
      <View className="mx-auto mt-6 w-full">
        <PasswordInput
          label="Current Password"
          placeholder="Current Password"
          secureTextEntry={passwordVisibility}
          onChangeText={(text) => handleChange("oldPassword", text)}
          toggleVisibility={handlePasswordVisibility}
          icon={rightIcon}
          error={errors.oldPassword}
        />
        <PasswordInput
          label="New Password"
          placeholder="New Password"
          secureTextEntry={passwordVisibility}
          onChangeText={(text) => handleChange("newPassword", text)}
          toggleVisibility={handlePasswordVisibility}
          icon={rightIcon}
          error={errors.newPassword}
        />
        <PasswordInput
          label="Confirm New Password"
          placeholder="Confirm New Password"
          secureTextEntry={passwordVisibility}
          onChangeText={(text) => handleChange("confirmPassword", text)}
          toggleVisibility={handlePasswordVisibility}
          icon={rightIcon}
          error={errors.confirmPassword}
        />
        <TouchableOpacity className="mx-auto mt-8 bg-primary rounded-3xl" onPress={handleSubmit}>
          <Text className="text-xl text-white px-8 py-3 font-semibold tracking-wider">
            Change Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
