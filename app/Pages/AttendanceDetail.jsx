import { View, Text,TouchableOpacity,ScrollView, Alert } from 'react-native'
import {useEffect,useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import apiClient from './../utils/axiosInstance'
import AsyncStorage from '@react-native-async-storage/async-storage';

const AttendanceDetail = () => {
    const router=useRouter()
    const [attendanceData, setAttendanceData] = useState([])
  
      // const getDayStyle = (date) => {
      //   if (attendanceData[date]) {
      //     if (attendanceData[date].status === 'present') {
      //       return { backgroundColor: 'green', padding: 1 };
      //     } else if (attendanceData[date].status === 'absent') {
      //       return { backgroundColor: 'red',  padding: 1 };
      //     }
      //   }
      //   return {}; 
      // };
    const getstudentAttendance=async()=>{
      const student=await AsyncStorage.getItem("studentId")
      const endDate=new Date().toISOString().split("T")[0];;
      const startDate= '2024-03-01'
      console.log(student,endDate,startDate)
      try {
        const { data } = await apiClient.get(`attendance/student`, {
          params: {
            student,
            startDate,
            endDate,
          },
        });
        
        if(data?.success){
          setAttendanceData(data?.data)
      
        }
      } catch (error) {
        console.log(error)
        Alert.alert(error?.message)
        
      }
    }

     
        const getMarkedDates = () => {
          const markedDates = {};
      
          attendanceData.forEach(({ date, isPresentA }) => {
            const formattedDate = new Date(date).toISOString().split('T')[0];
            markedDates[formattedDate] = {
              selected: true,
              marked: true,
              dotColor: 'transparent',
              selectedColor: isPresentA ? '#65AE6F' : '#EC5353',
            };
          });
      
          return markedDates;
        };
        const today = new Date().toISOString().split('T')[0];
      useEffect(()=>{
       getstudentAttendance()
      },[])
  return (
    <View>
      <View className="bg-[#3243da] justify-start p-3 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text className="text-xl tracking-wider text-white ml-4 font-mediumM">
          Attendance Detail
        </Text>
      </View>

      <View className='mx-4 mt-6'>
        <View className='mb-8'><Text className='text-blue-900 font-mediumM text-xl tracking-wider'>Monthly Calendar</Text></View>
    
      
         <Calendar
        markedDates={getMarkedDates()}
        maxDate={today}
        theme={{
          todayTextColor: 'blue',
          arrowColor: 'black',
          dotColor: 'black',
          selectedDotColor: 'white',
        }}
      />
      </View>
    </View>
  )
}

export default AttendanceDetail