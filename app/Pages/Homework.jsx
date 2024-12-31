import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import CheckBox from 'react-native-check-box';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Homework = () => {
  const [selectedHomework, setSelectedHomework] = useState({});
  const router = useRouter();

  // Sample array of homework items
  const homeworkData = [
    { id: 1, title: 'Learn Chapter 5 with one Essay', subject: 'English' },
    { id: 2, title: 'Complete Math Homework Chapter 6', subject: 'Math' },
    { id: 3, title: 'Write History Essay on WWII', subject: 'History' },
    { id: 4, title: 'Geography Project on Mountains', subject: 'Geography' },
  ];

  // Save completed homework to AsyncStorage
  const saveCompletedHomework = async (data) => {
    try {
      await AsyncStorage.setItem('@completedHomework', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving completed homework:', error);
    }
  };

  // Load completed homework from AsyncStorage
  const loadCompletedHomework = async () => {
    try {
      const storedData = await AsyncStorage.getItem('@completedHomework');
      if (storedData) {
        setSelectedHomework(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading completed homework:', error);
    }
  };

  // Toggle selection of homework
  const toggleSelection = (id) => {
    setSelectedHomework((prevState) => {
      const updatedState = { ...prevState, [id]: !prevState[id] };
      saveCompletedHomework(updatedState); // Save updated state to AsyncStorage
      return updatedState;
    });
  };

  // Load completed homework on component mount
  useEffect(() => {
    loadCompletedHomework();
  }, []);

  return (
    <View>
      <View className="bg-[#3243da] justify-start p-3 flex-row items-center">
        <TouchableOpacity onPress={() => router.push('/Home')}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text className="text-xl tracking-wider text-white ml-4 font-mediumM">
          Homework
        </Text>
      </View>
      <ScrollView className="mb-16">
        <View className="mx-4 mt-4">
          <Text className="text-blue-900 font-mediumM text-xl">Today</Text>
        </View>
        {homeworkData.map((item) => (
          <View key={item.id} className="mx-4 mb-2">
            <View
              className={`${
                selectedHomework[item.id] ? 'bg-blue-100' : 'bg-red-100'
              } flex-row items-center p-2 my-2 rounded-xl`}
            >
              <CheckBox
                style={{
                  transform: [{ scale: 1.4 }],
                  paddingLeft: 6,
                }}
                onClick={() => toggleSelection(item.id)} // Toggle checkbox state
                isChecked={selectedHomework[item.id]}
                checkBoxColor="blue"
              />
              <View className="px-4 pl-6 w-[94%] min-h-[10vh] flex justify-evenly">
                <Text className="font-mediumM text-lg text-wrap">
                  {item.title}
                </Text>
                <Text className="font-mediumM text-md text-gray-500">
                  {item.subject}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Homework;
