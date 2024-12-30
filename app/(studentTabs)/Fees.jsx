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
              <View className="bg-red-100 rounded-xl p-2">
                <Text className="text-lg font-mediumM text-blue-900">Unpaid Monthly Fee -</Text>
                {fees?.unpaidSummary?.unpaidFees?.map((f, index) => (
                  <View key={f._id || `unpaid-${index}`} className="flex-row justify-between px-6 mt-1">
                    <Text className="font-mediumM text-blue-800 tracking-wider">{f.name}</Text>
                    <Text className="font-mediumM text-blue-800 tracking-wider">{f.amount}</Text>
                  </View>
                ))}
              </View>
              <View className="bg-red-100 rounded-xl p-2 mt-4">
                <Text className="text-lg font-mediumM text-blue-900">Unpaid Transport Fee -</Text>
                {fees?.unpaidSummary?.unpaidTransport?.map((f, index) => (
                  <View key={f._id || `unpaid-transport-${index}`} className="flex-row justify-between px-6 mt-1">
                    <Text className="font-mediumM text-blue-800 tracking-wider">{f.name}</Text>
                    <Text className="font-mediumM text-blue-800 tracking-wider">{f.amount}</Text>
                  </View>
                ))}
              </View>
              <View className="bg-red-100 rounded-xl p-2 mt-4 mb-20">
                <Text className="text-lg font-mediumM text-blue-900">Unpaid Other Fee -</Text>
                {fees?.unpaidSummary?.unpaidOther?.map((f, index) => (
                  <View key={f._id || `unpaid-other-${index}`} className="flex-row justify-between px-6 mt-1">
                    <Text className="font-mediumM text-blue-800 tracking-wider">{f.name}</Text>
                    <Text className="font-mediumM text-blue-800 tracking-wider">{f.amount}</Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          ) : (
            <ActivityIndicator animating color="red" size="large" className="mt-24" />
          )}
        </View>
      ),
    },
    {
      id: 2,
      label: 'Paid Fee',
      content: (
        <View className="p-4">
          <Text className="text-2xl font-mediumM text-green-800 mb-2">Paid Fee Details</Text>
          {!loading ? (
            <ScrollView>
              <View className="bg-green-100 rounded-xl p-2">
                <Text className="text-lg font-mediumM text-blue-900">Paid Monthly Fee -</Text>
                {fees?.paidSummary?.fees?.map((f, index) => (
                  <View key={f._id || `paid-${index}`} className="flex-row justify-between px-6 mt-1">
                    <Text className="font-mediumM text-blue-800 tracking-wider">{f.name}</Text>
                    <Text className="font-mediumM text-blue-800 tracking-wider">{f.amount}</Text>
                  </View>
                ))}
              </View>
              {/* Other sections */}
            </ScrollView>
          ) : (
            <ActivityIndicator animating color="green" size="large" className="mt-24" />
          )}
        </View>
      ),
    },
    {
      id: 3,
      label: 'Fee History',
      content: (
        <View className="p-4">
          <Text className="text-2xl font-mediumM text-blue-800 mb-4">Fee Payment History</Text>
          {!loading2 ? (
            <ScrollView className="mb-24">
              {feeHistory?.map((h, index) => (
                <View key={h._id || `history-${index}`} className="bg-blue-100 mb-4 rounded-xl">
                  <Text className="text-lg font-mediumM mb-2 px-4">
                    &nbsp; Date: {h?.createdAt.split("T")[0]}
                  </Text>
                  {/* Other content */}
                </View>
              ))}
            </ScrollView>
          ) : (
            <ActivityIndicator animating color="blue" size="large" className="mt-24" />
          )}
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
            style={{ height: 54, width: '100%', margin: -8 }}
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
        <Text className="text-lg text-gray-700 mt-4">Selected Session ID: {selectedSession}</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-4">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              onPress={() => setSelectedTab(tab.id)}
              className={`mx-4 ${selectedTab === tab.id ? 'border-b-4 border-blue-900' : ''}`}
            >
              <Text
                className={`text-xl mx-2 mb-1 font-mediumM ${
                  selectedTab === tab.id ? 'text-blue-900' : 'text-gray-600'
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
