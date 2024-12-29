import { View, Text,TouchableOpacity,ScrollView } from 'react-native'
import React,{useState} from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';

const Fees = () => {
    const router=useRouter()
    const [selectedTab, setSelectedTab] = useState(1); // Default to the first tab

    const tabs = [
      {
        id: 1,
        label: 'Monthly Fee 1',
        content: (
          <View className="p-4">
            <Text className="text-3xl text-red-800 mb-4">Monthly Fee Details</Text>
            <Text className="text-lg">This section contains details about the monthly fee.</Text>
            <Text className="text-md mt-2">Amount: ₹5000</Text>
          </View>
        ),
      },
      {
        id: 2,
        label: 'Transport Fee 2',
        content: (
          <View className="p-4">
            <Text className="text-3xl text-blue-800 mb-4">Transport Fee Details</Text>
            <Text className="text-lg">This section contains details about the transport fee.</Text>
            <Text className="text-md mt-2">Amount: ₹1200</Text>
          </View>
        ),
      },
      {
        id: 3,
        label: 'Fee 3',
        content: (
          <View className="p-4">
            <Text className="text-3xl text-green-800 mb-4">Other Fee Details</Text>
            <Text className="text-lg">This section contains details about other fees.</Text>
            <Text className="text-md mt-2">Amount: ₹800</Text>
          </View>
        ),
      },
      {
        id: 4,
        label: 'Fee 4',
        content: (
          <View className="p-4">
            <Text className="text-3xl text-purple-800 mb-4">Special Fee Details</Text>
            <Text className="text-lg">This section contains details about special fees.</Text>
            <Text className="text-md mt-2">Amount: ₹2000</Text>
          </View>
        ),
      },
    ];
  
  return (
    <View>
     <View className="bg-[#3243da] justify-start p-3 flex-row items-center">
        <TouchableOpacity onPress={() => router.push('/Home')}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text className="text-2xl tracking-wider text-white ml-4 font-mediumM">
         Fee Details
        </Text>
      </View>
         {/* Horizontal ScrollView */}
         <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2">
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            onPress={() => setSelectedTab(tab.id)}
            className={`mx-4 ${selectedTab === tab.id ? 'border-b-4 border-blue-900' : ''}`}
          >
            <Text className={`text-lg mx-2 font-mediumM ${selectedTab === tab.id ? 'text-blue-900' : 'text-gray-600'}`}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Display Content of Selected Tab */}
      
        {tabs
          .filter((tab) => tab.id === selectedTab)
          .map((tab) => (
            <View key={tab.id}>{tab.content}</View>
          ))}
     
    </View>  
  )
}  

export default Fees