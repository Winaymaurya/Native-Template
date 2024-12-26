import { View, Text ,Alert,Image,TouchableOpacity,ScrollView ,FlatList,RefreshControl,TextInput} from 'react-native'
import React,{useState,useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {Dropdown} from 'react-native-element-dropdown';
import { useRouter } from 'expo-router';
import { Button, Dialog, Portal, PaperProvider } from 'react-native-paper';
import DateTimePickerModal from "react-native-modal-datetime-picker";
const TeacherProfile = () => {
  const router=useRouter()

  const [refreshing, setRefreshing] = useState(false);

 const [open1, setOpen1] = useState(false)
 const [open2, setOpen2] = useState(false)
 const [open3, setOpen3] = useState(false)
 const [open4, setOpen4] = useState(false)
 const [open5, setOpen5] = useState(false)

  const [profile, setProfile] = useState({})
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [subjects, setSubjects] = useState([])

  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    country: ''
  });
  const [isFocused, setIsFocused] = useState(false);


  // TimeSlots
  const [timeSlots, setTimeSlots] = useState([]);
  const [isStartPickerVisible, setStartPickerVisible] = useState(false);
  const [isEndPickerVisible, setEndPickerVisible] = useState(false);
  const [tempStartTime, setTempStartTime] = useState(null);

  // Handlers for Start Time Picker
  const showStartPicker = () => setStartPickerVisible(true);
  const hideStartPicker = () => setStartPickerVisible(false);

  const handleStartConfirm = (date) => {
    setTempStartTime(date); // Temporarily store start time
    hideStartPicker();
    showEndPicker(); // Open end time picker next
  };

  // Handlers for End Time Picker
  const showEndPicker = () => setEndPickerVisible(true);
  const hideEndPicker = () => setEndPickerVisible(false);

  const handleEndConfirm = (date) => {
    if (tempStartTime && date > tempStartTime) {
      const newSlot = {
        startTime: tempStartTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        endTime: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setTimeSlots((prev) => [...prev, newSlot]);
      setTempStartTime(null);
    } else {
      Alert.alert("Invalid Time", "End time must be after start time.");
    }
    hideEndPicker();
  };

  // Handler to remove a time slot
  const removeTimeSlot = (index) => {
    setTimeSlots((prev) => prev.filter((_, i) => i !== index));
  };
  
  const subjectOptions = [
    { label: "Mathematics", value: "Mathematics" },
    { label: "Science", value: "Science" },
    { label: "Physics", value: "Physics" },
    { label: "Chemistry", value: "Chemistry" },
    { label: "Biology", value: "Biology" },
    { label: "English", value: "English" },
    { label: "History", value: "History" },
    { label: "Geography", value: "Geography" },
    { label: "Computer Science", value: "Computer Science" },
    { label: "Economics", value: "Economics" },
    { label: "Political Science", value: "Political Science" },
    { label: "Business Studies", value: "Business Studies" },
    { label: "Accountancy", value: "Accountancy" },
  ];

  // Add or remove subjects
  const handleSelect = (item) => {
    if (subjects.includes(item.value)) {
      // Remove if already selected
      setSubjects(subjects.filter((subject) => subject !== item.value));
    } else {
      // Add to array
      setSubjects([...subjects, item.value]);
    }
  };
 
  const handleRemove = (subject) => {
    setSubjects(subjects.filter((subj) => subj !== subject));
  };

  const handleAddressChange = (field, value) => {
    setAddress(prevAddress => ({
      ...prevAddress,
      [field]: value
    }));
  };


  const getProfile=async()=>{

    setRefreshing(true)
    try {
      const id =await AsyncStorage.getItem('id')
 
      setId(id)
      const {data}=await axios.get(`http://192.168.1.7:8080/api/v1/teacher/${id}`)
      if(data?.success){ 
        setProfile(data?.data)
        console.log(data?.data)
        setTimeSlots(data?.data?.timeSlots)
      }
      if(data?.data.subjects =='' || data?.data.timeSlots ==''){
        Alert.alert("Please complete your profile ")
      }
     
      setRefreshing(false)
    } catch (error) {
      console.log(error)
      
    }
  }
  const setValue1=()=>{
    setName(profile?.name)
    setEmail(profile?.email)
    setBio(profile?.bio)
    setOpen1(true)
  }
  const setValue3=()=>{
    setSubjects(profile?.subjects)
    setOpen3(true)
  }
  const setValue4=()=>{
    setTimeSlots(profile?.timeSlots)
    setOpen4(true)
  }
 
    const setValue2=()=>{
     
      handleAddressChange('street', profile?.address?.street)
      handleAddressChange('city', profile?.address?.city)
      handleAddressChange('state', profile?.address?.state)
      handleAddressChange('country', profile?.address?.country)
      setOpen2(true)
     }

  const handleLogout=async()=>{
    Alert.alert("Logged out", "You have been logged out successfully.");
    router.push('/SignIn'); 
   await AsyncStorage.removeItem('token');
   await AsyncStorage.removeItem('name');
   await AsyncStorage.removeItem('id');
  }
 
  const handleUpdate=async(n)=>{
      try {
        console.log(n,"hiiiiiiiiiiiiiiiiii")
        let payload={}
        let data={}
      
        if (n === 0 && name && email && bio) {
          payload = { name, email, bio };
        } else if (n === 1 && address) {
          payload = { address };
        } else if (n === 2 && subjects !== '') {
          payload = { subjects  };
        } else if (n === 3 && timeSlots !== '') {
          payload = { timeSlots };
        } else {
          return Alert.alert("Error", "Please fill all the fields");
        }

        data=await axios.put(`http://192.168.1.7:8080/api/v1/teacher/${id}`,payload)

        if(data?.success){
          Alert.alert("Success","Updated")
        }
        else{
          Alert.alert("Success","Updated")
        }
        getProfile()
        setOpen1(false)
        setOpen2(false)
        setOpen3(false)
        setOpen4(false)
      } catch (error) {
        console.log(error)
        
      }
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
        <MaterialIcons name="add-circle-outline" size={32} color="black" onPress={setValue2} />
        :  
        <Feather name="edit-3" size={26} color="black" onPress={setValue2}/>
        }
          </TouchableOpacity>

          </View>
        <View className='flex flex-row justify-between'>
        {profile?.address == '' ? 
        <Text className='text-md tracking-wider'>Add Address</Text>
        : 
        ''
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
          {profile?.subjects == '' ?
           <MaterialIcons name="add-circle-outline" size={32} color="black" onPress={setValue3} />
           : 
           <Feather name="edit-3" size={26} color="black"  onPress={setValue3}/>
          }
          
        </TouchableOpacity>
        </View> 
         <View className='px-2'>
         {profile?.subjects == '' ? 
        <Text className='text-md tracking-wider'>Add Subjects</Text>
        : 
        ''
        } 
          {profile?.subjects?.map((c,index)=>(
            <View key={index} className='flex flex-row justify-between my-1 w-[70%] flex-wrap bg-blue-300 p-1 px-4 rounded-xl  '>
              <Text className='italic tracking-widest font-semibold'>{index+1}. {c}</Text>
             
            </View>
           ))} 
        </View>
       
      </View>
    
      <View className='py-4 border-b-2 border-gray-400 '>
        <View className='flex flex-row justify-between items-center'>
        <Text className='text-lg tracking-wider font-semibold italic py-1 '>Time-Slots :</Text>
        <TouchableOpacity className='mb-2'>
        {profile?.timeSlots == '' ?
           <MaterialIcons name="add-circle-outline" size={32} color="black" onPress={setValue4} />
           : 
           <Feather name="edit-3" size={26} color="black"  onPress={setValue4}/>
          }
          
        </TouchableOpacity>
        </View> 
        {profile?.timeSlots == '' ? 
        <Text className='text-md tracking-wider'>Create Time Slots</Text>
        : 
        ''
        } 
         <View className='px-2'>
          {profile?.timeSlots?.map((c,index)=>(
            <View key={index} className='flex flex-row justify-between my-1 w-[70%] bg-purple-300 p-1 px-2 rounded-xl '>
              
              <Text className=' italic tracking-widest font-semibold'>{c.startTime}- {c.endTime} </Text>
            
            </View>
           ))} 
        </View>
       
      </View>
      <View className='py-4 border-b-2 border-gray-400 '>
        <View className='flex flex-row justify-between items-center'>
        <Text className='text-lg tracking-wider font-semibold italic py-1'>Experience : {profile?.experience?.years} Years</Text>
        <TouchableOpacity className='mb-2'>
        {profile?.experience.previousInstitutions == '' ?
           <MaterialIcons name="add-circle-outline" size={32} color="black" onPress={()=>setOpen5(true)} />
           : 
           <Feather name="edit-3" size={26} color="black"  onPress={()=>setOpen5(true)}/>
          }
          
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
        <Text className='font-semibold tracking-wider'>Email:</Text>
        <TextInput
          className="w-[75%] p-2 bg-white rounded-lg border border-gray-300 mb-4"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email"
        />
        </View>
         <View className='flex flex-row justify-between items-center'>

        <Text className='font-semibold tracking-wider'>Bio:</Text>
        <TextInput
          className="w-[75%] p-2 bg-white rounded-lg border border-gray-300 mb-2 h-20"
          placeholder="Bio"
          multiline={true}
          numberOfLines={4}
          value={bio}
          onChangeText={setBio}
        /></View>
        <Text>* Cant't change phone number</Text>
            </View>
            <TouchableOpacity className='my-4 flex flex-row justify-end space-x-4' >
              <Button onPress={()=>setOpen1(false)} mode='elevated'  className='w-28 bg-red-50'>Close</Button>
              <Button onPress={()=>handleUpdate(0)} mode='elevated'  className='w-28 -p-1 '>Update</Button>
            </TouchableOpacity>
          </Dialog>
        </Portal>


        {/* Dialogs 2 */}
        <Portal>
          <Dialog visible={open2} onDismiss={()=>setOpen2(false)} className='px-4 py-2 bg-gray-200'>
            <Text className='text-xl my-2'>Update Address</Text>
            <View>
              <View className='flex flex-row justify-between items-center'>
                <Text className='font-semibold tracking-wider'>Street :</Text>
               <TextInput
          className="w-[75%] p-2 bg-white rounded-lg border border-gray-300 mb-2 "
          placeholder="Landmark / Street"
          value={address.street}
        onChangeText={(value) => handleAddressChange('street', value)}
          autoCapitalize="none"
        /></View>

        <View className='flex flex-row justify-between items-center'>

        <Text className='font-semibold tracking-wider'>City :</Text>
        <TextInput
          className="w-[75%] p-2 bg-white rounded-lg border border-gray-300 mb-2 "
          placeholder="City"
          value={address.city}
          onChangeText={(value) => handleAddressChange('city', value)}
          autoCapitalize="none"
        /></View>

        <View className='flex flex-row justify-between items-center'>
        <Text className='font-semibold tracking-wider'>State :</Text>
        <TextInput
          className="w-[75%] p-2 bg-white rounded-lg border border-gray-300 mb-4"
          placeholder="State"
          value={address.state}
        onChangeText={(value) => handleAddressChange('state', value)}
        />
        </View>
        <View className='flex flex-row justify-between items-center'>
        <Text className='font-semibold tracking-wider'>Country:</Text>
        <TextInput
          className="w-[75%] p-2 bg-white rounded-lg border border-gray-300 mb-4"
          placeholder="State"
          defaultValue='India'
          value={address.country}
        onChangeText={(value) => handleAddressChange('country', value)}
        />
        </View>
            </View>
            <TouchableOpacity className='my-4 flex flex-row justify-end space-x-4' >
              <Button onPress={()=>setOpen2(false)} mode='elevated'  className='w-28 bg-red-50'>Close</Button>
              <Button onPress={()=>handleUpdate(1)} mode='elevated'  className='w-28 -p-1 '>Update</Button>
            </TouchableOpacity>
          </Dialog>
        </Portal>


        {/* Dilaog 3 */}
        <Portal>
          <Dialog visible={open3} onDismiss={()=>setOpen3(false)} className='px-4 py-2 bg-gray-200'>
            <Text className='text-xl my-2'>Add Subject</Text>
            <View>
            <Dropdown
        className={`bg-white h-12 rounded-lg px-3 border ${
          isFocused ? "border-blue-500" : "border-gray-300"
        }`}
        data={subjectOptions}
        labelField="label"
        valueField="value"
        placeholder="Select Subjects"
        search
        searchPlaceholder="Search..."
        value={subjects}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        renderItem={(item) => (
          <View
            className={`p-2 flex-row items-center ${
              subjects.includes(item.value) ? "bg-blue-100" : ""
            }`}
          >
            <Text className="text-base">{item.label}</Text>
            {subjects.includes(item.value) && (
              <Text className="ml-auto text-green-600 font-semibold">✓</Text>
            )}
          </View>
        )}
        onChange={handleSelect}
      />
        <View className="mt-4">
        <Text className="text-base font-medium">Selected Subjects:</Text>
        <View className='flex flex-row justify-start flex-wrap 
        '>
        {subjects.length > 0 ? (
          subjects.map((subject, index) => (
            <View className=' bg-blue-400  items-center flex flex-row justify-between px-2 py-1 m-1 rounded-xl' key={index}>
            <Text  className=" tracking-wider text-white mr-8 ">
              - {subject}
            </Text>
            <Feather name="delete" size={26} color="white" onPress={() => handleRemove(subject)} />
            </View>
          ))
        ) : (
          <Text className="text-gray-500 italic">None</Text>
        )}
      </View>
</View>
      
    
            </View>
            <TouchableOpacity className='my-4 flex flex-row justify-end space-x-4' >
              <Button onPress={()=>setOpen3(false)} mode='elevated'  className='w-28 bg-red-50'>Close</Button>
              <Button onPress={()=>handleUpdate(2)} mode='elevated'  className='w-28 -p-1 '>Update</Button>
            </TouchableOpacity>
          </Dialog>
        </Portal>



         {/* Dilaog 4 -timeSlots */}
         <Portal>
          <Dialog visible={open4} onDismiss={()=>setOpen4(false)} className='px-4 py-2 h-[50vh] bg-gray-200'>
          <View className="flex-1 p-4">
      <Text className="text-lg font-semibold mb-4">Select Available Time Slots</Text>

      {/* Button to Add a New Time Slot */}
      <TouchableOpacity
        onPress={showStartPicker}
        className="bg-blue-500 py-2 px-4 rounded-lg mb-4"
      >
        <Text className="text-white text-center">Add Time Slot</Text>
      </TouchableOpacity>

      {timeSlots.length > 0 ? (
        <FlatList
          data={timeSlots}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View className="flex flex-row justify-between items-center bg-gray-100 p-2 mb-2 rounded-lg">
              <Text className="text-base">{`${item.startTime} - ${item.endTime}`}</Text>
              <TouchableOpacity onPress={() => removeTimeSlot(index)}>
                <Text className="text-red-500 font-semibold">Remove</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text className="text-gray-500 text-center">No Time Slots Added</Text>
      )}

      {/* Start Time Picker */}
      <DateTimePickerModal
        isVisible={isStartPickerVisible}
        mode="time"
        onConfirm={handleStartConfirm}
        onCancel={hideStartPicker}
      />

      {/* End Time Picker */}
      <DateTimePickerModal
        isVisible={isEndPickerVisible}
        mode="time"
        onConfirm={handleEndConfirm}
        onCancel={hideEndPicker}
      />
    </View>
            <TouchableOpacity className='my-4 flex flex-row justify-end space-x-4' >
              <Button onPress={()=>setOpen4(false)} mode='elevated'  className='w-28 bg-red-50'>Close</Button>
              <Button onPress={()=>handleUpdate(3)} mode='elevated'  className='w-28 -p-1 '>Update</Button>
            </TouchableOpacity>
          </Dialog>
        </Portal>



        {/*Dialog -5 experience   */}
        <Portal>
          <Dialog visible={open5} onDismiss={()=>setOpen5(false)} className='px-4 py-2 bg-gray-200'>
            <Text className='text-xl my-2'>Add Subject</Text>
            <View>
            {/* <Dropdown
        className={`bg-white h-12 rounded-lg px-3 border ${
          isFocused ? "border-blue-500" : "border-gray-300"
        }`}
        data={subjectOptions}
        labelField="label"
        valueField="value"
        placeholder="Select Subjects"
        search
        searchPlaceholder="Search..."
        value={subjects}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        renderItem={(item) => (
          <View
            className={`p-2 flex-row items-center ${
              subjects.includes(item.value) ? "bg-blue-100" : ""
            }`}
          >
            <Text className="text-base">{item.label}</Text>
            {subjects.includes(item.value) && (
              <Text className="ml-auto text-green-600 font-semibold">✓</Text>
            )}
          </View>
        )}
        onChange={handleSelect}
      /> */}
        <View className="mt-4">
        <Text className="text-base font-medium">Selected Subjects:</Text>
        <View className='flex flex-row justify-start flex-wrap 
        '>
        {subjects.length > 0 ? (
          subjects.map((subject, index) => (
            <View className=' bg-blue-400  items-center flex flex-row justify-between px-2 py-1 m-1 rounded-xl' key={index}>
            <Text  className=" tracking-wider text-white mr-8 ">
              - {subject}
            </Text>
            <Feather name="delete" size={26} color="white" onPress={() => handleRemove(subject)} />
            </View>
          ))
        ) : (
          <Text className="text-gray-500 italic">None</Text>
        )}
      </View>
</View>
      
    
            </View>
            <TouchableOpacity className='my-4 flex flex-row justify-end space-x-4' >
              <Button onPress={()=>setOpen5(false)} mode='elevated'  className='w-28 bg-red-50'>Close</Button>
              <Button onPress={()=>handleUpdate(2)} mode='elevated'  className='w-28 -p-1 '>Update</Button>
            </TouchableOpacity>
          </Dialog>
        </Portal>
    </ScrollView>
    </PaperProvider>
  )
}

export default TeacherProfile