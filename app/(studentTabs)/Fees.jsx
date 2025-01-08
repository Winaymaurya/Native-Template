import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import apiClient from './../utils/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { ActivityIndicator } from 'react-native-paper';

const Fees = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(1); // Default to the first tab
  const [fees, setFees] = useState([]);
  const [feeHistory, setFeeHistory] = useState([]);
  const [session, setSession] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const getAllFees = async () => {
    setLoading(true);
    const id = await AsyncStorage.getItem('studentId');
    try {
      const { data } = await apiClient.get(`studentFees/summary?student=${id}`);
      if (data?.success) {
        setFees(data?.data);
      } else {
        Alert.alert("Error", "Failed to fetch fees summary");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getFeeHistory = async () => {
    setLoading2(true);
    const id = await AsyncStorage.getItem("studentId");
    try {
      const { data } = await apiClient.get(`studentFees/history/${id}`);
      if (data?.success) {
        setFeeHistory(data?.data);
        await AsyncStorage.setItem('feeHistory', JSON.stringify(data?.data.length));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading2(false);
    }
  };

  const getAllSession = async () => {
    try {
      const { data } = await apiClient.get(`session`);
      if (data?.success) {
        setSession(data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllFees();
    getFeeHistory();
    getAllSession();
  }, []);

  const tabs = [
    {
      id: 1,
      label: 'Unpaid Fee',
      content: (
        <View className="p-4">
          <Text className="text-2xl font-mediumM text-red-800 mb-2">Unpaid Fee Details</Text>
          {!loading ? (
            <ScrollView>
              <View className="bg-blue-50 rounded-lg p-2 border-2 border-gray-200">
                <Text className="text-lg font-mediumM text-blue-900">Unpaid Monthly Fee -</Text>
                {fees?.unpaidSummary?.unpaidFees?.map((f, index) => (
                  <View key={f._id || `unpaid-${index}`} className="flex-row justify-between px-6 mt-1 pb-1">
                    <Text className="font-mediumM text-blue-800 tracking-wider">{f.name}</Text>
                    <Text className="font-mediumM text-blue-800 tracking-wider">{f.amount}</Text>
                  </View>
                ))}
              </View>
              <View className="bg-blue-50 rounded-lg p-2 mt-4 border-2 border-gray-200">
                <Text className="text-lg font-mediumM text-blue-900">Unpaid Transport Fee -</Text>
                {fees?.unpaidSummary?.unpaidTransport?.map((f, index) => (
                  <View key={f._id || `unpaid-transport-${index}`} className="flex-row justify-between px-6 mt-1 pb-1">
                    <Text className="font-mediumM text-blue-800 tracking-wider">{f.name}</Text>
                    <Text className="font-mediumM text-blue-800 tracking-wider">{f.amount}</Text>
                  </View>
                ))}
              </View>
              <View className="bg-blue-50 rounded-lg p-2 mt-4 border-2 border-gray-200 mb-20">
                <Text className="text-lg font-mediumM text-blue-900">Unpaid Other Fee -</Text>
                {fees?.unpaidSummary?.unpaidOther?.map((f, index) => (
                  <View key={f._id || `unpaid-other-${index}`} className="flex-row justify-between px-6 mt-1 pb-1">
                    <Text className="font-mediumM text-blue-800 tracking-wider">{f.name}</Text>
                    <Text className="font-mediumM text-blue-800 tracking-wider">{f.amount}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          ) : (
            <ActivityIndicator animating color="#344bcf" size="large" className="mt-24" />
          )}
        </View>
      ),
    },
    {
      id: 2,
      label: 'Paid Fee',
      content: (
        <View className="p-4 ">
          <Text className="text-2xl font-mediumM text-green-800 mb-2">Paid Fee Details</Text>
          {!loading ? <ScrollView className=''>
            <View className='bg-blue-50 rounded-lg p-2 border-2 border-gray-200 '>
              <Text className="text-lg font-mediumM text-blue-900 ">Paid Monthly Fee -</Text>
              <View>
                {fees?.paidSummary?.fees?.map((f) => (
                  <View key={f._id} className='flex-row justify-between px-6 mt-1 pb-1'>
                    <Text className='font-mediumM text-blue-800 tracking-wider'>{f.name}</Text>
                    <Text className='font-mediumM text-blue-800 tracking-wider'>{f.amount}</Text>
                  </View>
                ))}
                <View className='flex-row px-6 items-end justify-end mt-2 pt-2 border-t-[2px] border-gray-400'>
                  <Text className='text-[16px] font-mediumM text-blue-800 tracking-wider'>Monthly Fees Total : &nbsp;</Text>
                  <Text className='text-[18px] text-blue-800 font-mediumM tracking-wider'>{fees?.paidSummary?.totalFees}</Text>
                </View>
              </View>
            </View>
            {fees?.paidSummary?.transport && (
              <View className='bg-blue-50  rounded-lg p-2 mt-4 border-2 border-gray-200'>
              <Text className="text-lg font-mediumM text-blue-900 ">Paid Transport Fee -</Text>
              <View>
                {fees?.paidSummary?.transport?.map((f) => (
                  <View key={f._id} className='flex-row justify-between px-6 mt-1 pb-1'>
                    <Text className='font-mediumM text-blue-800 tracking-wider'>{f.name}</Text>
                    <Text className='font-mediumM text-blue-800 tracking-wider'>{f.amount}</Text>
                  </View>
                ))}
                <View className='flex-row px-6 items-end justify-end mt-2 pt-2 border-t-[2px] border-gray-400'>
                  <Text className='text-[16px] font-mediumM text-blue-800 tracking-wider'>Transport Fees Total : &nbsp;</Text>
                  <Text className='text-[18px] font-mediumM tracking-wider text-blue-800'>{fees?.paidSummary?.totalTransport}</Text>
                </View>
              </View>
            </View>)}
            <View className='bg-blue-50 rounded-lg p-2 mt-4 border-2 border-gray-200 '>
              <Text className="text-lg font-mediumM text-blue-900 ">Paid Other Fee -</Text>
              <View>
                {fees?.paidSummary?.other?.map((f) => (
                  <View key={f._id} className='flex-row justify-between px-6 mt-1 pb-1'>
                    <Text className='font-mediumM text-blue-800 tracking-wider'>{f.name}</Text>
                    <Text className='font-mediumM text-blue-800 tracking-wider'>{f.amount}</Text>
                  </View>
                ))}
                <View className='flex-row px-6 items-end justify-end mt-2 pt-2 border-t-[2px] border-gray-400'>
                  <Text className='text-[16px] font-mediumM text-blue-800 tracking-wider'>Other Fees Total : &nbsp;</Text>
                  <Text className='text-[18px] font-mediumM tracking-wider text-blue-800'>{fees?.paidSummary?.totalOther}</Text>
                </View>
              </View>
            </View>
            <View className='mt-4 flex-row items-center justify-end p-2 bg-[#3243da] rounded-lg px-4 mb-20 rounded-tl-full'>
              <Text className='text-[19px] font-mediumM text-white tracking-wider'>Grand Total : &nbsp;</Text>
              <Text className='text-[19px] font-mediumM tracking-wider text-white'>Rs. {fees?.paidSummary?.total}</Text>
            </View>
          </ScrollView>
            :
            <ActivityIndicator animating={true} color={'#3243da'} size={'large'} className='mt-24' />
          }
        </View>
      ),
    },
    {
      id: 3,
      label: 'Fee History',
      content: (
        <View className="p-4">
          <Text className="text-2xl font-mediumM text-blue-800 mb-4">Fee Payment History</Text>
          {!loading2 ?
            <ScrollView className="mb-24">
              {feeHistory?.map((h, i) => (
                <View className="bg-blue-50  mb-4 rounded-lg border-2 border-gray-200 " key={i}>
                  <Text className="text-lg font-mediumM mb-2 px-4">
                     Date: {h?.createdAt.split("T")[0]}
                  </Text>
                  <View className="justify-between px-4">
                    <View>
                      <Text className="text-gray-500 font-mediumM text-lg border-b border-gray-300 py-1 mb-1">Monthly Fee :</Text>
                      {h?.fees?.length !== 0 ? (
                        <View>
                          {h?.fees?.map((f) => (
                            <View key={f._id} className="flex-row justify-between px-4 py-1 ">
                              <Text className="text-blue-900 font-mediumM text-[16px]">{f.name} -</Text>
                              <Text className="text-blue-900 font-mediumM text-[16px]">{f.amount}</Text>
                            </View>
                          ))}
                        </View>
                      ) : (
                        ''
                      )}
                    </View>
                    {h?.transport.length !== 0 ? (
                      <View>
                        <Text className="text-gray-500 font-mediumM text-lg border-b border-gray-300 py-1 mb-1">Transport Fee :</Text>
                        <View>
                          {h?.transport?.map((t) => (
                            <View key={t._id} className="flex-row justify-between px-4 py-1">
                              <Text className="text-blue-900 font-mediumM text-[15px]">{t.name}-</Text>
                              <Text className="text-blue-900 font-mediumM text-[15px]">{t.amount}</Text>
                            </View>
                          ))}
                        </View>
                      </View>
                    ) : (
                      ''
                    )}

                    {h?.other?.length !== 0 ?
                      <View>
                        <Text className="text-gray-500 font-mediumM text-lg border-b border-gray-300 py-1 mb-1">Other Fee :</Text>
                        <View>
                          {h?.other?.map((o) => (
                            <View key={o._id} className="flex-row justify-between px-4 py-1">
                              <Text className="text-blue-900 font-mediumM text-[15px]">{o.name}-</Text>
                              <Text className="text-blue-900 font-mediumM text-[15px]">{o.amount}</Text>
                            </View>
                          ))}
                        </View>

                      </View> : ''}
                  </View>
                  <View className="mt-4 flex-row items-center justify-end p-1 bg-[#3243da] rounded-tl-full px-2">
                    <Text className="text-lg font-mediumM text-white tracking-wider">Total :</Text>
                    <Text className="text-lg font-mediumM  text-white tracking-wider ml-4">Rs. {h.total} </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
            :
            <View className='mt-20'>

              <ActivityIndicator animating={true} color={'#3243da'} size={'large'} />
            </View>
          }
        </View>
      ),
    },
  ];

  return (
    <View className="flex-1">
      <View className="bg-[#3243da] justify-start p-3 flex-row items-center">
        <TouchableOpacity onPress={() => router.push('/Home')}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text className="text-xl tracking-wider text-white ml-4 font-mediumM">Fee Details</Text>
        <View className="rounded-3xl bg-white w-44 ml-14">
          <Picker
            selectedValue={selectedSession}
            onValueChange={(itemValue) => setSelectedSession(itemValue)}
            mode="dropdown"
            style={{ height: 54, width: '100%', margin: -10, marginLeft: 10 }}
          >
            {session?.map((s, index) => (
              <Picker.Item
                key={s._id || `session-${index}`}
                label={`${s.sessionStart.split('-')[0]} - ${s.sessionEnd.split('-')[0]}`}
                value={s._id}
              />
            ))}
          </Picker>
        </View>
      </View>
      <View>
        {/* <Text className="text-lg text-gray-700 mt-4">Selected Session ID: {selectedSession}</Text> */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setSelectedTab(tab.id)}
              className={`mx-4 ${selectedTab === tab.id ? 'border-b-4 border-blue-900' : ''}`}
            >
              <Text
                className={`text-xl mx-2 mb-1 font-mediumM ${selectedTab === tab.id ? 'text-blue-900' : 'text-gray-600'
                  }`}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View className="flex-1">
        {tabs
          .filter((tab) => tab.id === selectedTab)
          .map((tab) => (
            <View key={tab.id}>{tab.content}</View>
          ))}
      </View>
    </View>
  );
};

export default Fees;
