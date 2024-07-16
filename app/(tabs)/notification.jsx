import React, { useCallback, useState } from "react";
import { View, Text, Image, FlatList, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useApi from "../../hooks/useApi";
import {
  getNotifications,
  markNotificationAsRead,
} from "../../api/notificationService";
import { Loader } from "../../components";
import { images } from "../../constants";
import { useFocusEffect } from "@react-navigation/native";

const NotificationItem = ({ senderAvatar, content, createdDate }) => {
  return (
    <View className="flex-row items-center p-4 bg-white rounded-lg shadow-md mb-4">
      <Image
        source={senderAvatar ? { uri: senderAvatar } : images.avatar}
        className="w-12 h-12 rounded-full border border-gray-300 mr-4"
      />
      <View className="flex-1">
        <Text className="text-base font-semibold text-gray-800">{content}</Text>
        <Text className="text-sm text-gray-500 mt-1">
          {new Date(createdDate).toLocaleString()}
        </Text>
      </View>
    </View>
  );
};

const Notification = () => {
  const { data, loading, refetch } = useApi(getNotifications);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      refetch();
      markNotificationAsRead();
    }, [])
  );

  if (loading) return <Loader isLoading={loading} />;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 p-4">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Notifications
        </Text>
        <FlatList
          data={data.data}
          keyExtractor={(item) => item.createdDate}
          renderItem={({ item }) => (
            <NotificationItem
              senderAvatar={item.senderAvatar}
              content={item.content}
              createdDate={item.createdDate}
            />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default Notification;
