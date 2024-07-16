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
import { useAuth } from "../../context/AuthContext";
import {
  getMenteeApplicationsSent,
  getMenteeApplicationsReceived,
} from "../../api/applicationService";
import { Loader } from "../../components";
import { images } from "../../constants";
import { router } from "expo-router";
import dayjs from "dayjs";
import { SafeAreaView } from "react-native-safe-area-context";

const Application = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState(
    user.userRoles.map((ur) => ur.name).includes("Mentor") ? "received" : "sent"
  );
  const [sentApplications, setSentApplications] = useState([]);
  const [receivedApplications, setReceivedApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchApplications();
    setRefreshing(false);
  };

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      try {
        if (user.userRoles.map((ur) => ur.name).includes("Mentee")) {
          const sentApps = await getMenteeApplicationsSent();
          setSentApplications(sentApps.data.data);
        }
        if (user.userRoles.map((ur) => ur.name).includes("Mentor")) {
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
  }, [user.userRoles]);

  const handleApplicationClick = (applicationId) => {
    router.push({
      pathname: "applications/application-detail",
      params: { id: applicationId },
    });
  };

  if (loading) {
    return <Loader isLoading={loading} />;
  }

  const renderApplicationItem = ({ item }) => {
    const isMentor = user.userRoles.map((ur) => ur.name).includes("Mentor");
    const avatar = isMentor ? item.user?.profilePic : item.mentor.profilePic;
    const name = isMentor ? item.user?.fullName : item.mentor.fullName;
    const email = isMentor ? item.user?.email : item.mentor.email;
    const bio = isMentor ? item.user?.bio : item.mentor.bio;
    const company = isMentor ? item.user?.company : item.mentor.company;
    const jobTitle = isMentor ? item.user?.jobTitle : item.mentor.jobTitle;
    const planDescription = item.menteePlan.descriptionOfPlan;
    const price = item.price;
    const planDetails = `Calls per Month: ${item.menteePlan.callPerMonth}
Duration of Meeting: ${item.menteePlan.durationOfMeeting} mins
Remaining Slots: ${item.menteePlan.remainSlot}`;

    return (
      <TouchableOpacity
        className="flex-row bg-white p-4 rounded-lg mb-4 items-center shadow-md"
        onPress={() => handleApplicationClick(item.id)}
      >
        <Image
          source={avatar ? { uri: avatar } : images.avatar}
          className="w-16 h-16 rounded-full mr-4"
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
              <Text className="text-sm font-bold text-gray-700 mt-2">
                Plan of mentor:{" "}
              </Text>
              <Text className="text-sm text-gray-700 mt-1">
                Description: {planDescription}
              </Text>
              <Text className="text-sm text-gray-700">{planDetails}</Text>
            </>
          )}
          <Text className={`text-sm text-gray-700 mt-1`}>
            Application status: {item.status}
          </Text>
          <Text className="text-lg font-bold text-green-600 mt-1">
            {price.toLocaleString()} vnd
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderApplications = () => {
    const applications =
      filter === "sent" ? sentApplications : receivedApplications;
    return (
      <FlatList
        data={applications}
        renderItem={renderApplicationItem}
        keyExtractor={(item) => item.id.toString()}
        className="flex-1"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-secondary/20 p-4 pb-0">
      <View className="flex-row justify-center mb-4 mt-5">
        {user.userRoles.map((ur) => ur.name).includes("Mentee") && (
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
        {user.userRoles.map((ur) => ur.name).includes("Mentor") && (
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
      {renderApplications()}
    </SafeAreaView>
  );
};

export default Application;
