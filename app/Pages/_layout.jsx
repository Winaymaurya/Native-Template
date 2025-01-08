import React, { useEffect } from 'react';
import { Tabs, useRouter } from 'expo-router';
import { BackHandler } from 'react-native';

export default () => {
  const router = useRouter();

  useEffect(() => {
    const onBackPress = () => {
      router.push('Home'); // Navigate to Home screen
      return true; // Prevent default back behavior
    };

    BackHandler.addEventListener('hardwareBackPress', onBackPress);

    // Cleanup the event listener when component unmounts
    return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  }, [router]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hide header for all tab screens
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
};
