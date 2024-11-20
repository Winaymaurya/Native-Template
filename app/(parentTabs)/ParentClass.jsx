import { View, Text,ScrollView,TouchableOpacity, Alert ,RefreshControl} from 'react-native'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { Calendar } from 'react-native-calendars';
import { Button, Dialog, Portal, PaperProvider } from 'react-native-paper';
const ParentClass = () => {
  const today = new Date().toISOString().split('T')[0];
  const [refreshing, setRefreshing] = useState(false);
  const [trailOpen, setTrailOpen] = useState(false);
  const [trailId, setTrailId] = useState();
  const [selectedDate, setSelectedDate] = useState('');

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

   } catch (error) {
    console.log(error)
   }
   setLoading(false)
  }
  const handleConfirm=async(id ,i)=>{
    //  if(today < booking[i].trailDate){
    //  return Alert.alert("Error","Please wait for Trail Completion")
    //  }
    Alert.alert(today)
     const {data}=await axios.put(`http://192.168.1.7:8080/api/v1/booking/${id}`,{status:'active',startDate:today})
     if(data?.success){
      Alert.alert("Success",data?.success)
    }
    else{
      Alert.alert("Oops",data?.success)
    }
    getBooking()
  }

  const handleClickOpen=(id)=>{
    setTrailOpen(true)
    setTrailId(id)
  }
  const handledelete=async(id)=>{
    try {
    Alert.alert("hello")
      
      const {data}=await axios.delete(`http://192.168.1.7:8080/api/v1/booking/${id}`)
         
      if(data?.success){
        Alert.alert(data?.message)
      }
      if(data?.success){
        Alert.alert(data?.message)
      }
      refresh()
      

    } catch (error) {
      console.log(error)
      
    }

  }
  const handleTrail=async()=>{
    if(!selectedDate){
      Alert.alert("Error","Please Select a date")
    }
   
    const {data}=await axios.put(`http://192.168.1.7:8080/api/v1/booking/${trailId}`,{status:'trail',trailDate:selectedDate})

   if(data?.success){
    Alert.alert(data?.message)
  }
  else{
    Alert.alert(data?.message)
  }
  getBooking()
  setTrailOpen(false)

  }
 const refresh=()=>{
  setRefreshing(true)
  getBooking()
  setRefreshing(false)
 }

   useEffect(()=>{
     getBooking()
   },[])
  return (
    <PaperProvider>

   
    <ScrollView className=' bg-blue-100 px-12'
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={refresh} />
    }>
      <View className='  flex items-center justify-center'>
      <Text className='text-2xl text-center pt-4 tracking-widest'>Classes</Text>   
      {loading?<ActivityIndicator animating={true} color={MD2Colors.red800} size={'large'} className=' mt-10 '/> :''}     
      {booking.map((b, index) => (
  <View
    key={index}
    className={`flex justify-between px-2 p-2 mb-2 rounded-lg ${
      (() => {
        switch (b.status) {
          case 'parentRequest':
            return 'bg-red-100 border-gray-500 border-2';
          case 'teacherAccepted':
            return 'bg-green-100 border-gray-500 border-2';
          case 'trail':
            return 'bg-gray-100 border-gray-500 border-2';
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
              <Text className="font-semibold text-[16px]">Teacher Requested--</Text>
              <View className='flex flex-row justify-evenly flex-wrap space-y-1'>
              <Text>{b?.teacher.name}</Text>
              <Text>{b?.subject}</Text>
              <Text>{`${b?.timeSlots[0].startTime}-${b?.timeSlots[0].endTime} PM`}</Text>
              <Text>{`${b?.child[0].name}-${b?.child[0].grade}`}</Text>
              </View>
              <View className=" flex flex-row justify-end space-x-4">
              <Feather name="edit-3" size={28} color="black" />
              <MaterialIcons name="delete" size={28} color="black" onPress={()=>handledelete(b._id)}/>
              </View>
            </View>
          );

        case 'teacherAccepted':
          return (
            <View className='space-y-4'>
              <Text className="font-semibold text-[16px]">Teacher Accepted--</Text>
              <View className='flex flex-row flex-wrap justify-evenly space-y-1'>
              <Text>{b?.teacher.name}</Text>
              <Text>{b?.subject}</Text>
              <Text>{`${b?.timeSlots[0].startTime}-${b?.timeSlots[0].endTime} PM`}</Text>
              <Text>{`${b?.child[0].name}-${b?.child[0].grade}`}</Text>
              </View>
              <View className=" flex flex-row justify-between">
                <TouchableOpacity
                  className="border-2 border-gray-700 text-green-800  py-1 px-2 rounded-lg bg-green-600 w-[48%] "
                  onPress={() => handleClickOpen(b._id)}
                >
                  <Text className='tracking-wider text-center text-white' >Trail</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="border-2 border-gray-700 px-2 rounded-lg bg-red-600  w-[50%]"
                  // onPress={() => handleUpdate(b._id, 'cancel')}
                >
                  <Text className='tracking-wider text-white'>Request Cancellation</Text>
                </TouchableOpacity>
              </View>
            </View>
          );

        case 'trail':
          return (
            <>
            <View className='space-y-4'>
              <Text className="font-semibold text-[16px] tracking-wide">Trail --</Text>
              
              
              <View className='flex flex-row justify-evenly flex-wrap space-y-1'>
              <Text>{b?.teacher.name}</Text>
              <Text>{b?.subject}</Text>
              <Text>{`${b?.timeSlots[0].startTime}-${b?.timeSlots[0].endTime} PM`}</Text>
              <Text >{b?.trailDate.split('T')[0]}</Text>
              <Text>{`${b?.child[0].name}-${b?.child[0].grade}`}</Text>
              </View>
              <View className="space-x-4 flex flex-row justify-end">
              <Feather name="edit-3" size={24} color="black" />
                <TouchableOpacity
                  className="border-2 border-green-700 bg-green-600 px-2 w-36  rounded-lg   tracking-wide"
                  onPress={() => handleConfirm(b._id,index)}
                >
                  <Text className='text-white text-center'>Confirmation</Text>
                </TouchableOpacity>
              </View>
              </View>
            </>
          );

        default:
          return null;
      }
    })()}
  </View>
))}
</View>


     <View>
      <Text className='text-xl text-center py-4 tracking-widest'>Active Class</Text>
      {loading?<ActivityIndicator animating={true} color={MD2Colors.red800} size={'large'} className='mt-10 '/> :''}
{booking?.map((b, index) => (
  <View className=" flex items-center my-2 " key={index}>
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

{/* Dialogs */}
<Portal>
          <Dialog visible={trailOpen} onDismiss={()=>setTrailOpen(false)} className='px-6 py-4 bg-gray-200'>
            <Text className='text-xl my-4'>Select Trail Date</Text>
        
        <Calendar
      style={{
        borderWidth: 1,
        borderColor: 'gray',
        height: 350,
      }}
      onDayPress={day => {
        setSelectedDate(day.dateString);
      }}
      minDate={today} 
      markedDates={{
        [selectedDate]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'}
      }}
      theme={{
        backgroundColor: '##E5E7EB',
        calendarBackground: '##E5E7EB',
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#dd99ee'
      }}>
    </Calendar>
            <TouchableOpacity className='my-4 flex flex-row justify-end space-x-4' >
              <Button onPress={()=>setTrailOpen(false)} mode='elevated'  className='w-28 bg-red-50'>Close</Button>
              <Button  mode='elevated'  className='w-40 -p-1 ' onPress={handleTrail} >Confirm Trail</Button>
            </TouchableOpacity>
          </Dialog>
        </Portal>

    </ScrollView>
    </PaperProvider>
  )
}

export default ParentClass