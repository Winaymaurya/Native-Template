import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import React, { useState ,useEffect} from 'react';
import { useRouter } from "expo-router";
import axios from "axios";
import baseURL from "../../baseURL";
const Register = () => {
    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async () => {
      
        if (!phone || !password || !name) {
            return Alert.alert("Error", "Please enter all the fields.");
          }
          
         try {
         const payload = { phone, name, password };
      
          let response;
          
          
            if (role === 'parent') {
              response = await axios.post( baseURL +`registerParent`, payload);
            } else if (role === 'teacher') {
              response = await axios.post( baseURL + `registerTeacher`, payload);
            }
          
            const data = response?.data;
            console.log(data);  // Log data to inspect its structure
          
            if (data?.success) {
              Alert.alert("Success", data?.message || "Registration successful.");
              router.push('/SignIn');
            } else {
              Alert.alert("Error", data?.message || "An error occurred during registration.");
            }
          
          } catch (error) {
            console.error(error);
            Alert.alert("Error", "Unable to register. Please try again later.");
          }
          
      };
    

const isLogin=async()=>{

  const token = await AsyncStorage.getItem('token');
  const role = await AsyncStorage.getItem('role');
  if(token && role=='parent'){
    router.push('/ParentHome')
  }
  if(token && role=='teacher'){
    router.push('/ParentHome')
  }

}
useEffect(()=>{
    isLogin()
},[])
  return (
    <View className="h-[110vh] bg-green-200 pt-12 flex justify-center items-center">
      <Text className="text-3xl text-center tracking-widest">Register</Text>
     

      <View className="p-10 w-full">
      <View className="flex flex-row justify-around mb-4">
          <TouchableOpacity
            className={`flex items-center border-2 border-gray-700 rounded-xl w-48 px-2 py-1 ${role === 'teacher' ? 'bg-gray-700 text-white' : ''}`}
            onPress={() => setRole('teacher')}
          >
            <Text className={`text-xl ${role === 'teacher' ? 'text-white' : ''}`}>Teacher</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex items-center border-2 border-gray-700 rounded-xl w-48 px-2 py-1 ${role === 'parent' ? 'bg-gray-700 text-white' : ''}`}
            onPress={() => setRole('parent')}
          >
            <Text className={`text-xl ${role === 'parent' ? 'text-white' : ''}`}>Student/Parent</Text>
          </TouchableOpacity>
        </View> 
        <TextInput
          className="w-full p-3 bg-white rounded-lg border border-gray-300 mb-4 text-lg"
          placeholder="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
        />
        <TextInput
          className="w-full p-3 bg-white rounded-lg border border-gray-300 mb-4 text-lg"
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          autoCapitalize="none"
        />
        <TextInput
          className="w-full p-3 bg-white rounded-lg border border-gray-300 mb-6 text-lg"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

          {/* Register Button */}
        <TouchableOpacity className="w-full p-3 bg-blue-600 rounded-lg" onPress={handleRegister}>
          <Text className="text-center text-white text-lg font-semibold">Register</Text>
        </TouchableOpacity>

          {/* Login Navigation */}
          <View className="flex flex-row justify-between mt-4">
          <TouchableOpacity onPress={() => router.push('/SignIn')}>
            <Text className="text-blue-500 text-sm font-semibold">
              Already Registered? <Text className="underline">Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
        </View> 


      <View className="w-full px-10 flex justify-center items-center">
        <Image source={require("../../assets/images/teacher.png")} className="h-[400px] w-full" />
      </View>
    </View>
  )
}

export default Register