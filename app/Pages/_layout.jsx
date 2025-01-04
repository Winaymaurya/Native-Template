import React from 'react'
import {Tabs} from 'expo-router'
export default ()=> {
    return (
      <Tabs
        screenOptions={{
          headerShown: false, // Show header for each tab screen
        }}
      >
        <Tabs.Screen
      name="AttendanceMonthly"
      options={{
        tabBarStyle: { display: 'none' }, // Hide tab bar
        headerShown: false, // Hide header
        tabBarButton: () => null, // Remove it from the tab bar entirely
      }}
    />
        <Tabs.Screen
      name="AttendanceDetail"
      options={{
        tabBarStyle: { display: 'none' }, // Hide tab bar
        headerShown: false, // Hide header
        tabBarButton: () => null, // Remove it from the tab bar entirely
      }}
    />
        <Tabs.Screen
      name="Homework"
      options={{
        tabBarStyle: { display: 'none' }, // Hide tab bar
        headerShown: false, // Hide header
        tabBarButton: () => null, // Remove it from the tab bar entirely
      }}
    />
        <Tabs.Screen
      name="Calendar"
      options={{
        tabBarStyle: { display: 'none' }, // Hide tab bar
        headerShown: false, // Hide header
        tabBarButton: () => null, // Remove it from the tab bar entirely
      }}
    />
        <Tabs.Screen
      name="Quiz"
      options={{
        tabBarStyle: { display: 'none' }, // Hide tab bar
        headerShown: false, // Hide header
        tabBarButton: () => null, // Remove it from the tab bar entirely
      }}
    />
        <Tabs.Screen
      name="Notice"
      options={{
        tabBarStyle: { display: 'none' }, // Hide tab bar
        headerShown: false, // Hide header
        tabBarButton: () => null, // Remove it from the tab bar entirely
      }}
    />
       
      </Tabs>
    );
    }