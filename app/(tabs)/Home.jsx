import { View, Text,Alert } from 'react-native'
import React,{useEffect,useState} from 'react'
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [name, setName] = useState('')

  const getData=async()=>{
    const token = await AsyncStorage.getItem('token');
    const name = await AsyncStorage.getItem('name');
    setName(name)

  }
const handleLogout=async()=>{
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('name');
  await AsyncStorage.removeItem('role');
  Alert.alert("Logged out", "You have been logged out successfully.");
  router.push('/SignIn');
}

  useEffect(()=>{
 getData()
  },[])
  return (
    <>
   
    <View className='flex flex-row justify-evenly mt-3 bg-red-100'>
   
    <TouchableOpacity className=' bg-blue-700 w-[45%] h-[20vh] flex justify-center items-center rounded-lg'
       onPress={() => router.replace('/(tabs)/Badminton')}
      >
      <Text className='text-3xl text-gray-100' >Badminton</Text>
      <MaterialCommunityIcons name="badminton" size={40} color={'white'} />
    </TouchableOpacity>

    <TouchableOpacity className='bg-blue-700 w-[45%] h-[20vh] flex justify-center items-center rounded-lg'
    onPress={() => router.replace('/(tabs)/Football')}>
      <Text className='text-3xl text-gray-100' >Football</Text>
      <Ionicons name="football" size={40} color={'white'} />
    </TouchableOpacity>
   
    </View>
    <View>
      <TouchableOpacity onPress={handleLogout} className='text-xl bg-red-400'>
      <Text>Logout {name}</Text> 
      </TouchableOpacity>
    </View>
     </>
  )
}

export default Home