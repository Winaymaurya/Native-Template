import { View, Text, Alert, Image, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

import apiClient from "./../utils/axiosInstance";
const Profile = () => {
  const router = useRouter()
  const [student, setStudent] = useState([])
  const getProfile = async () => {
    try {
      const id = await AsyncStorage.getItem('studentId')
      const { data } = await apiClient.get(`student/${id}`)
      console.log(data?.data)
      setStudent(data?.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleLogout = async = () => {
    router.replace('/')
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('name');
    AsyncStorage.removeItem('id');
    Alert.alert("Logged out", "You have been logged out successfully.");
  }

  useEffect(() => {
    getProfile()
  }, [])
  return (
    <ScrollView className="flex-1 bg-gray-100 px-4 py-1">
      {/* Profile Header */}
      {/* Profile Header with Background Image */}
      <TouchableOpacity className=' border-2 border-red-600 w-24 rounded-3xl  absolute right-0' onPress={handleLogout}>
        <Text className='text-md font-mediumM text-red-600 p-1 text-center'>Logout</Text>
      </TouchableOpacity>
       {/* Sticky Header */}
     
        <ImageBackground
          source={{
            uri: 'https://img.freepik.com/free-vector/gradient-blue-background_23-2149347096.jpg?t=st=1735230231~exp=1735233831~hmac=b0ac2150a4f815ab509742e357df64e27cf156c85b585967cc87c43d08f90133&w=2000',
          }}
          resizeMode="cover"
          className="h-44 bg-center rounded-lg p-6 justify-center items-center mt-10"
        >
          <Image
            source={{
              uri: 'https://randomuser.me/api/portraits/men/32.jpg',
            }}
            className="w-20 h-20 rounded-full mb-4"
          />
          <Text className="text-xl font-mediumM text-white tracking-wider">
            {student?.firstName} {student?.lastName}
          </Text>
          <Text className="text-sm font-mediumM text-white tracking-wider">
            {student?.className?.name} {student?.section?.name}
          </Text>
        </ImageBackground>
     

      {/* Profile Details */}
      <View className="bg-white rounded-lg shadow-md p-6 mt-2">
        <Text className="text-lg font-mediumM text-gray-800 mb-4">Student Details</Text>
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-600 font-mediumM">Student Id:</Text>
          <Text className="text-blue-800 font-mediumM">{student?.studentId}</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-600 font-mediumM">Roll Number:</Text>
          <Text className="text-blue-800 font-mediumM">{student?.rollNumber}</Text>
        </View>
        <View className="flex-row justify-between mb-1 ">
          <Text className="text-gray-600 font-mediumM">Email:</Text>
          <Text className="text-blue-800 font-mediumM">{student?.email}</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-600 font-mediumM">Contact:</Text>
          <Text className="text-blue-800 font-mediumM">{student?.phone}</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-600 font-mediumM">Gender:</Text>
          <Text className="text-blue-800 font-mediumM capitalize">{student?.gender}</Text>
        </View>

        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-600 font-mediumM">Date of Birth:</Text>
          <Text className="text-blue-800 font-mediumM">{student?.dateOfBirth?.split('T')[0]}</Text>
        </View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-gray-600 font-mediumM">Enrollment Date:</Text>
          <Text className="text-blue-800 font-mediumM">{student?.enrollmentDate?.split('T')[0]}</Text>
        </View>
      </View>
      {/* address */}
      <View className="bg-white rounded-lg shadow-md p-6 mt-4">
        <Text className="text-lg font-mediumM text-blue-900 mb-4">Address Details</Text>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600 font-mediumM">Landmark:</Text>
          <Text className="text-blue-800 font-mediumM">{student?.address?.landmark}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600 font-mediumM">City:</Text>
          <Text className="text-blue-800 font-mediumM">{student?.address?.city}</Text>
        </View>
        <View className="flex-row justify-between mb-2 ">
          <Text className="text-gray-600 font-mediumM">PinCode:</Text>
          <Text className="text-blue-800 font-mediumM">{student?.address?.pinCode}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600 font-mediumM">State:</Text>
          <Text className="text-blue-800 font-mediumM">{student?.address?.state}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-600 font-mediumM">Date of Birth:</Text>
          <Text className="text-blue-800 font-mediumM">{student?.dateOfBirth?.split('T')[0]}</Text>
        </View>
      </View>
      {/* Parent Details */}
      <View className="bg-white rounded-lg shadow-md p-6 mt-4">
        <Text className="text-lg font-mediumM text-blue-900 mb-4">Parents Details</Text>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600 font-mediumM">Father Name:</Text>
          <Text className="text-blue-800 font-mediumM">Mr. {student?.parent?.fatherName}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600 font-mediumM">Mother Name:</Text>
          <Text className="text-blue-800 font-mediumM">Mrs. {student?.parent?.motherName}</Text>
        </View>
        <View className="flex-row justify-between mb-2 ">
          <Text className="text-gray-600 font-mediumM">Father Phone:</Text>
          <Text className="text-blue-800 font-mediumM">{student?.parent?.fatherPhone}</Text>
        </View>
        <View className="flex-row justify-between mb-2 ">
          <Text className="text-gray-600 font-mediumM">Father Email:</Text>
          <Text className="text-blue-800 font-mediumM">{student?.parent?.fatherEmail}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600 font-mediumM">Mother Phone:</Text>
          <Text className="text-blue-800 font-mediumM">{student?.parent?.motherPhone}</Text>
        </View>
        <View className="flex-row justify-between">
          <Text className="text-gray-600 font-mediumM">Date of Birth:</Text>
          <Text className="text-blue-800 font-mediumM">{student?.dateOfBirth?.split('T')[0]}</Text>
        </View>
      </View>

      
    </ScrollView>
  )
}

export default Profile