import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { getAllMentorList } from "../../api/mentorService";
import {
  Card,
  Title,
  Paragraph,
  Button,
  Modal,
  Searchbar,
  Menu,
  Provider,
  ActivityIndicator,
  Avatar,
} from "react-native-paper";
import { Image } from "react-native";
import { router, useNavigation } from "expo-router";

const Home = () => {
  const navigation = useNavigation();
  const [mentors, setMentors] = useState([]);

  const { data, loading, refetch } = useApi(getAllMentorList);

  useEffect(() => {
    if (data && data.data) {
      setMentors(data.data.data);
    }
  }, [data]);

  console.log("MentorList", mentors);

  const renderMentor = ({ item }) => {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Image
            source={{
              uri: item.profilePic
                ? item.profilePic
                : "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1725655669.jpg",
            }}
            style={styles.image}
          />
          <Title
            style={styles.mentorName}
            onPress={() =>
              navigation.navigate("mentorDetail", { mentorId: item.id })
            }
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.fullName}
          </Title>
          <Paragraph style={styles.mentorCompany}>{item.company}</Paragraph>
        </Card.Content>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("mentorDetail", { mentorId: item.id })
          }
          className="items-center flex-row justify-center mb-3"
        >
          <Text
            style={styles.buttonText}
            className=" bg-[#6adbd7] text-[#274a79] p-2 mt-5 rounded-md  text-center font-semibold  text-sm"
          >
            View Details
          </Text>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Home Tỏ Tê</Text>
      </View>
      <ScrollView className="mt-6  mx-4">
        <View className="flex-row justify-center w-full">
          <View style={styles.welcomeTextContainer}>
            <Text className="text-center text-xl font-bold uppercase text-[#274a79] mb-4">
              Mentee
            </Text>
            <Avatar.Image
              size={100}
              source="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-vector-600nw-1725655669.jpg"
              className="mx-auto mb-3"
            />
            <Text style={styles.welcomeText} className="mb-1">
              Welcome to Tỏ Tê!
            </Text>
            <Text style={styles.exploreText} className="mb-3">
              Feel free to explore the app.
            </Text>
            <Text style={styles.firstTimeText}>
              If this is your first time visiting, please go to
            </Text>
            <TouchableOpacity
              style={styles.profileSettingBtn}
              onPress={() =>
                router.push({
                  pathname: "profile",
                })
              }
            >
              <Text style={styles.profileSettingText}>Profile Setting</Text>
            </TouchableOpacity>
            <Text style={styles.firstTimeText}>
              to update your profile so that mentees can view your profile and
              apply for your packages.
            </Text>
          </View>
        </View>
        <View style={styles.mentorListContainer}>
          <Text style={styles.listTitle} className="uppercase my-4">
            List Tortee mentor:
          </Text>
          <FlatList
            data={mentors}
            renderItem={renderMentor}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            numColumns={2}
            contentContainerStyle={styles.flatListContainer}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    backgroundColor: "#f7fcff",
  },
  header: {
    backgroundColor: "#274a79",
    padding: 15,
    borderBottomWidth: 5,
    borderBottomColor: "#6adbd7",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  welcomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  welcomeTextContainer: {
    flex: 1,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#274a79",
    textAlign: "center",
  },
  exploreText: {
    fontSize: 16,
    color: "#274a79",
    textAlign: "center",
  },
  firstTimeText: {
    fontSize: 14,
    color: "#274a79",
    marginTop: 5,
    textAlign: "center",
  },
  profileSettingBtn: {
    marginTop: 5,
    alignItems: "center",
  },
  profileSettingText: {
    textAlign: "center",
    color: "#274a79",
    borderRadius: 8,
    padding: 8,
    width: "fit-content",
    fontSize: 14,
    fontWeight: 600,
    backgroundColor: "#6adbd7",
    // textDecorationLine: "underline",
  },
  mentorListContainer: {
    flex: 1,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#274a79",
  },
  flatListContainer: {
    flexGrow: 1,
  },
  card: {
    margin: 5,
    width: "47%",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#6adbd7",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    marginBottom: 10,
    backgroundColor: "#ffffff",
  },
  mentorName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#274a79",
    textAlign: "center",
  },
  mentorCompany: {
    fontSize: 14,
    color: "#274a79",
    textAlign: "center",
  },
});

export default Home;
