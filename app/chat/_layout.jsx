import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const ChatLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="chatbox"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar style="light" />
    </>
  );
};

export default ChatLayout;
