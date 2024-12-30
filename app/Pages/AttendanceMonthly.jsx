import { View, Text,TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
const AttendanceMonthly = () => {
  const router = useRouter();
  const months = [
    { name: 'JAN', present: 20, absent: 5, leave: 2 },
    { name: 'FEB', present: 18, absent: 7, leave: 3 },
    { name: 'MAR', present: 22, absent: 3, leave: 1 },
    { name: 'APR', present: 23, absent: 3, leave: 0 },
    { name: 'MAY', present: 19, absent: 6, leave: 2 },
    { name: 'JUN', present: 21, absent: 4, leave: 1 },
    { name: 'JUL', present: 22, absent: 2, leave: 0 },
    { name: 'AUG', present: 18, absent: 8, leave: 1 },
    { name: 'SEP', present: 24, absent: 1, leave: 0 },
    { name: 'OCT', present: 20, absent: 5, leave: 2 },
    { name: 'NOV', present: 19, absent: 6, leave: 3 },
    { name: 'DEC', present: 21, absent: 4, leave: 1 },
  ];
  return (
    <View>


<View className="bg-[#3243da] justify-start p-3 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text className="text-xl tracking-wider text-white ml-4 font-mediumM">
          Attendance Monthly
        </Text>
      </View>
      {/* Add your page content here */}
      <ScrollView className='mx-4 mt-4 mb-16'>
        <Text className='font-mediumM text-xl text-blue-900 mb-4'>Session : 2024-25</Text>
        {/* Container  */}
        <View>
          {/* single */}
          {months.map((month, index) => (
        <View key={index} className="flex-row justify-evenly mb-4">
          {/* Month Name */}
          <TouchableOpacity className="bg-blue-900 h-16 w-[16%] rounded-full p-2 flex items-center justify-center" onPress={()=>router.push('Pages/AttendanceDetail')}>
            <Text className="text-white font-mediumM text-lg">{month.name}</Text>
          </TouchableOpacity>

          {/* Present */}
          <View className="bg-green-100 w-[23%] flex items-center justify-center rounded-lg">
            <Text className="text-green-700 font-mediumM text-xl text-center">{month.present}</Text>
            <Text className="text-green-700 font-mediumM text-sm text-center">Present</Text>
          </View>

          {/* Absent */}
          <View className="bg-red-100 w-[23%] flex items-center justify-center rounded-lg">
            <Text className="text-red-700 font-mediumM text-xl text-center">{month.absent}</Text>
            <Text className="text-red-700 font-mediumM text-sm text-center">Absent</Text>
          </View>

          {/* Leave */}
          <View className="bg-blue-100 w-[23%] flex items-center justify-center rounded-lg">
            <Text className="text-blue-700 font-mediumM text-xl text-center">{month.leave}</Text>
            <Text className="text-blue-700 font-mediumM text-sm text-center">Leave</Text>
          </View>
        </View>
      ))}
          
        </View>
      </ScrollView>
    </View>
    
  )
} 


export default AttendanceMonthly