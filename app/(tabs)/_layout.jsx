import React from 'react'
import {Tabs} from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import {StatusBar} from 'expo-status-bar'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


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
          name='Home'
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
            title: 'Home', // Custom title for the header
          }}
        />
        <Tabs.Screen
          name='Badminton'
          options={{
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="badminton" size={24} color={color} />,
            title: 'Badminton',
          }}
        />
      
        <Tabs.Screen
          name='Football'
          options={{
            tabBarIcon: ({ color }) => <Ionicons name="football" size={24} color={color} />,
            title: 'Football ',
          }}
        />
      </Tabs>
    );
    }