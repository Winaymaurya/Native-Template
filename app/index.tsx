import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, TextInput, Image, Alert, ScrollView, Keyboard } from "react-native";
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import {
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';
import apiClient from "./utils/axiosInstance";




export default function Index() {

  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {

      if (!id || !password) {
        Alert.alert("Error", "Please enter both StudentID and password.");
        return;
      }
      setLoading(true)
      const payload = { studentId: id, password }
      console.log(payload, "hi")
      const { data } = await apiClient.post(`login/student`, payload);
      if (data?.success) {
    
        await AsyncStorage.setItem('token', data?.accessToken);
        await AsyncStorage.setItem('name', data?.data?.firstName + " " + data?.data?.lastName);
        await AsyncStorage.setItem('profile', data?.data?.profilePhoto);
        await AsyncStorage.setItem('studentId', data?.data._id);
        Alert.alert("Success", data?.message)

        router.push('/Home')
      }
      else {
        Alert.alert("Error", data?.message)
   

      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)

    }
  }
  const isLogin = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      router.replace('/Home')
    }

  }


  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_500Medium,
    Montserrat_700Bold,
  });
  // State to track keyboard visibility
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  // Effect to listen for keyboard show and hide events
  useEffect(() => {
    isLogin()
    // Show event listener
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);  // Set keyboard visibility state to true
    });

    // Hide event listener
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false); // Set keyboard visibility state to false
    });

    // Clean up listeners on component unmount
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <View style={{ flex: 1 }} className="bg-gray-100">
      {/* Top Section */}
      <View className="h-[25vh] w-[100%] bg-blue-800 rounded-br-[80%]">
        <Image source={require('./../assets/images/login.png')} className=" scale-95 -ml-[12%] h-full w-[100%]  " />
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1">
        <View className="px-6 mt-5">
          <Text className="text-center text-2xl font-semibold tracking-wider text-blue-900 uppercase font-boldM">Hi, Student</Text>
          <Text className="my-4 text-center tracking-wider text-blue-900 font-regularM">
            Login to find your all exam, fees, notice, and school-related details
          </Text>
        </View>

        <View className="px-10 w-full">
          <View><Text className="text-blue-900 font-semibold text-xl tracking-wider m-1 font-mediumM">Student ID *</Text></View>
          <TextInput
            className="w-full p-2 bg-white rounded-lg border-[3px] text-blue-900 border-blue-900 mb-4 text-lg shadow-xl uppercase"
            placeholder="Student Id"
            value={id}
            onChangeText={setId}
            autoCapitalize="none"
          />
          <View><Text className="text-blue-900 font-semibold text-xl tracking-wider m-1 font-mediumM">Password *</Text></View>
          <TextInput
            className="w-full p-2 bg-white rounded-lg border-[3px] text-blue-900 border-blue-900 mb-4 text-lg"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <View >
            <Text className="mb-2 text-blue-600 font-regularM">*Forgot Password</Text></View>

          {loading ? (
            <TouchableOpacity className="w-full p-2 bg-blue-800 rounded-lg">
              <Text className="font-boldM text-center text-white text-lg font-semibold uppercase tracking-wider">Loading .....</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity className="w-full p-2 bg-blue-800 rounded-lg" onPress={handleLogin}>
              <Text className="font-boldM text-center text-white text-lg font-semibold uppercase tracking-wider ">Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Fixed Footer */}
      {!isKeyboardVisible &&
        <View className=" h-[16vh] bg-blue-800 rounded-tl-[80%] flex items-center justify-end">
          <Text className="text-center text-xs text-white font-mediumM mb-1">Powered by WeTe Solutions</Text>
        </View>
      }

    </View>
  );
}
