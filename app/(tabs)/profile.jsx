import { Text, View } from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { logout } = useAuth();
  return (
    <CustomButton
      handlePress={logout}
      title="Log out"
      containerStyles="flex-7 item-center justify-center"
    ></CustomButton>
  );
};

export default Profile;
