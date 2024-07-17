import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { AntDesign, Ionicons, Feather } from "@expo/vector-icons";

export default function AccountSetting() {
  return (
    <View className='bg-white flex-1'>
     <TouchableOpacity onPress={()=> router.navigate('profile/UpdateProfile')} className="flex flex-row items-center justify-between mx-10 mb-5 mt-6">
        <View className="flex flex-row items-center gap-4 ">
          <AntDesign
            name="user"
            size={25}
            style={{
              backgroundColor: "#6adbd7",
              width: 40,
              height: 40,
              borderRadius: 50,
              textAlign: "center",
              paddingTop: 6,
            }}
          />
          <Text className="text-lg">Update Profile</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={25} />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> router.navigate('profile/ChangePassword')} className="flex flex-row items-center justify-between mx-10 mb-5 mt-4">
        <View className="flex flex-row items-center gap-4 ">
          <Ionicons
            name="key-outline"
            size={25}
            style={{
              backgroundColor: "#6adbd7",
              width: 40,
              height: 40,
              borderRadius: 50,
              textAlign: "center",
              paddingTop: 6,
            }}
          />
          <Text className="text-lg">Change Password</Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={25} />
      </TouchableOpacity>
    </View>
  )
}