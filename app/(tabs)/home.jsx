import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import useApi from "../../hooks/useApi";
import { getAllMentorList } from "../../api/mentorService";
import { Card, Title, Paragraph, Avatar, Searchbar } from "react-native-paper";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { images } from "../../constants";
import { Loader } from "../../components";

const Home = () => {
  const navigation = useNavigation();
  const [mentors, setMentors] = useState([]);
  const [visible, setVisible] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useAuth();
  const { data, loading, refetch } = useApi(getAllMentorList);

  useEffect(() => {
    if (data && data.data) {
      setMentors(data.data.data);
    }
  }, [data]);

  const onChangeSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const filteredMentors = useMemo(() => {
    return mentors.filter((mentor) => {
      const fullName = mentor.fullName ? mentor.fullName.toLowerCase() : "";
      const jobTitle = mentor.jobTitle ? mentor.jobTitle.toLowerCase() : "";
      return (
        fullName.includes(searchQuery.toLowerCase()) ||
        jobTitle.includes(searchQuery.toLowerCase())
      );
    });
  }, [mentors, searchQuery]);

  if (loading) return <Loader isLoading={loading} />;

  const handleLoadMore = () => {
    if (mentors.length > visible) {
      setVisible((prevVisible) => prevVisible + 6);
    }
  };

  const renderMentor = ({ item }) => {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <Image
            source={{
              uri: item.profilePic ? item.profilePic : images.avatar,
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
          <Paragraph style={styles.mentorCompany}>{item.jobTitle}</Paragraph>
          <Paragraph style={styles.mentorCompany}>{item.company}</Paragraph>
        </Card.Content>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("mentor/mentorDetail", { mentorId: item.id })
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

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerText}>Home Tỏ Tê</Text>
      </View>
      <View className="mt-6 mx-4">
        <View className="flex-row justify-center w-full">
          <View style={styles.welcomeTextContainer}>
            <Text className="text-center text-xl font-bold text-[#274a79] mb-4">
              Hi, {user?.fullName}
            </Text>
            <Avatar.Image
              size={100}
              source={
                user?.profilePic ? { uri: user.profilePic } : images.avatar
              }
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
              onPress={() => navigation.navigate("profile")}
            >
              <Text style={styles.profileSettingText}>Profile Setting</Text>
            </TouchableOpacity>
            <Text style={styles.firstTimeText}>
              to update your profile so that mentees can view your profile and
              apply for your packages.
            </Text>
          </View>
        </View>
        <Text style={styles.listTitle} className="uppercase my-4">
          List Tortee mentor:
        </Text>
      </View>
      <Searchbar
        placeholder="Search by full name or job title"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
    </View>
  );

  const renderFooter = () => {
    if (visible >= filteredMentors.length) {
      return null;
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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredMentors.slice(0, visible)}
        renderItem={renderMentor}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7fcff",
    paddingBottom: 10,
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
    fontWeight: "700",
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
    fontWeight: "700",
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
    fontSize: 14,
    fontWeight: "600",
    backgroundColor: "#6adbd7",
  },
  mentorListContainer: {
    flex: 1,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "700",
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
    fontWeight: "700",
    color: "#274a79",
    textAlign: "center",
  },
  mentorCompany: {
    fontSize: 14,
    color: "#274a79",
    textAlign: "center",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  searchbar: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
});

export default Home;
