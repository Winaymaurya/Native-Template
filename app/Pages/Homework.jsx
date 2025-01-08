import { View, Text, TouchableOpacity, ScrollView ,Alert,Linking } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import CheckBox from 'react-native-check-box';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../utils/axiosInstance';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
const Homework = () => {
  const [selectedHomework, setSelectedHomework] = useState({});
  const router = useRouter();
  const [homework, setHomework] = useState([])
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);


  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      getHomework(selectedDate)
    }
  };
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
const getHomework=async(d)=>{
  setLoading(true)
  try {
    const {data}=await apiClient.get(`/task/student?date=${d}`)
    if(data?.success){
      setHomework(data?.data)

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
     getHomework(date)
  }, []);

  return (
    <View>
      <View className="bg-[#3243da] p-3 flex-row  justify-between">
        <View className='flex-row' >

        
        <TouchableOpacity onPress={() => router.push('/Home')}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text className="text-xl tracking-wider text-white ml-4 font-mediumM">
          Homework
        </Text></View>
        <TouchableOpacity onPress={()=>setShowPicker(true)} className='mr-4'><FontAwesome5 name="calendar-alt" size={24} color="white" /></TouchableOpacity>
      </View>
      <View className="mx-4 mt-4">
       
        <Text className="text-blue-900 font-mediumM text-xl mb-2">
  {date.toLocaleDateString('en-US', {
    weekday: 'long', // Adds the day of the week
  })} ,
   {date.getDate().toString().padStart(2, '0')}-{(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-{date.getFullYear()}
</Text>
      </View>
      {!loading ? (
  homework.length > 0 ? (
    <ScrollView className="mb-16">
      
      {homework.map((item) => (
        <View key={item._id} className="mx-4 mb-4 border-2 border-gray-300 rounded-lg">
          <View
            className={`${
              selectedHomework[item._id] ? 'bg-[#d8f0df]' : 'bg-[#d7e6f8]'
            } flex-row items-start p-2 rounded-lg min-h-[14vh]`}
          >
            <CheckBox
              style={{ paddingLeft: 4, marginTop: 10 }}
              onClick={() => toggleSelection(item._id)}
              isChecked={selectedHomework[item._id]}
              checkBoxColor="blue"
            />
            <View className="px-4 w-[94%]">
              <View className="mt-2 flex-row justify-between w-full flex-wrap mb-2">
                <Text className="font-mediumM text-lg text-black">{item.subject}</Text>
                <Text className="font-mediumM text-gray-500 text-lg">
                  {item.date.split('T')[0].split('-').reverse().join('-')}
                </Text>
              </View>
              <Text className="font-mediumM text-xl text-black mt-1 mb-2">{item.title}</Text>
              <Text className="font-mediumM text-md text-gray-500 mt-1">{item.description}</Text>
              <View className="mt-2 flex-row justify-between items-center w-[98%] flex-wrap mb-2">
                {item?.file && (
                  <TouchableOpacity
                    onPress={() =>
                      openExternalLink(
                        `https://school-management-system-sms.s3.amazonaws.com/${item?.file}`
                      )
                    }
                  >
                    <Text className="text-blue-600 font-mediumM underline">
                      Open Attachment
                    </Text>
                  </TouchableOpacity>
                )}
                <Text className="font-mediumM text-black text-md">
                  by: {item.createdBy.firstName} {item.createdBy.lastName}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  ) : (
    <View className="mt-20">
      <Text className="text-2xl text-gray-400 text-center font-mediumM">
        No Homework for now, Enjoy!
      </Text>
    </View>
  )
) : (
  <ActivityIndicator animating={true} color={'#3243da'} size={46} className="mt-20" />
)}
  
  {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

export default Homework;
