import React from 'react'
import { View, Text ,Image,TouchableOpacity} from 'react-native'
import {router, Tabs,useRouter} from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import {StatusBar} from 'expo-status-bar'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomHeader = ({  studentClass,photo}) => {
  const name =  AsyncStorage.getItem('name');
  const profile =  AsyncStorage.getItem('profile');
  console.log(profile)
    return (
      <View className="flex-row items-center justify-between bg-[#3243da] p-2 px-8 rounded-b-[40px]">
        <View>
        <View>
          <Text className="text-[#CCCCCC] text-xl font-boldM">{name}</Text></View>
          <View><Text className="text-[#CCCCFF] text-sm font-mediumM">{studentClass}</Text></View>
        </View>
        <TouchableOpacity onPress={()=>router.push('/Profile')}>

        <Image source={{ uri: photo}} className="w-14 h-14 rounded-full mr-4" />
        </TouchableOpacity>
      </View>
    );
  };

export default ()=> {
    const router=useRouter()
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
            paddingTop:5
        
          },
          headerStyle: {
            backgroundColor: '#3243da', 
            // Same background as tab bar
          },
          headerTintColor: '#FFFFFF', // Customize the color of the header text and icons
          headerTitleStyle: {
            fontWeight: 'light', // Custom font styling for the header title
          },
        }}
      >
        <Tabs.Screen
          name='Home'
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />,
            header: () => (
                <CustomHeader
                  name="John Doe"
                  studentClass="Class 10-A"
                  photo="https://img.freepik.com/free-vector/young-man-with-glasses-avatar_1308-175763.jpg?ga=GA1.1.210103055.1735223824&semt=ais_hybrid"
                />
              ),
          }}
          
        />
        <Tabs.Screen
          name='Class'
          options={{
            tabBarIcon: ({ color }) => <FontAwesome5 name="chalkboard-teacher" size={24} color={color} />,
            headerShown: false,
            
          }}
        />
        <Tabs.Screen
          name='Fees'
          options={{
            tabBarIcon: ({ color }) => <FontAwesome6 name="money-bill-transfer" size={24} color={color} />,
            headerShown: false,
          }}
        />
      
        <Tabs.Screen
          name='Profile'
          options={{
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-circle-outline" size={28} color={color} />,
            headerShown: false,
          }}
        />
 
      </Tabs>
    );
    }