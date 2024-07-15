import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const ProfileLayout = () => {
  return (
    <>
      <Stack >        
        <Stack.Screen
          name="MyProfile"
          options={{
            headerShown: false,
            headerTitle:"Profile"
          }}
        />
        <Stack.Screen
          name="UpdateSkill"
          options={{
            headerShown: true,
            headerTitle:"Add Your Skills"
          }}
        />
      </Stack>

      <StatusBar style="light" />
    </>
  )
}

export default ProfileLayout
