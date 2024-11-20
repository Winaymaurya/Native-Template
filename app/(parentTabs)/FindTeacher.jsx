import { View, Text ,Image,ScrollView,TouchableOpacity, TextInput, Alert,RefreshControl} from 'react-native'
import React,{useState,useEffect} from 'react'
import axios from 'axios'
import baseURL from '../../baseURL'
import { useRouter } from 'expo-router'
import { Dropdown } from 'react-native-element-dropdown';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Dialog, Portal, PaperProvider } from 'react-native-paper';
  const data = [
    { label: 'All Teachers', value: '' },
    { label: 'All Subjects', value: 'All' },
    { label: 'English', value: 'English' },
    { label: 'Maths', value: 'Maths' },
    { label: 'Computer', value: 'Computer' },
    { label: 'Science', value: 'Science' },
    { label: 'Physics', value: 'Physics' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];
const FindTeacher = () => {
  const router=useRouter()
  const [refreshing, setRefreshing] = useState(false);

  const [teachers, setTeachers] = useState([])  
  const [value, setValue] = useState('');
  const [city, setCity] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(false);


  const [profile, setProfile] = useState([]);
  const [parentId, setParentId] = useState();
  const [teacherId, setTeacherId] = useState();
  const [child, setChild] = useState([]);
  const [subject, setSubject] = useState([]);
  const [time, setTime] = useState([]);

  const [selectedChild, setSelectedChild] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const [open1, setOpen1] = useState(false);
  
  const refresh=()=>{
    setRefreshing(true)
    setValue('')
    setCity('')
    setRefreshing(false)
  }
  
    const getAllTeacher=async()=>{ 
      setLoading(true)
      try {
        const {data}= await axios.get(`http://192.168.1.7:8080/api/v1/teacher?subjects=${value}&city=${city}`)
        if(data?.success){
         setTeachers(data?.teachers)
        }
        setLoading(false)
      } catch (error) {
        console.log(error)
        
      }  
    }     

    const getProfile=async()=>{
      try {
        const id =await AsyncStorage.getItem('id')
        setParentId(id)
        const {data}=await axios.get(`http://192.168.1.7:8080/api/v1/parent/${id}`)
        if(data?.success){ 
          setProfile(data?.data)
          setChild(data?.data.children)
        }
      } catch (error) {
        console.log(error)
        
      }
     }

const handleBooking=async(i,id)=>{
    getProfile()
    setTime(teachers[i].timeSlots)
    setSubject(teachers[i].subjects)
    setTeacherId(id)
    setOpen1(true)
}

const handleConfirmBooking=async()=>{
    
     const payload={teacher:teacherId,parent:parentId,subject:selectedSubject,child:selectedChild,timeSlots:selectedTime}

     console.log(payload)
    const {data}= await axios.post(`http://192.168.1.7:8080/api/v1/booking`,payload)
    if(data?.success){
      Alert.alert(data?.message)
      router.push('/ParentClass')
    }
    else{
      Alert.alert(data?.message)

    }

     setOpen1(false)
}

    useEffect(()=>{
      getAllTeacher()
    },[value,city])
  return (
    <PaperProvider>

    
    <ScrollView className=' bg-blue-100 px-12 '  refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={refresh} />
    }>
      <Text className='text-2xl tracking-widest text-center my-4'>Find Teacher</Text>
  
      <View className='flex flex-row justify-between items-center  '>
   
        <Dropdown
        className={`h-12 border ${isFocus ? 'border-2 border-blue-500' : ' border-2 border-gray-400'} rounded-lg px-2 w-[48%]`}
        placeholderStyle="text-[16px]"
        selectedTextStyle="text-[16px]"
        inputSearchStyle="h-10 text-[16px]"
        iconStyle="w-5 h-5"
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Subject' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}/>
        <TextInput placeholder='Search by City' className='w-[48%] border-2 px-2 text-md border-gray-400 py-2 rounded-xl'
             value={city}  
             onChangeText={setCity}></TextInput>
      </View>   

      {loading?<ActivityIndicator animating={true} color={MD2Colors.red800} size={'large'} className='mt-10 '/> :''}
      
      {teachers?.length > 0 ? (
    teachers.map((t, index) => (
      <View key={index} className="border-2 border-gray-600 my-4 py-1 px-2 space-y-2 rounded-xl">
        <View className="flex flex-row justify-between">
          <View>
            <Text className="uppercase text-[16px] font-semibold tracking-widest italic">{t.name}</Text>
            <Text className="tracking-widest italic">{t?.phone}</Text>
            <Text className="tracking-widest italic">{t?.email}</Text>
            <Text className="tracking-widest italic">{t?.address?.city}</Text>
          </View>
          <Image
            source={{ uri: t?.pic }}
            className="border-2 border-gray-500 w-24 rounded-full h-24"
          />
        </View>

        <View>
          {t?.qualification?.map((q, qi) => (
            <Text key={qi}>{q.degree} - {q.instituteName} - {q.yearOfCompletion}</Text>
          ))}
        </View>

        <View className="flex flex-row justify-between">
          <Text>Slots:</Text>
          {t?.timeSlots?.length > 0 ? (
            t.timeSlots.map((s, si) => (
              <Text key={si} className="bg-green-600 text-gray-200 px-2 rounded-lg italic">
                {s.startTime} - {s.endTime}
              </Text>
            ))
          ) : (
            <Text className="text-red-600 italic font-semibold">No Slot available</Text>
          )}
        </View>

        <View className="tracking-widest italic flex flex-row items-center justify-between flex-wrap py-1">
          {t?.subjects?.map((s, i) => (
            <Text className="border-2 border-gray-500 bg-gray-200 px-2 text-center rounded-lg" key={i}>
              {s}
            </Text>
          ))}
        </View>

        <View className="flex flex-row justify-between mb-2">
          <TouchableOpacity className="w-[49%]">
            <Text className="text-lg text-white bg-blue-500 text-center rounded-xl p-1">More Details</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-[49%]" disabled={t?.timeSlots.length === 0} onPress={()=>handleBooking(index,t._id)}>
            <Text
              className={`text-lg text-white bg-blue-500 text-center rounded-xl p-1 ${
                t.timeSlots.length === 0 ? 'opacity-80 line-through' : ''
              }`}
            >
              Book Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    ))
  ) : (
        <>
        {loading?'' : <Text className="text-center text-xl text-red-600 font-semibold mt-8">No teacher found</Text> }
    
        </>
  )}

    {/* Dialogs */}
    <Portal>
          <Dialog visible={open1} onDismiss={()=>setOpen1(false)} className='px-6 py-4 bg-gray-200'>
            <Text className='text-xl my-4'>Book Now</Text>
        <View className='flex flex-row justify-between'>    
        <Dropdown
        className={`h-12  border-2 border-gray-400' rounded-lg px-2 w-[48%]`}
        placeholderStyle="text-[16px]"
        selectedTextStyle="text-[16px]"
        inputSearchStyle="h-10 text-[16px]"
        iconStyle="w-5 h-5"
        data={time
          .filter(item => item.free) 
          .map(item => ({
            label: `${item.startTime} - ${item.endTime}`,
            value: item,
          }))}
        maxHeight={300}
        labelField="label" 
        valueField="value"
        placeholder= 'Time slots'
        value={selectedTime}
        onChange={item => {
          setSelectedTime(item.value);
        }}/>
        <Dropdown
        className={`h-12  border-2 border-gray-400' rounded-lg px-2 w-[48%]`}
        placeholderStyle="text-[16px]"
        selectedTextStyle="text-[16px]"
        inputSearchStyle="h-10 text-[16px]"
        iconStyle="w-5 h-5"
        data={subject.map((item) => ({ label: item, value: item }))}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder= 'Subject'
        value={selectedSubject}
        onChange={item => {
          setSelectedSubject(item.value);
        }}/>
         </View> 
         <Dropdown
        className={`h-12  border-2 border-gray-400' rounded-lg px-2 w-[100%] mt-4`}
        placeholderStyle="text-[16px]"
        selectedTextStyle="text-[18px]"
        iconStyle="w-5 h-5"
        data={child.map(item => ({
            label: `${item.name} - ${item.grade}`,
            value: item,
          }))}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder= 'Child'
        value={selectedChild}
        onChange={item => {
          setSelectedChild(item.value);
        }}/>
            <TouchableOpacity className='my-4 flex flex-row justify-end space-x-4' >
              <Button onPress={()=>setOpen1(false)} mode='elevated'  className='w-28 bg-red-50'>Close</Button>
              <Button  mode='elevated'  className='w-28 -p-1 ' onPress={handleConfirmBooking}>Confirm</Button>
            </TouchableOpacity>
          </Dialog>
        </Portal>
     
    </ScrollView>
    </PaperProvider>
  )
}

export default FindTeacher