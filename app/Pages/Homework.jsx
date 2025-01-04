import { View, Text, TouchableOpacity, ScrollView ,Alert,Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import CheckBox from 'react-native-check-box';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../utils/axiosInstance';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
const Homework = () => {
  const [selectedHomework, setSelectedHomework] = useState({});
  const router = useRouter();
  const [homework, setHomework] = useState([])
  const [loading, setLoading] = useState(false)
  // Sample array of homework items
  const openExternalLink = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open this link.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong while trying to open the link.');
    }
  };

  // Save completed homework to AsyncStorage
const getHomework=async()=>{
  setLoading(true)
  try {
    const {data}=await apiClient.get('/task/student')
    if(data?.success){
      setHomework(data?.data)
      Alert.alert(data?.message)
    }
    setLoading(false)
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}

  const saveCompletedHomework = async (data) => {
    try {
      await AsyncStorage.setItem('@completedHomework', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving completed homework:', error);
    }
  };

  // Load completed homework from AsyncStorage
  const loadCompletedHomework = async () => {
    try {
      const storedData = await AsyncStorage.getItem('@completedHomework');
      if (storedData) {
        setSelectedHomework(JSON.parse(storedData));
      }
    } catch (error) {
      console.error('Error loading completed homework:', error);
    }
  };

  // Toggle selection of homework
  const toggleSelection = (id) => {
    setSelectedHomework((prevState) => {
      const updatedState = { ...prevState, [id]: !prevState[id] };
      saveCompletedHomework(updatedState); // Save updated state to AsyncStorage
      return updatedState;
    });
  };


  // Load completed homework on component mount
  useEffect(() => {
    loadCompletedHomework();
     getHomework()
  }, []);

  return (
    <View>
      <View className="bg-[#3243da] justify-start p-3 flex-row items-center">
        <TouchableOpacity onPress={() => router.push('/Home')}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text className="text-xl tracking-wider text-white ml-4 font-mediumM">
          Homework
        </Text>
      </View>
      {!loading? 
      <ScrollView className="mb-16">
        <View className="mx-4 mt-4">
          <Text className="text-blue-900 font-mediumM text-xl mb-2">Today</Text>
        </View>
        {homework?.map((item) => (
         <View key={item._id} className="mx-4 mb-4 border-2 border-[#3243da] rounded-2xl">
         <View
           className={`${
             selectedHomework[item._id] ? 'bg-[#d8f0df]' : 'bg-[#d7e6f8]'
           } flex-row items-center p-2  rounded-2xl min-h-[14vh]`}
         >
           <CheckBox
             style={{
               transform: [{ scale: 1.4 }],
               paddingLeft: 6,
             }}
             onClick={() => toggleSelection(item._id)} // Toggle checkbox state
             isChecked={selectedHomework[item._id]}
             checkBoxColor="blue"
           />
           <View className="px-4 pl-6 w-[90%]">
           <View className="mt-2 flex-row justify-between w-[100%] flex-wrap">
               <Text className="font-mediumM text-blue-800">{item.date.split('T')[0]}</Text>
             <Text className="font-mediumM text-md text-wrap text-blue-800">
                {item.subject}
               </Text>
              

             </View>
               <Text className="font-mediumM text-lg text-wrap mt-1 text-blue-800">
                 {item.title}
               </Text>
              
             <Text className="font-mediumM text-md text-gray-500 mt-1 text-wrap ">
               {item.description} 
             </Text>
       
       
             <View className="mt-2 flex-row justify-between items-center w-[98%] flex-wrap">
            
             {item?.file && (
               <View>
                 <TouchableOpacity
                   onPress={() =>
                     openExternalLink(
                       `https://school-management-system-sms.s3.amazonaws.com/${item?.file}`
                     )
                   }
                   className=""
                 >
                   <Text className="text-blue-600 font-mediumM underline">
                     Open Attachment
                   </Text>
                 </TouchableOpacity>
               </View>
             )}
               <Text className="font-mediumM text-blue-800">
                 By- {item.createdBy.firstName} {item.createdBy.lastName}
               </Text>
              

             </View>
           </View>
         </View>
       </View>
       
        ))}
      </ScrollView>:  <ActivityIndicator animating={true} color={'#3243da'} size={46} className='mt-20' />}
    </View>
  );
};

export default Homework;
