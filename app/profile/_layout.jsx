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
        <Stack.Screen
          name="UpdateProfile"
          options={{
            headerShown: true,
            headerTitle:"Update Profile",
            headerTitleAlign:"center"
          }}
        />
         <Stack.Screen
          name="AccountSetting"
          options={{
            headerShown: true,
            headerTitle:"Account Setting",
            headerTitleAlign:"center"
          }}
        />
        <Stack.Screen
          name="ChangePassword"
          options={{
            headerShown: true,
            headerTitle:"Change Password",
            headerTitleAlign:"center"
          }}
        />
      </Stack>

      <StatusBar style="light" />
    </>
  )
}

export default ProfileLayout
