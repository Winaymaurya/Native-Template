import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const Home = () => {
  const notices = [
    { id: 1, description: 'Important meeting tomorrow at 10 AM.', date: '2024-12-27' },
    { id: 2, description: 'Holiday on 1st January for New Year.', date: '2024-12-31' },
    { id: 3, description: 'School will be closed for maintenance on 5th January.', date: '2025-01-05' },
    { id: 4, description: 'New batch starting on 10th January.', date: '2025-01-10' },
    { id: 5, description: 'Notice: Online classes resume from 15th January.', date: '2025-01-15' },
    { id: 6, description: 'Notice: Online classes resume from 15th January.', date: '2025-01-15' },
  ];
  const colors = ['bg-red-100', 'bg-blue-100', 'bg-green-100'];
  const router = useRouter();

  return (
    <>
      <View className="px-4 flex flex-row flex-wrap justify-around">
        <TouchableOpacity
          className="bg-[#3243da] m-1 w-[30%] h-28 mt-4 rounded-md flex justify-center items-center"
          onPress={() => router.push('Pages/AttendanceMonthly')}
        >
          <FontAwesome5 name="address-book" size={44} color="white" />
          <View>
            <Text className="text-white text-center rounded-xl p-1 text-md font-regularM">
              Attendance
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#3243da] m-1 w-[30%] h-28 mt-4 rounded-md flex justify-center items-center"
          onPress={() => router.push('Pages/Notice')}
        >
          <AntDesign name="calendar" size={52} color="white" />
          <View>
            <Text className="text-md text-white text-center rounded-xl p-1 font-regularM">
              Notice
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#3243da] m-1 w-[30%] h-28 mt-4 rounded-md flex justify-center items-center">
          <AntDesign name="book" size={52} color="white" />
          <View>
            <Text className="text-md text-white text-center rounded-xl p-1 font-regularM">
              Test
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#3243da] m-1 w-[30%] h-28 mt-4 rounded-md flex justify-center items-center">
          <AntDesign name="calendar" size={52} color="white" />
          <View>
            <Text className="text-md text-white text-center rounded-xl p-1 font-regularM">
              Report Card
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#3243da] m-1 w-[30%] h-28 mt-4 rounded-md flex justify-center items-center"
          onPress={() => router.push('Pages/Calendar')}
        >
          <AntDesign name="calendar" size={52} color="white" />
          <View>
            <Text className="text-md text-white text-center rounded-xl p-1 font-regularM">
              Calendar
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#3243da] m-1 w-[30%] h-28 mt-4 rounded-md flex justify-center items-center"
          onPress={() => router.push('Pages/Homework')}
        >
          <AntDesign name="calendar" size={52} color="white" />
          <View>
            <Text className="text-md text-white text-center rounded-xl p-1 font-regularM">
              Homework
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View className="px-6 mt-4">
        <Text className="text-2xl text-blue-800 tracking-wider font-mediumM font-semibold">
          Notice Board
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 20 }}
        className="space-x-4 px-4 mt-2 mr-4"
      >
        {notices.map((notice, i) => (
          <View
            key={notice.id}
            className={`${colors[i % colors.length]} p-4 rounded-lg shadow-lg h-52`}
            style={{
              width: 260, // Increased width for better fit
              justifyContent: 'space-between',
            }}
          >
            <Text className="font-semibold font-mediumM text-lg mb-2">
              {notice.description}
            </Text>
            <Text className="text-gray-600 text-sm font-regularM">
              {notice.date}
            </Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
};

export default Home;
