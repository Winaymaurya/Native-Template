import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Badge } from 'react-native-paper';

const CustomHeader = ({ studentClass, photo }) => {
  const [name, setName] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const storedName = await AsyncStorage.getItem('name');
      setName(storedName || 'Student Name');
    };
    fetchData();
  }, []);

  return (
    <View className="flex-row items-center justify-between bg-[#3243da] p-2 px-8 rounded-b-[40px]">
      <View>
        <Text className="text-[#CCCCCC] text-xl font-boldM">{name}</Text>
        <Text className="text-[#CCCCFF] text-sm font-mediumM">{studentClass}</Text>
      </View>
      <TouchableOpacity onPress={() => router.push('/Profile')}>
        <Image source={{ uri: photo }} className="w-14 h-14 rounded-full mr-4" />
      </TouchableOpacity>
    </View>
  );
};

export default () => {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: true, // Show header for each tab screen
        tabBarActiveTintColor: '#6ab2d9',
        tabBarInactiveTintColor: '#CCCCCC',
        tabBarStyle: {
          backgroundColor: '#3243da',
          height: 60,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          paddingTop: 5,
        },
        headerStyle: {
          backgroundColor: '#3243da', // Same background as tab bar
        },
        headerTintColor: '#FFFFFF', // Customize the color of the header text and icons
        headerTitleStyle: {
          fontWeight: 'light', // Custom font styling for the header title
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />,
          header: () => (
            <CustomHeader
              studentClass="Class 10-A"
              photo="https://img.freepik.com/free-vector/young-man-with-glasses-avatar_1308-175763.jpg?ga=GA1.1.210103055.1735223824&semt=ais_hybrid"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Class"
        options={{
          tabBarIcon: ({ color }) => <FontAwesome5 name="chalkboard-teacher" size={24} color={color} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Fees"
        options={{
          tabBarIcon: ({ color }) => (
            <View className="relative">
              {/* Icon */}
              <FontAwesome6 name="money-bill-transfer" size={24} color={color} />
              {/* Badge */}
              <Badge
                size={14}
                style={{
                  position: 'absolute',
                  top: -5,
                  right: -10,
                  backgroundColor: 'red',
                  color: 'white',
                  fontSize: 10,
                }}
              >
                2
              </Badge>
            </View>
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-circle-outline" size={28} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
};
