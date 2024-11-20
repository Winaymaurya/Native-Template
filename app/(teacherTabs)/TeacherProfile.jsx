import { View, Text ,Alert,Image,TouchableOpacity,ScrollView ,RefreshControl} from 'react-native'
import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { Button, Dialog, Portal, PaperProvider } from 'react-native-paper';
const TeacherProfile = () => {
  const router=useRouter()

  const [refreshing, setRefreshing] = useState(false);
 const [open, setOpen] = useState(false)

  const [profile, setProfile] = useState({})
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: ''
  });



  const getProfile=async()=>{

    setRefreshing(true)
    try {
      const id =await AsyncStorage.getItem('id')
 
      setId(id)
      const {data}=await axios.get(`http://192.168.1.7:8080/api/v1/teacher/${id}`)
      console.log(data?.data)
       
      if(data?.success){ 
        setProfile(data?.data)
      }
      // if(data?.data.subjects =='' || data?.data.timeSlots ==''){
      //   Alert.alert("Please complete your profile ")
      // }
     
      setRefreshing(false)
    } catch (error) {
      console.log(error)
      
    }
  }
  const setValue1=()=>{
    
  }
  const setValue2=()=>{

  }
  const handleLogout=async()=>{
    Alert.alert("Logged out", "You have been logged out successfully.");
    router.push('/SignIn'); 
   await AsyncStorage.removeItem('token');
   await AsyncStorage.removeItem('name');
   await AsyncStorage.removeItem('id');
  }
 
  useEffect(()=>{
    getProfile()
  },[])

  return (
    <PaperProvider>

  
    <ScrollView className='h-[110vh] bg-blue-100 px-8 py-4'
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={getProfile} />
    }> 
       <View className='border-b-2 border-gray-400 py-4'>

      
       <View className='flex flex-row justify-between py-2 '>

      <Image  source={{ uri: profile?.pic }} alt='Img' className='h-28 w-28 rounded-full bg-red-300'></Image>
       <View className='flex justify-between items-end'>
        <View className='flex flex-row space-x-4 items-center'>
          <TouchableOpacity onPress={setValue1}>
       <Feather name="edit-3" size={26} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
        <Text className='py-1 px-2 bg-gray-100 rounded-xl text-red-600 border-2 border-red-600'>Logout</Text>
        </TouchableOpacity>
        
        </View>
      <Text className='text-lg text-center  tracking-widest'>{profile?.name}</Text>
      <Text className='text-md text-center  tracking-widest'>{profile?.phone}</Text>

      {!profile?.email ?
      <Text className='text-md text-center   tracking-widest'>Email</Text>
      : 
      <Text className='text-md text-center  tracking-widest'>{profile?.email}</Text>
      }
       </View>
       </View>
       <View>
        {profile?.bio ? 
        <Text className='text-justify tracking-wider'>{profile?.bio}</Text>
        : 
        <Text className='text-justify tracking-wider'>Bio - max 20 words</Text>
        }
       </View>
       </View>
       <View className='py-4 border-b-2 border-gray-400'> 
       <View className='flex flex-row justify-between items-center'>
        <Text className='text-lg tracking-wider font-semibold italic py-1'>Address :</Text> 
 <TouchableOpacity onPress={setValue2}>
        {profile?.address == '' ? 
       <Feather name="edit-3" size={26} color="black" />
        :  
        <MaterialIcons name="add-circle-outline" size={32} color="black" />
        }
          </TouchableOpacity>

          </View>
        <View className='flex flex-row justify-between'>
        {profile?.address == '' ? 
        <Text className='text-md tracking-wider'>{profile?.address?.street}</Text>
        : 
        <Text className='text-md tracking-wider'>Add Address</Text>
        } 

        <Text className='text-md tracking-wider'>{profile?.address?.street}</Text>
        <Text className='text-md tracking-wider'>{profile?.address?.city}</Text>
        <Text className='text-md tracking-wider'>{profile?.address?.state}</Text>
        <Text className='text-md tracking-wider'>{profile?.address?.country}</Text>
       
        </View>
       </View>

      <View className='py-4 border-b-2 border-gray-400 '>
        <View className='flex flex-row justify-between items-center'>
        <Text className='text-lg tracking-wider font-semibold italic py-1'>Subjects :</Text>
        <TouchableOpacity className='mb-2'>
           <MaterialIcons name="add-circle-outline" size={32} color="black" />
          
        </TouchableOpacity>
        </View> 
         <View className='px-2'>
          {profile?.subjects?.map((c,index)=>(
            <View key={index} className='flex flex-row justify-between my-1 bg-blue-200 p-1 px-2 rounded-xl  '>
              {/* <Text>{index+1}. {c}</Text> */}
              <Text className=' w-48'>{c}</Text>
              
              
              <TouchableOpacity onPress={()=>handleEditChild(c._id,index)}>
                 <Feather name="delete" size={24} color="black" />
              </TouchableOpacity>
            </View>
           ))} 
        </View>
       
      </View>
      <View className='py-4 border-b-2 border-gray-400 '>
        <View className='flex flex-row justify-between items-center'>
        <Text className='text-lg tracking-wider font-semibold italic py-1 '>Time-Slots :</Text>
        <TouchableOpacity className='mb-2'>
           <MaterialIcons name="add-circle-outline" size={32} color="black" />
          
        </TouchableOpacity>
        </View> 
         <View className='px-2'>
          {profile?.timeSlots?.map((c,index)=>(
            <View key={index} className='flex flex-row justify-between my-1  bg-green-200 p-1 px-2 rounded-xl '>
              {/* <Text>{index+1}. {c}</Text> */}
              <Text className=' w-48'>{c.startTime}- {c.endTime} PM</Text>
              
              
              <TouchableOpacity className='flex flex-row space-x-4' onPress={()=>handleEditChild(c._id,index)}>
                 <Feather name="edit-3" size={24} color="black" />
                 <Feather name="delete" size={24} color="black" />
              </TouchableOpacity>
            </View>
           ))} 
        </View>
       
      </View>
      <View className='py-4 border-b-2 border-gray-400 '>
        <View className='flex flex-row justify-between items-center'>
        <Text className='text-lg tracking-wider font-semibold italic py-1'>Experience : {profile?.experience?.years} Years</Text>
        <TouchableOpacity className='mb-2'>
           <MaterialIcons name="add-circle-outline" size={32} color="black" />
          
        </TouchableOpacity>
        </View>
       <View className='px-2'>
          {profile?.experience?.previousInstitutions.map((i,index)=>(
            <View key={index} className='flex flex-row justify-between my-1   bg-yellow-100 p-1 px-2 rounded-xl'>
              <Text>{index+1}. {i}</Text>
              <TouchableOpacity className='flex flex-row space-x-4' onPress={()=>handleEditChild(c._id,index)}>
                 <Feather name="edit-3" size={24} color="black" />
                 <Feather name="delete" size={24} color="black" />
              </TouchableOpacity>
            </View>
           ))} 
        </View>
        </View>
        <TouchableOpacity className='bg-blue-400 my-2 p-1 py-2 rounded-xl'>
             <Text className='text-white text-center italic tracking-wider '>Register and Start Teaching</Text>
        </TouchableOpacity>
      
 
 
      <View className='mt-10 h-[20vh]'>
        <Text className='text-lg tracking-wider font-semibold italic py-1 text-center'>Payment History</Text>
      </View>




      {/* Dilaog 1 */}
    </ScrollView>
    </PaperProvider>
  )
}

export default TeacherProfile