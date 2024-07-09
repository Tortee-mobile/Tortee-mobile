import { View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
//import { useAuth } from "../../context/AuthContext";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center gap-1">
      <Icon
        name={icon}
        size={24}
        style={{ color: focused ? "#6adbd7" : "gray" }}
      />
    </View>
  );
};

const TabsLayout = () => {
  // const { loading, user } = useAuth();

  // if (!loading && !user) return <Redirect href="/sign-in" />;
  return (
    <Tabs
      className="bg-primary"
      screenOptions={{
        tabBarLabelStyle: { fontSize: 9 },
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#6adbd7",
        tabBarStyle: {
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              icon="home-outline"
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="workspace"
        options={{
          title: "Workspace",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              icon="briefcase-outline"
              color={color}
              name="Workspace"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="application"
        options={{
          title: "Application",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              icon="apps-outline"
              color={color}
              name="Application"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: "Messages",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              icon="chatbubble-outline"
              color={color}
              name="Messages"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notification"
        options={{
          title: "Notifications",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              icon="notifications-outline"
              color={color}
              name="Notifications"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              icon="person-outline"
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
