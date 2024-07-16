import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { NativeWindStyleSheet } from "nativewind";
import { ChatProvider } from "../context/ChatContext";

NativeWindStyleSheet.setOutput({
  default: "native",
});

const RootLayout = () => {
  return (
    <AuthProvider>
      <ChatProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        </Stack>
      </ChatProvider>
    </AuthProvider>
  );
};

export default RootLayout;
