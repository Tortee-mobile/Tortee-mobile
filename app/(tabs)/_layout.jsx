import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Redirect, Tabs } from "expo-router";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "../../context/AuthContext";
import FlashMessage from "react-native-flash-message";
import { getTotalUnreadNotifications } from "../../api/notificationService";
import { Text } from "react-native";
import { apiConfig } from "../../config/apiConfig";
import * as SignalR from "@microsoft/signalr";

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
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const connection = new SignalR.HubConnectionBuilder()
      .withUrl(apiConfig.hubs.notificationHub)
      .configureLogging(SignalR.LogLevel.Information)
      .build();

    connection
      .start()
      .then(() => console.log("SignalR Connected"))
      .catch((err) =>
        console.log("Error while establishing SignalR connection:", err)
      );

    connection.on("ReceiveNotification", (notification) => {
      console.log("Notification received:", notification);
      setUnreadCount((prevCount) => prevCount + 1);
    });

    return () => {
      connection.stop();
    };
  }, []);

  useEffect(() => {
    const fetchUnreadNotifications = async () => {
      try {
        const response = await getTotalUnreadNotifications();
        setUnreadCount(response.data);
      } catch (error) {
        console.error("Error fetching unread notifications count:", error);
      }
    };

    fetchUnreadNotifications();
  }, []);

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
              <View className="items-center justify-center gap-1 relative">
                <Icon
                  name="notifications-outline"
                  size={24}
                  style={{ color: focused ? "#6adbd7" : "gray" }}
                />

                {unreadCount > 0 && (
                  <View className="absolute bottom-3 left-4 bg-red-600 rounded-full h-5 w-5 flex items-center justify-center">
                    <Text className="text-xs text-white font-bold">
                      {unreadCount}
                    </Text>
                  </View>
                )}
              </View>
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
