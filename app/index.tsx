import { useRouter } from "expo-router";
import React,{ useEffect, useState } from "react";
import { Text, TouchableOpacity, View, TextInput, Image, Alert, ScrollView, Keyboard, StatusBar } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

import apiClient from "./utils/axiosInstance";
// import * as Notifications from 'expo-notifications';

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [forgot, setForgot] = useState(false);
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleLogin = async () => {
    try {
      if (!id || !password) {
        Alert.alert("Error", "Please enter both StudentID and password.");
        return;
      }
      // const deviceToken = await handleNotifications();
      // console.log('Push Token:', deviceToken);
      setLoading(true);
      const payload = { studentId: id, password, deviceToken:'1313' };
      const { data } = await apiClient.post(`login/student`, payload);
      if (data?.success) {
        await AsyncStorage.setItem('token', data?.accessToken);
        await AsyncStorage.setItem('name', `${data?.data?.firstName} ${data?.data?.lastName}`);
        await AsyncStorage.setItem('studentId', data?.data._id);
        await AsyncStorage.setItem('student', JSON.stringify(data?.data));
        Alert.alert("Success", data?.message);
        router.push('/Home');
      } else {
        Alert.alert("Error", data?.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Something went wrong")
      setLoading(false);
    }
  };

  const sendResetLink = async () => {
    try {
      if (!email) {
        Alert.alert("Error", "Please enter Email");
        return;
      }
      setLoading(true);
      const { data } = await apiClient.post(`login/request-reset`, { email });
      if (data?.success) {
        Alert.alert("Success", data?.message);
      }
      setLoading(false);
      setForgot(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setForgot(false);
    }
  };
 
  // const handleNotifications = async () => {
  //   const { status } = await Notifications.getPermissionsAsync();
  //   if (status !== "granted") {
  //     const { status: newStatus } = await Notifications.requestPermissionsAsync();
  //     if (newStatus !== "granted") {
  //       console.warn("Push notifications permissions not granted.");
  //       return null;
  //     }
  //   }
  //   const tokenData = await Notifications.getExpoPushTokenAsync();
  //   return tokenData.data;
  // };
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });
  useEffect(() => {
    const isLogin = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        router.replace('/Home');
      }
    };
    isLogin();

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <View style={{ flex: 1 }} className="bg-gray-100">
      <StatusBar backgroundColor="#3243da" barStyle="light-content" />
      <View className="h-[25vh] w-[100%] bg-[#3243da] rounded-br-[80%]">
        <Image source={require('./../assets/images/login.png')} className="scale-95 -ml-[12%] h-full w-[100%]" />
      </View>
      <ScrollView className="flex-1">
        <View className="px-6 mt-5">
          <Text className="text-center text-2xl font-semibold tracking-wider text-blue-900 uppercase font-boldM">Hi, Student</Text>
          <Text className="my-4 text-center tracking-wider text-blue-900 font-regularM">
            Login to find all your exam, fees, notice, and school-related details.
          </Text>
        </View>
        {forgot ? (
          <View className="px-10 w-full">
            <Text className="text-blue-900 font-semibold text-xl tracking-wider m-1 font-mediumM">Email *</Text>
            <TextInput
              className="w-full p-2 bg-white rounded-lg border-[3px] text-blue-900 border-blue-900 mb-4 text-lg shadow-xl"
              placeholder="Registered email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setForgot(!forgot)}>
              <Text className="mb-4 text-blue-600 text-xl font-regularM">*Login</Text>
            </TouchableOpacity>
            {loading ? (
              <TouchableOpacity className="w-full p-2 bg-[#3243da] rounded-lg">
                <Text className="font-boldM text-center text-white text-lg font-semibold uppercase tracking-wider">
                  Loading .....
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className="w-full p-2 bg-[#3243da] rounded-lg" onPress={sendResetLink}>
                <Text className="font-boldM text-center text-white text-lg font-semibold uppercase tracking-wider">
                  Send Reset Link
                </Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View className="px-10 w-full">
            <Text className="text-blue-900 font-semibold text-xl tracking-wider m-1 font-mediumM">Student ID *</Text>
            <TextInput
              className="w-full p-2 bg-white rounded-lg border-[3px] text-blue-900 border-blue-900 mb-4 text-lg shadow-xl uppercase"
              placeholder="Student ID"
              value={id}
              onChangeText={setId}
              autoCapitalize="none"
            />
            <Text className="text-blue-900 font-semibold text-xl tracking-wider m-1 font-mediumM">Password *</Text>
            <TextInput
              className="w-full p-2 bg-white rounded-lg border-[3px] text-blue-900 border-blue-900 mb-4 text-lg"
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity onPress={() => setForgot(!forgot)}>
              <Text className="mb-4 text-blue-600 font-regularM">*Forgot Password</Text>
            </TouchableOpacity>
            {loading ? (
              <TouchableOpacity className="w-full p-2 bg-[#3243da] rounded-lg">
                <Text className="font-boldM text-center text-white text-lg font-semibold uppercase tracking-wider">
                  Loading .....
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity className="w-full p-2 bg-[#3243da] rounded-lg" onPress={handleLogin}>
                <Text className="font-boldM text-center text-white text-lg font-semibold uppercase tracking-wider">
                  Login
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
      {!isKeyboardVisible && (
        <View className="h-[16vh] bg-[#3243da] rounded-tl-[80%] flex items-center justify-end">
          <Text className="text-center text-xs text-white font-mediumM mb-1">Powered by WeTSolutions</Text>
        </View>
      )}
    </View>
  );
}
