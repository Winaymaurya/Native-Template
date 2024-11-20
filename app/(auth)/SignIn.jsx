import { View, Text, TextInput, TouchableOpacity, Alert, Image } from "react-native";
import React, { useState,useEffect } from 'react'
import { router, useRouter } from "expo-router";
import axios from "axios";
import baseURL from "../../baseURL";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState('')
    const handleLogin = async() => {
        if (!phone || !password ) {
            Alert.alert("Error", "Please enter both phone and password.");
            return;
        }
        try {
            let response;
    
          const payload={phone, password}
            if (role === 'parent') {
              response = await axios.post( `http://192.168.1.7:8080/api/v1/loginParent`, payload);
            } 
             if (role === 'teacher') {
              response = await axios.post( `http://192.168.1.7:8080/api/v1/loginTeacher`, payload);
            }
          
            const data = response?.data;
            if(data?.success){
                console.log(data?.data)
                await AsyncStorage.setItem('token', data?.token);
                await AsyncStorage.setItem('name', data?.data.name);
                await AsyncStorage.setItem('role', data?.data.role);
                await AsyncStorage.setItem('id', data?.data._id);
                Alert.alert("Success",data?.message)

                {role =='parent' ? router.replace('/ParentHome')  :router.replace('/TeacherHome') }
                   
            }
            else{
                Alert.alert("Error",data?.message)
            }

         } catch (error) {
            console.log(error)
            
         }
    };
    const isLogin=async()=>{

        const token = await AsyncStorage.getItem('token');
        const role = await AsyncStorage.getItem('role');
        if(token && role=='parent'){
          router.replace('/ParentHome')
        }
        if(token && role=='teacher'){
          router.replace('/TeacherHome')
        }
    
      }
      useEffect(()=>{
          isLogin()
      },[])
    return (
    
            <View className='h-[110vh] bg-red-200 pt-12 flex justify-center items-center  '>
                <Text className='text-3xl text-center tracking-widest'>SignIn</Text>
                <View className='p-10 w-full'>



                 <View className='flex flex-row justify-around mb-4'>
                    <TouchableOpacity  className={` flex items-center border-2 border-gray-700 rounded-xl w-48 px-2 py-1 ${role=='teacher' ? 'bg-gray-700 text-white' : ''}`} onPress={()=>setRole('teacher')}>
                        <Text className={`text-xl ${role=='teacher'?'text-white':''}`}>Teacher</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className={` flex items-center border-2 border-gray-700 rounded-xl w-48 px-2 py-1 ${role=='parent' ? 'bg-gray-700 ' : ''}`}
                    onPress={()=>setRole('parent')}>
                        <Text className={`text-xl ${role=='parent'?'text-white':''}`}>Student/Parent</Text>
                    </TouchableOpacity>
                 </View>

                    <TextInput
                        className="w-full p-3 bg-white rounded-lg border border-gray-300 mb-4 text-lg"
                        placeholder="Phone"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone"
                        autoCapitalize="none"
                    />

                    <TextInput
                        className="w-full p-3 bg-white rounded-lg border border-gray-300 mb-6 text-lg"
                        placeholder="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    <TouchableOpacity
                        className="w-full p-3 bg-blue-600 rounded-lg"
                        onPress={handleLogin}
                    >
                        <Text className="text-center text-white text-lg font-semibold">Log In</Text>
                    </TouchableOpacity>
                    <View className='flex flex-row justify-between'>
                        <TouchableOpacity
                            className="mt-4"
                            onPress={() => Alert.alert("Forgot Password")}
                        >
                            <Text className="text-blue-500 text-sm font-semibold">Forgot Password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="mt-4"
                            onPress={() => router.push('/Register')}
                        >
                            <Text className="text-blue-500 text-sm font-semibold">Register </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className=' w-full px-10 flex justify-center items-center'>
                    <Image source={require("../../assets/images/teacher.png")} className='h-[400px] w-full'></Image></View>

            </View>
 
    )
}

export default SignIn