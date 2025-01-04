import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Tabs, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Badge } from 'react-native-paper';
import apiClient from '../utils/axiosInstance';

const CustomHeader = ({ studentClass, setBadge }) => {
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [image, setImage] = useState(null)
  const router = useRouter();
  const fetchData = async () => {
    try {
      const storedName = await AsyncStorage.getItem('name');
      setName(storedName || 'Student Name');
  
      const jsonValue = await AsyncStorage.getItem('student');
      const student = jsonValue ? JSON.parse(jsonValue) : null;
      setClassName(student?.className?.name || '');
  
      const savedImage = await AsyncStorage.getItem('profilePhoto');
      if (savedImage) {
        setImage(savedImage);
      } else {
        setImage('https://via.placeholder.com/150'); // Default placeholder image
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const getFeeHistory = async () => {
    const id = await AsyncStorage.getItem('studentId');
    try {
      const { data } = await apiClient.get(`studentFees/history/${id}`);
      if (data?.success) {
        const newHistory = data?.data.length;
        const storedHistory = await AsyncStorage.getItem('feeHistory');
        if (storedHistory !== JSON.stringify(newHistory)) {
          setBadge(true); // Update badge
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    getFeeHistory();
  }, []);

  return (
    <View className="flex-row items-center justify-between bg-[#3243da] p-2 px-8 rounded-b-[40px]">
      <View>
        <Text className="text-[#CCCCCC] text-xl font-boldM">{name}</Text>
        <Text className="text-[#CCCCFF] text-sm font-mediumM">{studentClass}</Text>
      </View>
      <TouchableOpacity onPress={() => router.push('/Profile')}>
        <Image source={{ uri: image }} className="w-14 h-14 rounded-full mr-4" />
      </TouchableOpacity>
    </View>
  );
};

export default () => {
  const router = useRouter();
  const [badge, setBadge] = useState(false); // Lifted badge state

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
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
          backgroundColor: '#3243da',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'light',
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
              setBadge={setBadge} // Pass setBadge to update badge state
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
              <FontAwesome6 name="money-bill-transfer" size={24} color={color} />
              {badge && (
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
                </Badge>
              )}
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
