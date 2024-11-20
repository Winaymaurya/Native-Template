import { View, Text ,Alert,Image, TouchableOpacity,TextInput} from 'react-native'
import React,{useEffect,useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { Button, Dialog, Portal, PaperProvider } from 'react-native-paper';
const ParentProfile = () => {
const router=useRouter()


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
    const [editIndex, setEditIndex] = useState();
    const [children, setChildren] = useState([]);
  const [childData, setChildData] = useState({ name: '', age: '', grade: '' });


const [open1, setOpen1] = useState(false)
const [open2, setOpen2] = useState(false)
const [open3, setOpen3] = useState(false)


  // Function to handle input changes
  const handleChange = (field, value) => {
    setAddress(prevAddress => ({
      ...prevAddress,
      [field]: value
    }));
  };
 const getProfile=async()=>{
  try {
    const id =await AsyncStorage.getItem('id')
    setId(id)
    const {data}=await axios.get(`http://192.168.1.7:8080/api/v1/parent/${id}`)
    if(data?.success){ 
      // Alert.alert("success",data?.message )
      setProfile(data?.data)
    }
  } catch (error) {
    console.log(error)
    
  }
 }

 const handleLogout=async()=>{
   router.push('/SignIn'); 
  await AsyncStorage.removeItem('token');
  await AsyncStorage.removeItem('name');
  await AsyncStorage.removeItem('id');
  Alert.alert("Logged out", "You have been logged out successfully.");
 }

 const handleUpdate=async(n)=>{
  try {
    let payload;
    if(n==1){
      payload={address}
    }
    if(n==0){
      payload={name, email , phone}
    }
    const {data}=await axios.put(`http://192.168.1.7:8080/api/v1/parent/${id}`,payload)

    if(data?.success){
      Alert.alert(data?.message)
    }
    else{
      Alert.alert(data?.message)
    }
    getProfile()
    setOpen1(false)
    setOpen2(false)
  } catch (error) {
    console.log(error)
    
  }
 }
const handleEditChild=async(id,index)=>{
  setEditIndex(index)
  setChildData(profile?.children[index]);
  setOpen3(true)
}
const handleUpdateChild=async()=>{
  const updatedChildren = [...children];
      updatedChildren[editIndex] = childData;
      setChildren(updatedChildren);
      console.log(children)
      setEditIndex(null);
      const {data}=await axios.put(`http://192.168.1.7:8080/api/v1/parent/${id}`,children)
      if(data?.success){
        Alert.alert(data?.message) 
      }
      else{
        Alert.alert(data?.message)
      }
      setOpen3(flase)
}

 const setValue1=()=>{
  setEmail(profile?.email)
  setName(profile?.name)
  setPhone(profile?.phone)
  setOpen1(true)
 }
 const setValue2=()=>{
  
  handleChange('street', profile?.address.street)
  handleChange('city', profile?.address.city)
  handleChange('state', profile?.address.state)
  handleChange('country', profile?.address.country)
  setOpen2(true)
 }
 useEffect(()=>{
  getProfile()
 },[])

  return (
      <PaperProvider>

      

       <View className='h-[110vh] bg-blue-100 px-8 py-4'> 

       <View className='flex flex-row justify-between border-b-2 border-gray-400 py-4'>

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
      <Text className='text-md text-center  tracking-widest'>{profile?.email}</Text>
       </View>
       </View>

       <View className='py-4 border-b-2 border-gray-400'> 
       <View className='flex flex-row justify-between items-center'>
        <Text className='text-lg tracking-wider font-semibold italic py-1'>Address :</Text> 
          <TouchableOpacity onPress={setValue2}>
          <Feather name="edit-3" size={26} color="black" /> 

          </TouchableOpacity>

          </View>
        <View className='flex flex-row justify-between'>
        <Text className='text-md tracking-wider'>{profile?.address?.street}</Text>
        <Text className='text-md tracking-wider'>{profile?.address?.city}</Text>
        <Text className='text-md tracking-wider'>{profile?.address?.state}</Text>
        <Text className='text-md tracking-wider'>{profile?.address?.country}</Text>
       
        </View>
       </View>

      <View className='py-4 border-b-2 border-gray-400 '>
        <View className='flex flex-row justify-between items-center'>
        <Text className='text-lg tracking-wider font-semibold italic py-1'>Child details :</Text>
        <TouchableOpacity className='mb-2'>
           <MaterialIcons name="add-circle-outline" size={32} color="black" />
          
        </TouchableOpacity>
        </View>
        <View>
          {profile?.children?.map((c,index)=>(
            <View key={index} className='flex flex-row justify-between my-1  '>
              <Text>{index+1}.</Text>
              <Text className=' w-48'>{c.name}</Text>
              <Text className='w-28'>Class: {c.grade.split(" ")[0]}</Text>
              <Text className='w-20'>Age: {c.age}</Text>
              <TouchableOpacity onPress={()=>handleEditChild(c._id,index)}>
                 <Feather name="edit-3" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>


      <View className='mt-10'>
        <Text className='text-lg tracking-wider font-semibold italic py-1 text-center'>Payment History</Text>
      </View>
    </View>

    {/* Dialogs */}
    <Portal>
          <Dialog visible={open1} onDismiss={()=>setOpen1(false)} className='px-4 py-2 bg-gray-200'>
            <Text className='text-xl my-2'>Update</Text>
            <View>
              <View className='flex flex-row justify-between items-center'>
                <Text className='font-semibold tracking-wider'>Name :</Text>
               <TextInput
          className="w-[75%] p-2 bg-white rounded-lg border border-gray-300 mb-2 "
          placeholder="Name"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
        /></View>

        <View className='flex flex-row justify-between items-center'>

        <Text className='font-semibold tracking-wider'>Phone :</Text>
        <TextInput
          className="w-[75%] p-2 bg-white rounded-lg border border-gray-300 mb-2 "
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          autoCapitalize="none"
        /></View>

        <View className='flex flex-row justify-between items-center'>
        <Text className='font-semibold tracking-wider'>Name :</Text>
        <TextInput
          className="w-[75%] p-2 bg-white rounded-lg border border-gray-300 mb-4"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email"
        />
        </View>
            </View>
            <TouchableOpacity className='my-4 flex flex-row justify-end space-x-4' >
              <Button onPress={()=>setOpen1(false)} mode='elevated'  className='w-28 bg-red-50'>Close</Button>
              <Button onPress={()=>handleUpdate(0)} mode='elevated'  className='w-28 -p-1 '>Update</Button>
            </TouchableOpacity>
          </Dialog>
        </Portal>

    {/* Dialog 2 */}
    <Portal>
          <Dialog visible={open2} onDismiss={()=>setOpen2(false)} className='px-4 py-2 bg-gray-200'>
            <Text className='text-xl my-2'>Update Address</Text>
            <View>
              <View className='flex flex-row justify-between items-center'>
                <Text className='font-semibold tracking-wider'>Street :</Text>
               <TextInput
          className="w-[75%] p-2 bg-white rounded-lg border border-gray-300 mb-2 "
          placeholder="Landmark"
          value={address.street}
        onChangeText={(value) => handleChange('street', value)}
          autoCapitalize="none"
        /></View>

        <View className='flex flex-row justify-between items-center'>

        <Text className='font-semibold tracking-wider'>City :</Text>
        <TextInput
          className="w-[75%] p-2 bg-white rounded-lg border border-gray-300 mb-2 "
          placeholder="City"
          value={address.city}
          onChangeText={(value) => handleChange('city', value)}
          autoCapitalize="none"
        /></View>

        <View className='flex flex-row justify-between items-center'>
        <Text className='font-semibold tracking-wider'>State :</Text>
        <TextInput
          className="w-[75%] p-2 bg-white rounded-lg border border-gray-300 mb-4"
          placeholder="State"
          value={address.state}
        onChangeText={(value) => handleChange('state', value)}
        />
        </View>
        <View className='flex flex-row justify-between items-center'>
        <Text className='font-semibold tracking-wider'>Country:</Text>
        <TextInput
          className="w-[75%] p-2 bg-white rounded-lg border border-gray-300 mb-4"
          placeholder="State"
          value={address.country}
        onChangeText={(value) => handleChange('country', value)}
        />
        </View>
            </View>
            <TouchableOpacity className='my-4 flex flex-row justify-end space-x-4' >
              <Button onPress={()=>setOpen2(false)} mode='elevated'  className='w-28 bg-red-50'>Close</Button>
              <Button onPress={()=>handleUpdate(1)} mode='elevated'  className='w-28 -p-1 '>Update</Button>
            </TouchableOpacity>
          </Dialog>
        </Portal>
      {/* Dailog 3 */}
    <Portal>
          <Dialog visible={open3} onDismiss={()=>setOpen3(false)} className='px-4 py-2 bg-gray-200'>
            <Text className='text-xl my-2'>Update Child</Text>
            <View>
              <View className='flex flex-row justify-between items-center'>
                <Text className='font-semibold tracking-wider'>Name :</Text>
               <TextInput
          className="w-[75%] p-2 bg-white rounded-lg border border-gray-300 mb-2 "
          placeholder="Landmark"
          value={childData.name}
          onChangeText={(text) => setChildData({ ...childData, name: text })}
          autoCapitalize="none"
        /></View>

        <View className='flex flex-row justify-between items-center'>

        <Text className='font-semibold tracking-wider'>Age :</Text>
        <TextInput
          className="w-[75%] p-2 bg-white rounded-lg border border-gray-300 mb-2 "
          placeholder="Age"
          keyboardType="numeric"
          value={childData.age.toString()}
          onChangeText={(text) => setChildData({ ...childData, age: parseInt(text) })}
        /></View>

        <View className='flex flex-row justify-between items-center'>
        <Text className='font-semibold tracking-wider'>Class :</Text>
        <TextInput
          className="w-[75%] p-2 bg-white rounded-lg border border-gray-300 mb-4"
          placeholder="Grade"
          value={childData.grade}
          onChangeText={(text) => setChildData({ ...childData, grade: text })}
        />
        </View>
        
            </View>
            <TouchableOpacity className='my-4 flex flex-row justify-end space-x-4' >
              <Button onPress={()=>setOpen3(false)} mode='elevated'  className='w-28 bg-red-50'>Close</Button>
              <Button onPress={()=>handleUpdateChild()} mode='elevated'  className='w-28 -p-1 '>Update</Button>
            </TouchableOpacity>
          </Dialog>
        </Portal>
    </PaperProvider>
  )
}

export default ParentProfile