import { View, Text, TouchableOpacity, ScrollView, Alert, Image } from 'react-native'
import { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import apiClient from '../utils/axiosInstance';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
const Notice = () => {
  const [notices, setNotices] = useState([])
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState(new Date())
  const router = useRouter()


  const getNotice = async () => {
    setLoading(true)
    try {
      const { data } = await apiClient.get("/notice")
      if (data?.success) {
        setNotices(data?.data)
        Alert.alert(data?.message)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  const colors = ['bg-purple-100', 'bg-blue-100', 'bg-green-100', 'bg-red-100'];
  useEffect(() => {
    getNotice()
  }, [])
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
      {!loading ?
        <ScrollView className='px-6 mt-4 mb-16'>
          {notices.map((notice, i) => (
            <View
              key={notice._id}
              className={` ${colors[i % colors.length]}  p-4 rounded-bl-3xl rounded-tr-3xl w-full min-h-[10vh] justify-between mb-4 border-2 border-[#3243da]`}
              style={{ minWidth: 250 }} // To ensure each notice has a minimum width
            >
              {new Date(date).toDateString() === new Date(notice.date).toDateString() ? (
                <Image source={require('./../../assets/images/star.png')} className="h-10 w-10 absolute right-2 top-2" />
              ) : (
                ''
              )}


              <Text className="text-gray-600 text-sm  font-regularM">{notice.date.split("T")[0]}</Text>
              <Text className=" font-semibold font-mediumM text-lg mb-2">{notice.title}</Text>
              <Text className=" font-semibold font-mediumM text-md mb-2">{notice.description}</Text>
            </View>
          ))}
        </ScrollView> : <ActivityIndicator animating={true} color={'#3243da'} size={46} className='mt-20' />}
    </View>
  )
}

export default Notice