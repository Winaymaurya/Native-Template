import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
       
  
        <Stack.Screen name="(studentTabs)" options={
        {headerShown:false }
      } />
        <Stack.Screen name="Pages" options={
        {headerShown:false }
      } />

       <Stack.Screen
          name="index"
          options={{ headerShown: false , title:"Welcome" }} 
          />
    </Stack>
  );
}
