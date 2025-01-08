import { View, Text, TouchableOpacity,ScrollView,StyleSheet ,FlatList} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
// import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { DataTable, Card} from 'react-native-paper';
import apiClient from '../utils/axiosInstance';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
// Request permissions and get push token
// export async function registerForPushNotificationsAsync() {
//   let token;
//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//       sound:true
//     });
//   }

//   const { status: existingStatus } = await Notifications.getPermissionsAsync();
//   let finalStatus = existingStatus;
//   if (existingStatus !== 'granted') {
//     const { status } = await Notifications.requestPermissionsAsync();
//     finalStatus = status;
//   }
//   if (finalStatus !== 'granted') {
//     alert('Failed to get push token for push notification!');
//     return;
//   }

//   token = (await Notifications.getExpoPushTokenAsync()).data;
//   console.log('Push Token:', token);
//   return token;
// }

// Set notification handler
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });

const Class = () => {
  const router = useRouter();
  const [schedule, setSchedule] = useState([])
   const [loading, setLoading] = useState(false)
  // const [expoPushToken, setExpoPushToken] = useState('');

  // Schedule a notification
  // const scheduleNotification = async () => {
  //   await Notifications.scheduleNotificationAsync({
  //     content: {
  //       title: 'Reminder!',
  //       body: 'Please Complete Your HomeWork',
  //       sound: 'default', 
  //     },
  //     trigger: {seconds:10}
  //   });
    
  // };



  const getSchedule=async()=>{
    setLoading(true)
    try {
      const {data}=await apiClient.get('schedule')
      if(data?.success){
        console.log(data?.data)
        setSchedule(data?.data)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      
    }
  }


  // Updated Schedule with Periods
  // const schedule = [
  //   {
  //     __v: 0,
  //     _id: "677bf4671c51352444cc79dc",
  //     className: { _id: "669ebe8e9e781aebdd475107", name: "9th" },
  //     duration: 60,
  //     endTime: "2025-01-10T15:30:00.000Z",
  //     period: 1,
  //     school: { _id: "669ebd2f04cda264b7b4dbb6", name: "MJRP Public School" },
  //     section: { _id: "669ebf3d9e781aebdd475123", name: "A" },
  //     startTime: "2025-01-10T14:30:00.000Z",
  //     subject: "Mathematics",
  //     teacher: { _id: "669ec2795aa23cdf4370c019", firstName: "Iron", lastName: "Man" },
  //   },
  // ];
  // Header Component
  const TableHeader = () => (
    <View className="flex-row bg-[#3243da]  py-3 rounded-tl-2xl">
      <Text className="w-[18%] text-white font-mediumM text-center text-lg  ">Period</Text>
      <Text className={`flex-1 text-white font-mediumM text-center text-lg `}>Subject</Text>
      <Text className="flex-1 text-white font-mediumM text-center text-lg">Teacher</Text>
      <Text className="flex-1 text-white font-mediumM text-center text-lg">Time</Text>
    </View>
  );
  const renderRow = ({ item, index }) => (
    <View>


   {!loading ? 
   <View key={index}
      className={`flex-row border-b border-gray-200 py-2 ${
        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
      }`}
      
    >
      {/* Period */}
      <Text className="text-xl text-center text-gray-600 w-[18%] font-regularM tracking-tighter border-r border-gray-300 py-2">
        {item.period}
      </Text>
      {/* Subject */}
      <Text className="flex-1 text-center text-gray-800 font-regularM border-r border-gray-300 px-2 py-4">
        {item.subject}
      </Text>
      {/* Teacher */}
      <Text className="flex-1 text-center text-gray-800 font-regularM border-r border-gray-300 py-4">
        {`${item.teacher.firstName} ${item.teacher.lastName}`}
      </Text>
      {/* Start and End Time */}
      <Text className="flex-1 text-center text-gray-800 font-regularM py-4">
  {new Date(item.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })} -{' '}
  {new Date(item.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
</Text>

    </View>:  <ActivityIndicator
    animating={true}
    color={'#3243da'}
    size={46}
    className="my-32"
  />}     </View>
  );

  useEffect(() => {
    getSchedule()
    // Register for push notifications
    // registerForPushNotificationsAsync().then(token => {
    //   if (token) {
    //     setExpoPushToken(token);
    //   }
    // });

    // Schedule the notification automatically when the component loads
    // scheduleNotification();
  }, []);

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
      {/* Notifications */}
      {/* <View className="p-4">
        <Text className="text-lg">Push Token:</Text>
        <Text>{expoPushToken || 'Fetching push token...'}</Text>
      </View> */}


      {/* Class Shedule */}
    
      <ScrollView className=" bg-gray-100 p-4 mx-2 mt-8">
     
      <View className="rounded-tl-3xl shadow bg-white border-[3px] border-[#3243da]">
        <TableHeader />
        <FlatList
          data={schedule}
          keyExtractor={(item) => item.id}
          renderItem={renderRow}
          scrollEnabled={false} // Let parent ScrollView handle scrolling
        />
      </View>
    </ScrollView>
    </View>
  );
};

export default Class;


