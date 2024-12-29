import { View, Text,TouchableOpacity,ScrollView } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
const Notice = () => {
    const router=useRouter()
    const notices = [
        { id: 1, description: 'Important meeting tomorrow at 10 AM.', date: '2024-12-27' },
        { id: 2, description: 'Holiday on 1st January for New Year.', date: '2024-12-31' },
        { id: 3, description: 'School will be closed for maintenance on 5th January.', date: '2025-01-05' },
        { id: 4, description: 'New batch starting on 10th January.', date: '2025-01-10' },
        { id: 5, description: 'Notice: Online classes resume from 15th January.', date: '2025-01-15' },
      ];
      const colors = ['bg-purple-100', 'bg-blue-100', 'bg-green-100','bg-red-100'];
  return (
    <View>
       <View className="bg-[#3243da] justify-start p-3 flex-row items-center">
        <TouchableOpacity onPress={() => router.push('/Home')}>
          <Ionicons name="arrow-back" size={32} color="white" />
        </TouchableOpacity>
        <Text className="text-2xl tracking-wider text-white ml-4 font-mediumM">
         Notice Board
        </Text>
      </View>
      <View className='px-4 mt-4'>
        {notices.map((notice,i) => (
                  <View
                    key={notice.id}
                    className={` ${colors[i % colors.length]}  p-4 rounded-lg shadow-lg w-full h-32 justify-between mb-4`}
                    style={{ minWidth: 250 }} // To ensure each notice has a minimum width
                  >
                    <Text className=" font-semibold font-mediumM text-lg mb-2">{notice.description}</Text>
                    <Text className="text-gray-600 text-sm  font-regularM">{notice.date}</Text>
                  </View>
                ))}
      </View>
    </View>
  )
}

export default Notice