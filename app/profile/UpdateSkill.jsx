import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { getSkills, updateMySkills } from "../../api/skillService";

const SkillManagementComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [fetchedSkills, setFetchedSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputValue) {
      setLoading(true);
      getSkills(inputValue)
        .then((response) => {
          setFetchedSkills(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("There was an error fetching the skills!", error);
          setLoading(false);
        });
    } else {
      setFetchedSkills([]);
    }
  }, [inputValue]);

  const handleInputChange = (text) => {
    setInputValue(text);
    setSuccess(false);
  };

  const handleSkillClick = (skill) => {
    if (!selectedSkills.some((selected) => selected.id === skill.id)) {
      setSelectedSkills([...selectedSkills, skill]);
      setInputValue("");
      setFetchedSkills([]);
    }
  };

  const handleRemoveSkill = (skillId) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill.id !== skillId));
  };

  const handleUpdateSkills = () => {
    const skillIds = selectedSkills.map((skill) => ({ id: skill.id }));
    updateMySkills(skillIds)
      .then((response) => {
        console.log("Skills updated successfully", response);
        setSuccess(true);
        setSelectedSkills([]);
      })
      .catch((error) => {
        console.error("There was an error updating the skills!", error);
      });
  };

  return (
    <View className="flex-1 bg-white">
      <View className="flex flex-row items-center mx-auto">
        <TextInput
          className="h-12 w-64 border border-gray-300 rounded-lg pl-4 mt-4 mb-6 mr-4 bg-white shadow-sm"
          placeholder="Type to search for skills..."
          value={inputValue}
          onChangeText={handleInputChange}
        />
        <TouchableOpacity onPress={handleUpdateSkills}>
          <Text className="bg-primary text-white text-base tracking-wide font-semibold p-2 rounded-lg shadow-lg mb-6 mt-4">
            Add Skills
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={fetchedSkills}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSkillClick(item)}>
            <Text className="p-4">{item.skillName}</Text>
          </TouchableOpacity>
        )}
        className="bg-white absolute top-16 z-50 w-64 ml-6 pl-4 py-4 h-fit"
      />

      {success && (
        <Text style={{ color: "green", marginTop: 10 }}>
          Skills updated successfully!
        </Text>
      )}
      <View className="flex flex-row flex-wrap pt-3 gap-4 px-8">
        {selectedSkills.map((skill) => (
          <View
            key={skill.id}
            className="flex flex-row bg-slate-200 p-3 rounded-xl "
          >
            <Text className="text-primary font-semibold tracking-wide">
              {skill.skillName}
            </Text>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => handleRemoveSkill(skill.id)}
            >
              <FontAwesome name="times-circle" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default SkillManagementComponent;
