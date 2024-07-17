import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import useApi from "../../hooks/useApi";
import { getAllMentorList } from "../../api/mentorService";
import { Card, Title, Paragraph, Avatar, Searchbar } from "react-native-paper";
import { Image } from "react-native";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../context/AuthContext";
import { images } from "../../constants";
import { Loader } from "../../components";
import cards from "../../assets/images/cards.png"

const Home = () => {
  const navigation = useNavigation();
  const [mentors, setMentors] = useState([]);
  const [visible, setVisible] = useState(6); // Số sản phẩm hiển thị ban đầu
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = useAuth();
  const { data, loading } = useApi(getAllMentorList);

  useEffect(() => {
    if (data && data.data) {
      setMentors(data.data.data);
    }
  }, [data]);

  const onChangeSearch = (query) => setSearchQuery(query);

  const filteredMentors = useMemo(() => {
    if (!mentors) return [];
    return mentors.filter(
      (mentor) =>        
        (mentor.jobTitle && mentor.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [mentors, searchQuery]);

  if (loading) return <Loader isLoading={loading} />;

  const handleLoadMore = () => {
    if (filteredMentors.length > visible) {
      setVisible((prevVisible) => prevVisible + 6); // Tăng số lượng sản phẩm hiển thị khi nhấn nút "Xem thêm"
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
          <Paragraph style={styles.jobTitle}>{item.jobTitle}</Paragraph>
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
            <View className='flex flex-col items-center mb-4'>
            <Text className="text-center text-xl font-bold text-[#274a79] mb-2">
              Hi, {user?.fullName}
            </Text>
            {/* <Avatar.Image
              size={100}
              source={
                user?.profilePic ? { uri: user.profilePic } : images.avatar
              }
              className="mx-auto mb-3"
            /> */}
            <Text className="mb-1 text-base italic">
              Welcome to Tỏ Tê!
            </Text>
            </View>
            
            <Image
              source={cards}
              style={styles.cardsImage}
              className="w-[380px] h-[120px]"
            />
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
        <View className="mx-3 mt-10 mb-2 rounded-xl w-[350px] bg-white">
          <Searchbar
            placeholder="Tìm kiếm..."
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
        </View>
        <Text style={styles.listTitle} className="uppercase my-4">
          List Tortee mentor:
        </Text>
      </View>
    </View>
  );

  const renderFooter = () => {
    // Check if there are more products to show
    if (visible >= filteredMentors.length) {
      return null; // Don't show the "Load More" button if no more products
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
  searchInput: {
    borderWidth: 1,
    borderColor: "#6adbd7",
    borderRadius: 10,
    padding: 8,
    marginVertical: 10,
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
  jobTitle: {
    fontSize: 14,
    color: "#274a79",
    textAlign: "center",
    fontStyle:"italic"
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});

export default Home;
