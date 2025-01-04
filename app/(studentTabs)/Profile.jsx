import { View, Text, Alert, Image, ScrollView, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from 'react-native-paper';
import apiClient from "./../utils/axiosInstance";
import * as ImagePicker from 'expo-image-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
const Profile = () => {
  const router = useRouter()
  const [student, setStudent] = useState([])
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)
  const getProfile = async () => {
    setLoading(true)
    try {
      const id = await AsyncStorage.getItem('studentId')
      const { data } = await apiClient.get(`student/${id}`)
      setStudent(data?.data)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  const handleLogout = async = () => {
    router.replace('/')
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('name');
    AsyncStorage.removeItem('id');
    Alert.alert("Logged out", "You have been logged out successfully.");
  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      setImage(imageUri);
      await AsyncStorage.setItem('profilePhoto', imageUri);
    }
  };
   const loadImage = async () => {
      const savedImage = await AsyncStorage.getItem('profilePhoto');
      if (savedImage) {
        setImage(savedImage);
        console.log(savedImage)
      }
    };
  useEffect(() => {
    getProfile()
    

    loadImage(); 
  }, [])
  return (
    <ScrollView className="flex-1 bg-gray-100 px-4 py-1">
      {/* Profile Header */}
      {/* Profile Header with Background Image */}
      <TouchableOpacity className=' border-2 border-red-600 px-4 rounded-xl  absolute bottom-2  right-0 flex-row justify-center items-center' onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="red" /><Text className='text-md font-mediumM text-red-600 p-1 text-center flex-row items-center'> Logout</Text>
      </TouchableOpacity>
       {/* Sticky Header */}
     
        <View
        
          className="h-44 bg-center rounded-lg p-6 justify-center items-center mt-2 bg-[#3243da]"
        >
         <View className="flex-row items-end">
      {image ? (
        <Image
          source={{ uri: image }}
          className="w-24 h-24 rounded-full mb-2"
        />
      ) : (
        <Image
          source={{
            uri: 'https://randomuser.me/api/portraits/men/32.jpg',
          }}
          className="w-24 h-24 rounded-full mb-2"
        />
      )}
      <TouchableOpacity className="-ml-4 mb-2" onPress={pickImage}>
        <Ionicons name="camera-reverse" size={32} color="white" />
      </TouchableOpacity>
    </View>
          <Text className="text-xl font-mediumM text-white tracking-wider">
            {student?.firstName} {student?.lastName}
          </Text>
          <Text className="text-sm font-mediumM text-white tracking-wider">
            {student?.className?.name} {student?.section?.name}
          </Text>
        </View>
      
     {!loading?
  <View>
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
       
      </View>
      {/* Transport Details */}
  {student?.transport ?     <View className="bg-white rounded-lg shadow-md p-6 mt-4 mb-12">
        <Text className="text-lg font-mediumM text-blue-900 mb-4">Transport Details</Text>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600 font-mediumM">Bus Name:</Text>
          <Text className="text-blue-800 font-mediumM"> {student?.transport?.bus?.name}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600 font-mediumM">Bus Number:</Text>
          <Text className="text-blue-800 font-mediumM"> {student?.transport?.bus?.number}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600 font-mediumM">Driver Name:</Text>
          <Text className="text-blue-800 font-mediumM"> {student?.transport?.bus?.driver?.name}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600 font-mediumM">Driver Phone:</Text>
          <Text className="text-blue-800 font-mediumM"> {student?.transport?.bus?.driver?.phone}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600 font-mediumM">Route Name:</Text>
          <Text className="text-blue-800 font-mediumM"> {student?.transport?.route?.name}</Text>
        </View>
        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600 font-mediumM">Charge:</Text>
          <Text className="text-blue-800 font-mediumM">Rs {student?.transport?.route?.charges}</Text>
        </View>
        
      </View>: '' }

      </View> : 
      <View className='h-[80vh]'>

        <ActivityIndicator animating={true} color={'blue'} size={'large'} className='mt-20'/>
      </View>
        }
    </ScrollView>
  )
}

export default Profile