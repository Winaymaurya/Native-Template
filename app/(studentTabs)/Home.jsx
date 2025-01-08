import { View, Text, TouchableOpacity, ScrollView,Image,Dimensions ,Alert} from 'react-native';
import {useEffect,useState} from 'react';
import { useRouter } from 'expo-router';
import { BarChart } from 'react-native-chart-kit';
import { PieChart } from 'react-native-chart-kit';
import apiClient from '../utils/axiosInstance';

import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = () => {
  const screenWidth = Dimensions.get('window').width;
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
 
  const data = [
    {
      name: "Present",
      attendance:presentCount,
      color: "#b0e8c0",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Absent",
      attendance: absentCount,
      color: "#ed9fa9",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  

  ];
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState(new Date())
  const colors = ['bg-red-100', 'bg-blue-100', 'bg-green-100','bg-purple-100'];
  const router = useRouter();
  const getNotice = async () => {
    setLoading(true)
    try {
      const { data } = await apiClient.get("/notice")
      if (data?.success) {
        setNotices(data?.data)
        
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const getstudentAttendance=async()=>{
    setLoading(true)
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
        let present = 0;
       let absent = 0;

   data?.data.forEach(({ isPresentA }) => {
      if (isPresentA) {
        present += 1;
      } else {
        absent += 1;
      }
    });
    setPresentCount(present);
    setAbsentCount(absent);
   setLoading(false)
  }
} catch (error) {
  console.log(error)
  Alert.alert(error?.message)
  setLoading(false)
      
    }
  }
useEffect(()=>{
 getNotice()
 getstudentAttendance()
},[])
  return (
    <>
      <View className="px-4 flex flex-row flex-wrap justify-around">
        <TouchableOpacity
          className="bg-[#3243da] m-1 w-[30%] h-28 mt-4 rounded-md flex justify-center items-center"
          onPress={() => router.push('Pages/AttendanceMonthly')}
        >
         <Image source={require('./../../assets/images/attendance.png')} className=" h-14 w-14" />
          <View>
            <Text className="text-white text-center w-28 py-1 text-md font-regularM">
              Attendance
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#3243da] m-1 w-[30%] h-28 mt-4 rounded-md flex justify-center items-center"
          onPress={() => router.push('Pages/Notice')}
        >
         <Image source={require('./../../assets/images/notice.png')} className=" h-14 w-16" />
          <View>
            <Text className="text-md text-white text-center w-28 p-1 font-regularM">
              Notice
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#3243da] m-1 w-[30%] h-28 mt-4 rounded-md flex justify-center items-center"
        onPress={() => router.push('Pages/Quiz')}>
        <Image source={require('./../../assets/images/test.png')} className=" h-14 w-14" />
          <View>
            <Text className="text-md text-white text-center w-28 p-1 font-regularM">
              Play Quiz
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity className="bg-[#3243da] m-1 w-[30%] h-28 mt-4 rounded-md flex justify-center items-center">
        <Image source={require('./../../assets/images/report-card.png')} className=" h-14 w-14" />
          <View>
            <Text className="text-md text-white text-center w-28 py-1 font-regularM">
              Report Card
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#3243da] m-1 w-[30%] h-28 mt-4 rounded-md flex justify-center items-center"
          onPress={() => router.push('Pages/Calendar')}
        >
          <Image source={require('./../../assets/images/calendar.png')} className=" h-14 w-14" />
          <View>
            <Text className="text-md text-white text-center w-28 py-1 font-regularM">
              Calendar
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#3243da] m-1 w-[30%] h-28 mt-4 rounded-md flex justify-center items-center"
          onPress={() => router.push('Pages/Homework')}
        >
             <Image source={require('./../../assets/images/homework.png')} className=" h-14 w-14" />
          <View>
            <Text className="text-md text-white text-center w-28 py-1 font-regularM">
              Homework
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
     <View className="px-6 mt-4">
        <Text className="text-xl text-blue-800 tracking-wider font-mediumM ">
          Notice Board
        </Text>
      </View>
{!loading ? (
  notices.length > 0 ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingRight: 20 }}
      className="space-x-4 px-4 mt-2 mr-4"
    >
      {notices.map((notice, i) => (
        <View
          key={notice._id}
          className={`${colors[i % colors.length]} p-4 rounded-lg shadow-lg min-h-26`}
          style={{
            width: 280,
            justifyContent: 'space-between', // Correct alignment
          }}
        >
          {new Date(date).toDateString() === new Date(notice.date).toDateString() ? (
            <Image
              source={require('./../../assets/images/star.png')}
              className="h-10 w-10 absolute right-2 top-2"
            />
          ) : null}

          <Text className="text-gray-600 text-sm font-regularM">
            {notice.date.split("T")[0]}
          </Text>
          <Text className="font-semibold font-mediumM text-lg mb-2">
            {notice.title}
          </Text>
          <Text className="font-semibold font-mediumM text-md mb-2">
            {notice.description}
          </Text>
        </View>
      ))}
    </ScrollView>
  ) : (
    <View className="flex justify-center items-center h-40">
      <Text className="text-gray-600 text-lg font-medium">No recent notices</Text>
    </View>
  )
) : (
  <ActivityIndicator
    animating={true}
    color={'#3243da'}
    size={46}
    className="my-16"
  />
)}


      {/* <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
        Weekly Attendance Overview
      </Text>
      <BarChart
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
          datasets: [
            {
              data: [90, 85, 100, 80, 95], // Attendance percentage for each day
            },
          ],
        }}
        width={screenWidth - 40} // Width of the chart
        height={220} // Height of the chart
        yAxisSuffix="%"
        chartConfig={{
          backgroundColor: "#1cc910",
          backgroundGradientFrom: "#eff3ff",
          backgroundGradientTo: "#efefef",
          decimalPlaces: 1, // Precision for y-axis values
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View> */}
    <View style={{ padding: 20 }}>
      <Text className='text-xl font-mediumM text-blue-800'>
        Attendance Summary
      </Text>
    {!loading? <PieChart
        data={data}
        width={screenWidth - 40}
        height={160}
        chartConfig={{
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor={"attendance"} // The key to display the data
        backgroundColor={"transparent"}
        center={[10, 0]}
       
      />: <ActivityIndicator
    animating={true}
    color={'#3243da'}
    size={46}
    className="my-16"
  />}
    </View>
    </ScrollView>
    </>
  );  
};

export default Home;
