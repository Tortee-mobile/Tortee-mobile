import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  applyForMentee,
  getApplicationQuestions,
} from "../../api/mentorService";
import { Ionicons } from "@expo/vector-icons";
import { showErrorMessage, showSuccessMessage } from "../../components/Toast";

const Booking = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { menteePlanId } = route.params; // Get menteePlanId from route params
  const [responses, setResponses] = useState({});
  const [questions, setQuestions] = useState([]);

  console.log("questions", questions);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Booking",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#6adbd7" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const fetchedQuestions = await getApplicationQuestions();
        setQuestions(fetchedQuestions);
      } catch (error) {
        Alert.alert("Error", "Failed to fetch questions.");
      }
    };

    fetchQuestions();
  }, []);

  const handleSubmit = async () => {
    const menteeApplicationAnswers = Object.keys(responses).map((id) => ({
      questionId: id,
      responseContent: responses[id],
    }));

    try {
      await applyForMentee(menteePlanId, menteeApplicationAnswers);
      showSuccessMessage("Success, Application submitted successfully!");
      navigation.goBack();
    } catch (error) {
      showErrorMessage(
        "Error, Failed to submit application. Please try again."
      );
    }
  };

  const handleInputChange = (id, value) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [id]: value,
    }));
  };

  const isSubmitDisabled = () => {
    if (questions.length === 0) return true;
    return (
      questions.data.length > 0 &&
      questions.data.some(
        (question) =>
          !responses[question.id] || responses[question.id].trim() === ""
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Apply for Mentorship</Text>
      {questions.length !== 0 && (
        <View>
          {questions.data.map((question) => (
            <View key={question.id} style={styles.questionContainer}>
              <Text style={styles.questionText}>{question.content}</Text>
              <TextInput
                style={styles.input}
                placeholder="Your answer here..."
                value={responses[question.id] || ""}
                onChangeText={(value) => handleInputChange(question.id, value)}
                maxLength={70} // Limit input to 70 characters
              />
              <Text style={styles.charCount}>
                {responses[question.id]?.length || 0}/70
              </Text>
            </View>
          ))}
        </View>
      )}
      <TouchableOpacity
        style={[
          styles.submitButton,
          isSubmitDisabled() && styles.disabledButton,
        ]}
        onPress={handleSubmit}
        disabled={isSubmitDisabled()}
      >
        <Text style={styles.submitButtonText}>Submit Application</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f7fcff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#274a79",
  },
  questionContainer: {
    marginBottom: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#274a79",
  },
  input: {
    borderWidth: 1,
    borderColor: "#6adbd7",
    backgroundColor: "#ffffff",
    borderRadius: 4,
    padding: 10,
    marginTop: 8,
  },
  backButton: {
    marginLeft: 16,
  },
  charCount: {
    fontSize: 12,
    color: "#888",
    textAlign: "right",
  },
  submitButton: {
    backgroundColor: "#6adbd7",
    color: "#274a79",
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
    textAlign: "center",
    fontWeight: "bold",
  },
  submitButtonText: {
    color: "#274a79",
    textAlign: "center",

    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});

export default Booking;
