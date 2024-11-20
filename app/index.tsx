import { router,useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {

  const router= useRouter()
  
  const isLogin=async()=>{

    const token = await AsyncStorage.getItem('token');
    const role = await AsyncStorage.getItem('role');
    if(token && role=='parent'){
      router.replace('/ParentHome')
    }
    if(token && role=='teacher'){
      router.replace('/TeacherHome')
    }

  }
  useEffect(()=>{
      isLogin()
  },[])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
       
      }}
    > 
  
  <TouchableOpacity onPress={() => router.push('/Register')}>
  <Text style={{ fontSize: 40 }}>Register</Text>
</TouchableOpacity>
 
  <TouchableOpacity onPress={() => router.push('/(auth)/SignIn')}>
  <Text style={{ fontSize: 40 }}>Login</Text> 
</TouchableOpacity>
 
    </View>
  );
}
