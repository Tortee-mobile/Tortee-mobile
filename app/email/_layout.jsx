import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";

const EmailLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="email-confirmation"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar style="light" />
    </>
  );
};

export default EmailLayout;
