import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import CheckBox from 'react-native-check-box'
import { useRouter } from 'expo-router';

const Homework = () => {
    const [isSelected, setIsSelected] = useState(false);
    const router = useRouter()
    const [selectedHomework, setSelectedHomework] = useState({});

    // Sample array of homework items
    const homeworkData = [
      {
        id: 1,
        title: 'Learn Chapter 5 with one Essay',
        subject: 'English',
        isSelected: false,
      },
      {
        id: 2,
        title: 'Complete Math Homework Chapter 6',
        subject: 'Math',
        isSelected: false,
      },
      {
        id: 3,
        title: 'Write History Essay on WWII',
        subject: 'History',
        isSelected: false,
      },
      {
        id: 4,
        title: 'Geography Project on Mountains',
        subject: 'Geography',
        isSelected: false,
      },
    ];
  
    const toggleSelection = (id) => {
      setSelectedHomework((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
    };
    return (
        <View>
            <View className="bg-[#3243da] justify-start p-3 flex-row items-center">
                <TouchableOpacity onPress={() => router.push('/Home')}>
                    <Ionicons name="arrow-back" size={32} color="white" />
                </TouchableOpacity>
                <Text className="text-2xl tracking-wider text-white ml-4 font-mediumM">
                    Homework
                </Text>
            </View>
            <ScrollView className='mb-16'>
                <View className='mx-4 mt-4'>
                <Text className="text-blue-900 font-mediumM text-xl">Today</Text>
                </View>
               {homeworkData.map((item) => (
        <View key={item.id} className="mx-4 mb-2">
          <View
            className={`${
              selectedHomework[item.id] ? 'bg-blue-100' : 'bg-red-100'
            } flex-row items-center p-2 my-2 rounded-xl h-32`}
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
              <Text className="font-mediumM text-lg text-wrap">{item.title}</Text>
              <Text className="font-mediumM text-md text-gray-500">{item.subject}</Text>
            </View>
          </View>
        </View>
              ))}
                <View className='mx-4 mt-4'>
                <Text className="text-blue-900 font-mediumM text-xl">Yesterday</Text>
                </View>
               {homeworkData.map((item) => (
        <View key={item.id} className="mx-4 mb-2">
          <View
            className={`${
              selectedHomework[item.id] ? 'bg-blue-100' : 'bg-red-100'
            } flex-row items-center p-2 my-2 rounded-xl h-32`}
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
              <Text className="font-mediumM text-lg text-wrap">{item.title}</Text>
              <Text className="font-mediumM text-md text-gray-500">{item.subject}</Text>
            </View>
          </View>
        </View>
              ))}
            </ScrollView>
        </View>
    )
}

export default Homework