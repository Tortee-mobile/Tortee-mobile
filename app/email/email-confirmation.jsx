import React from "react";
import { View, Text, Image, Button } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";

const EmailConfirmation = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full flex justify-center h-full px-4 my-6 items-center">
        <Image
          source={images.email}
          resizeMode="contain"
          className="w-[150px] h-[150px]"
        />
        <Text className="text-2xl font-semibold text-white mt-10">
          Confirm Your Email
        </Text>
        <Text className="text-lg text-gray-100 text-center mt-4">
          We've sent an email to your inbox. Please check your email and follow
          the instructions to confirm your account.
        </Text>
        <View className="mt-10">
          <Link href="/sign-in" className="text-lg text-secondary">
            Back to Sign In
          </Link>
        </View>
        {/* <Button
          title="Resend Confirmation Email"
          onPress={() => {
            // Logic to resend confirmation email
          }}
          color="#1E90FF"
          className="mt-6"
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default EmailConfirmation;
