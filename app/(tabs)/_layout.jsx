import { View } from "react-native";
import React from "react";
import { Redirect, Tabs } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "../../context/AuthContext";
import FlashMessage from "react-native-flash-message";

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
  const { loading, user } = useAuth();

  if (!loading && !user) return <Redirect href="/sign-in" />;
  return (
    <View style={{ flex: 1 }}>
      <FlashMessage position="left" />
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
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="home-outline" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="workspace"
          options={{
            title: "Workspace",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="briefcase-outline" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="application"
          options={{
            title: "Application",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="apps-outline" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="message"
          options={{
            title: "Messages",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="chatbubble-outline" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="notification"
          options={{
            title: "Notifications",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="notifications-outline" focused={focused} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <TabIcon icon="person-outline" focused={focused} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabsLayout;
