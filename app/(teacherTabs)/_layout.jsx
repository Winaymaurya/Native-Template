import React from 'react'
import {Tabs} from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import {StatusBar} from 'expo-status-bar'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
export default ()=> {
    return (
      <Tabs
        screenOptions={{
          headerShown: true, // Show header for each tab screen
          tabBarActiveTintColor: '#4c9ad0',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            padding: 2,
            height: 55,
          },
          headerStyle: {
            backgroundColor: '#161622', // Same background as tab bar
          },
          headerTintColor: '#CCCCFF', // Customize the color of the header text and icons
          headerTitleStyle: {
            fontWeight: 'light', // Custom font styling for the header title
          },
        }}
      >
        <Tabs.Screen
          name='TeacherHome'
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
            title: 'Home', // Custom title for the header
          }}
        />
        {/* <Tabs.Screen
          name='FindTeacher'
          options={{
            tabBarIcon: ({ color }) => <FontAwesome name="search" size={24} color={color} />,
            title: 'Search',
          }}
        /> */}
        <Tabs.Screen
          name='TeacherClass'
          options={{
            tabBarIcon: ({ color }) => <FontAwesome5 name="chalkboard-teacher" size={24} color={color} />,
            title: 'Class',
          }}
        />
      
        <Tabs.Screen
          name='TeacherProfile'
          options={{
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account-circle-outline" size={24} color={color} />,
            title: 'Profile ',
          }}
        />
      </Tabs>
    );
    }