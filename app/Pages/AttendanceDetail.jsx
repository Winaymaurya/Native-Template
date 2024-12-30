import { View, Text,TouchableOpacity,ScrollView, Alert } from 'react-native'
import {useEffect} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import apiClient from './../utils/axiosInstance'
import AsyncStorage from '@react-native-async-storage/async-storage';
const AttendanceDetail = () => {
    const router=useRouter()
    const attendanceData = {
        '2024-01-01': { status: 'present' }, // Green
        '2024-01-02': { status: 'absent' },  // Red
        '2024-01-03': { status: 'present' }, // Green
        '2024-01-04': { status: 'absent' },  // Red
        // Add more dates for the month
      };
      const getDayStyle = (date) => {
        if (attendanceData[date]) {
          if (attendanceData[date].status === 'present') {
            return { backgroundColor: 'green', padding: 1 };
          } else if (attendanceData[date].status === 'absent') {
            return { backgroundColor: 'red',  padding: 1 };
          }
        }
        return {}; 
      };
    const getstudentAttendance=async()=>{
      const student=await AsyncStorage.getItem("studentId")
      const endDate=new Date().toISOString().split("T")[0];;
      const startDate= '2024-03-01'
      // console.log(student,endDate,startDate)
      try {
        const { data } = await apiClient.get(`attendance/student`, {
          params: {
            student,
            startDate,
            endDate,
          },
        });
        console.log(data?.data)
        if(data?.success){
          Alert.alert(data?.message)
        }
      } catch (error) {
        console.log(error)
        
      }
    }

      // Prepare markedDates with custom styles
      const markedDates = Object.keys(attendanceData).reduce((acc, date) => {
        acc[date] = {
          marked: true,
          dotColor: 'transparent', // Hide the default dot
          selected: true, // Allow the selected state to still be applied
          customStyles: {
            container: getDayStyle(date), // Apply custom style
          },
        };
        return acc;
      }, {});

      useEffect(()=>{
      //  getstudentAttendance()
      },[])
  return (
    <View>
      <View className="bg-[#3243da] justify-start p-3 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text className="text-2xl tracking-wider text-white ml-4 font-mediumM">
          Attendance Detail
        </Text>
      </View>

      <View className='mx-4 mt-6'>
        <View className='mb-8'><Text className='text-blue-900 font-mediumM text-xl tracking-wider'>Monthly Calendar</Text></View>
    
        <Calendar
        current={'2024-01-01'}
        monthFormat={'dd - MMMM - yyyy'}
        markedDates={markedDates}
        style={{ marginBottom: 10, height: 380 }}
        markingType="custom"
      />
      </View>
    </View>
  )
}

export default AttendanceDetail