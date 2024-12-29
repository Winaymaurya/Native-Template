import { View, Text,TouchableOpacity,ScrollView } from 'react-native'
import React,{useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const Class = () => {
  const router=useRouter()
  return (
    <View>
    <View className="bg-[#3243da] justify-start p-3 flex-row items-center">
        <TouchableOpacity onPress={() => router.push('/Home')}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text className="text-2xl tracking-wider text-white ml-4 font-mediumM">
         Class
        </Text>
      </View>
    </View>
  )
}

export default Class