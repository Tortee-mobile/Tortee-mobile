import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  RefreshControl,
} from "react-native";
import {
  getMenteeApplicationsSent,
  getMenteeApplicationsReceived,
} from "../../api/applicationService";
import { Loader } from "../../components";
import { images } from "../../constants";
import { router } from "expo-router";
import dayjs from "dayjs";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { Title } from "react-native-paper";

const Application = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState(
    user?.userRoles?.map((ur) => ur.name).includes("Mentor")
      ? "received"
      : "sent"
  );
  const [sentApplications, setSentApplications] = useState([]);
  const [receivedApplications, setReceivedApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [expandedIds, setExpandedIds] = useState(new Set());

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchApplications();
    setRefreshing(false);
  };

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        if (user?.userRoles?.map((ur) => ur.name).includes("Mentee")) {
          const sentApps = await getMenteeApplicationsSent();
          setSentApplications(sentApps.data.data);
        }
        if (user?.userRoles?.map((ur) => ur.name).includes("Mentor")) {
          const receivedApps = await getMenteeApplicationsReceived();
          setReceivedApplications(receivedApps.data.data);
        }
      } catch (error) {
        if (error.response && error.response.status === 403) {
          Alert.alert("Error", "You do not have the required permissions.");
        } else {
          Alert.alert(
            "Error",
            "An error occurred while fetching applications."
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user?.userRoles]);

  const toggleExpand = (applicationId) => {
    setExpandedIds((prev) => {
      const newIds = new Set(prev);
      if (newIds.has(applicationId)) {
        newIds.delete(applicationId);
      } else {
        newIds.add(applicationId);
      }
      return newIds;
    });
  };

  const handleApplicationClick = (applicationId) => {
    router.push({
      pathname: "applications/application-detail",
      params: { id: applicationId },
    });
  };

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  const applications =
    filter === "sent" ? sentApplications : receivedApplications;

  return (
    <SafeAreaView className="flex-1 bg-secondary/20 p-4 pt-0 pb-0">
      <View className="flex-row justify-center mb-4 mt-5">
        {user?.userRoles?.map((ur) => ur.name).includes("Mentee") && (
          <TouchableOpacity
            className={`py-2 px-4 rounded-2xl border mx-2 ${
              filter === "sent"
                ? "bg-secondary border-white"
                : "border-gray-300"
            }`}
            onPress={() => setFilter("sent")}
          >
            <Text
              className={`${
                filter === "sent" ? "text-primary" : "text-primary"
              }`}
            >
              Sent Applications
            </Text>
          </TouchableOpacity>
        )}

        {user?.userRoles?.map((ur) => ur.name).includes("Mentor") && (
          <TouchableOpacity
            className={`py-2 px-4 rounded-2xl border mx-2 ${
              filter === "received"
                ? "bg-secondary border-white"
                : "border-gray-300"
            }`}
            onPress={() => setFilter("received")}
          >
            <Text
              className={`${
                filter === "received" ? "text-primary" : "text-primary"
              }`}
            >
              Received Applications
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <Text className="text-gray-600 my-3 font-semibold">
        Total {applications?.length || 0} applications sent
      </Text>
      <ApplicationList
        applications={applications}
        loading={loading}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onApplicationClick={handleApplicationClick}
        expandedIds={expandedIds}
        toggleExpand={toggleExpand}
        filter={filter}
      />
    </SafeAreaView>
  );
};

const ApplicationList = ({
  applications,
  loading,
  refreshing,
  onRefresh,
  onApplicationClick,
  expandedIds,
  toggleExpand,
  filter,
}) => {
  const [visible, setVisible] = useState(3); // Initial number of items to show

  const handleLoadMore = () => {
    if (applications.length > visible) {
      setVisible((prevVisible) => prevVisible + 3); // Load more items
    }
  };

  const renderFooter = () => {
    if (visible >= applications.length) {
      return null; // Don't show "Load More" if no more items
    }

    return (
      <TouchableOpacity
        className="bg-[#274a79] rounded-md p-1 text-center w-[40%] mt-4 mx-auto"
        onPress={handleLoadMore}
      >
        <Title className="text-white text-center text-sm font-semibold">
          Xem thêm
        </Title>
      </TouchableOpacity>
    );
  };

  const renderApplicationItem = ({ item }) => {
    // Your existing renderApplicationItem logic here
    const avatar = item.user?.profilePic || item.mentor.profilePic;
    const name = item.user?.fullName || item.mentor.fullName;
    const email = item.user?.email || item.mentor.email;
    const bio = item.user?.bio || item.mentor.bio;
    const company = item.user?.company || item.mentor.company;
    const jobTitle = item.user?.jobTitle || item.mentor.jobTitle;
    const planDescription = item.menteePlan.descriptionOfPlan;
    const price = item.price;
    const planDetails = `Calls per Month: ${item.menteePlan.callPerMonth}
Duration of Meeting: ${item.menteePlan.durationOfMeeting} mins
Remaining Slots: ${item.menteePlan.remainSlot}`;

    return (
      <TouchableOpacity
        className="flex-row bg-white p-4 pt-3 rounded-lg mb-4 shadow-md"
        onPress={() => onApplicationClick(item.id)}
      >
        <Image
          source={avatar ? { uri: avatar } : images.avatar}
          className="w-32 h-32 rounded-md my-4 mr-4"
        />
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-700">{name}</Text>
          <Text className="text-xs text-gray-400">
            Applied Date: {dayjs(item.appliedDate).format("YYYY-MM-DD")}
          </Text>
          <Text className="text-sm text-gray-700 mt-2">{email}</Text>
          {company && (
            <Text className="text-sm text-gray-700 mt-1">
              Company: {company}
            </Text>
          )}
          {jobTitle && (
            <Text className="text-sm text-gray-700 mt-1">Job: {jobTitle}</Text>
          )}
          {filter === "sent" && (
            <>
              <TouchableOpacity
                onPress={() => toggleExpand(item.id)}
                className="flex-row "
              >
                <View className="flex-row items-center">
                  <Text className="font-medium text-sm underline">
                    Plan of mentor:{" "}
                  </Text>
                  {expandedIds.has(item.id) ? (
                    <Text className="ml-3">-</Text>
                  ) : (
                    <Text className="ml-3">+</Text>
                  )}
                </View>
              </TouchableOpacity>
              {expandedIds.has(item.id) && (
                <View>
                  <Text className="text-sm text-gray-700 mt-1">
                    Description: {planDescription}
                  </Text>
                  <Text className="text-sm text-gray-700">{planDetails}</Text>
                </View>
              )}
            </>
          )}
          <Text className="text-sm text-gray-700 mt-1">
            Application status: {item.status}
          </Text>
          <Text className="text-lg font-bold text-green-600 mt-1">
            {price.toLocaleString()} vnd
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={applications.slice(0, visible)} // Show only visible items
      renderItem={renderApplicationItem}
      keyExtractor={(item) => item.id.toString()}
      className="flex-1"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListFooterComponent={renderFooter}
    />
  );
};

export default Application;
