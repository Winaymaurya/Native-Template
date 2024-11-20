import { View, Text,ScrollView,TouchableOpacity,Alert } from 'react-native'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const TeacherClass = () => {
  const [booking, setBooking] = useState([]) 
const [loading, setLoading] = useState(false) 

  const getBooking=async()=>{
   try {
    setLoading(true)
    const {data}=await axios.get(`http://192.168.1.7:8080/api/v1/booking`)
    if(data?.success){
      setBooking(data?.data)
      console.log(data?.data,"hello")
    }
    setLoading(false)
   } catch (error) {
    console.log(error)
   }
  }

   const handleUpdate=async(id,n)=>{
    try {
      let data={}
      if(n=='accept'){
        data= await axios.put(`http://192.168.1.7:8080/api/v1/booking/${id}`,{status:"teacherAccepted"})
      }
      if(n=='cancel'){
        data= await axios.put(`http://192.168.1.7:8080/api/v1/booking/${id}`,{status:"canceled"})
      }
      if(data?.success){
        Alert.alert(data?.message)
      }
      else{
        Alert.alert(data?.message)
      }
      getBooking()
    } catch (error) {
      console.log(error)
      
    }
   
  }
 
  const handleConfirm=()=>{

  }

  const handleClickOpen=()=>{

  }
  const handleTrail=()=>{

  }

   useEffect(()=>{
     getBooking()
   },[])
  return (
    <ScrollView className='h-[110vh] bg-blue-100 px-12'>
    <Text className='text-2xl text-center pt-4 tracking-widest'>Classes</Text>   
    {loading?<ActivityIndicator animating={true} color={MD2Colors.red800} size={'large'} className='mt-10 '/> :''}     
    {booking.map((b, index) => (
<View
  key={index}
  className={`flex justify-between px-2 p-2 rounded-lg ${
    (() => {
      switch (b.status) {
        case 'parentRequest':
          return 'bg-red-100 border-gray-500 border-2';
        case 'teacherAccepted':
          return 'bg-green-100 border-gray-500 border-2';
        case 'trail':
          return 'bg-blue-100 border-gray-500 border-2';
        default:
          return '';
      }
    })()
  }`}
>
  {/* Switch to handle status text, teacher info, and buttons */}
  {(() => {
    switch (b?.status) {
      case 'parentRequest':
        return (
          <View className='space-y-4'>
            <Text className="font-semibold text-red-700">Parent Requested--</Text>
            <View className='flex flex-row flex-wrap justify-evenly space-y-1'>
            <Text>{b?.teacher.name}</Text>
            <Text>{b?.subject}</Text>
            <Text>{`${b?.timeSlots[0].startTime}-${b?.timeSlots[0].endTime} PM`}</Text>
            <Text>{`${b?.child[0].name}-${b?.child[0].grade}`}</Text>
            </View>
            <View className=" flex flex-row justify-between">
              <TouchableOpacity
                className="border-2 border-gray-700 text-green-800  py-1 px-2 rounded-lg bg-green-600 w-[48%] "
                 onPress={() => handleUpdate(b._id, 'accept')}
                 >
                <Text className='tracking-wider text-center text-white' >Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="border-2 border-gray-700 py-1 px-2 rounded-lg bg-red-600  w-[50%]"
                onPress={() =>handleUpdate(b._id,'cancel')}
              >
                <Text className='tracking-wider text-white text-center'>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'teacherAccepted':
        return (
          <View className='space-y-4'>
            <Text className="font-semibold text-[16px]">  Accepted--</Text>
            <View className='flex flex-row flex-wrap justify-evenly'>
            <Text>{b?.teacher.name}</Text>
            <Text>{b?.subject}</Text>
            <Text>{`${b?.timeSlots[0].startTime}-${b?.timeSlots[0].endTime} PM`}</Text>
            <Text>{`${b?.child[0].name}-${b?.child[0].grade}`}</Text>
            </View>
            <View className=" flex flex-row justify-between">
              <TouchableOpacity
                className="border-2 border-gray-700 text-green-800  py-1 px-2 rounded-lg bg-green-600 w-full "
                onPress={() => handleClickOpen(b._id)}
              >
                <Text className='tracking-wider text-center text-white' >Waiting for trail response</Text>
              </TouchableOpacity>
             
            </View>
          </View>
        );

      case 'trail':
        return (
          <>
            <Text className="font-semibold">Trail --</Text>
            <Text>{b?.teacher.name}</Text>
            <Text>{b?.subject}</Text>
            <Text>{`${b?.timeSlots[0].startTime}-${b?.timeSlots[0].endTime} PM`}</Text>
            <Text>{b?.trailDate.split('T')[0]}</Text>
            <Text>{`${b?.child[0].name}-${b?.child[0].grade}`}</Text>
            <View className="space-x-4 flex">
            <Feather name="edit-3" size={24} color="black" />
              <TouchableOpacity
                className="border-2 border-green-700 text-green-800 px-2 rounded-lg bg-white hover:text-white hover:bg-green-700 tracking-wide"
                
              >
                <Text>Waiting for Confirmation</Text>
              </TouchableOpacity>
            </View>
          </>
        );
   
      default:
        return (
        null
        );
    }
  })()}
</View>
))}


   <View>
    <Text className='text-xl text-center py-4 tracking-widest'>Active Class</Text>
    {loading?<ActivityIndicator animating={true} color={MD2Colors.red800} size={'large'} className='mt-10 '/> :''}
{booking?.map((b, index) => (
<View className=" flex  items-center mb-4 " key={index}>
  {b.status === 'active' ? (
    <View className="bg-green-200 p-2 w-80 h-64 rounded-xl border-2 boder-gray-600 font-montserrat flex flex-col justify-evenly">
      <View className="flex flex-row justify-between text-xl">
        <Text>Start Date -</Text>
        <Text>{b.startDate.split('T')[0]}</Text>
      </View>
      <View className="flex flex-row justify-between text-xl">
        <Text>Subject-</Text>
        <Text>{b.subject}</Text>
      </View>
      <View className="flex flex-row justify-between text-xl">
        <Text>Teacher-</Text>
        <Text>{b.teacher.name}</Text>
      </View>
      <View className="flex flex-row justify-between text-xl">
        <Text>Child-</Text>
        <Text className="text-[16px]">
          {b.child[0].name} &nbsp; {b.child[0].grade.split('G')[0]}
        </Text>
      </View>
      <View className="flex flex-row justify-between text-xl">
        <Text>Time-</Text>
        <Text>{b.timeSlots[0].startTime}-{b.timeSlots[0].endTime} PM</Text>
      </View>
      <View className="flex flex-row justify-between text-xl">
        <Text>Fee-</Text>
        <Text>Rs. 1200</Text>
      </View>
      <TouchableOpacity className='bg-blue-500 p-1 rounded-xl'>
        <Text className=' text-center text-gray-100'>Give rating</Text>
      </TouchableOpacity>
    </View>
  ) : null}
</View>
))}
   </View>

  </ScrollView>
  )
}

export default TeacherClass