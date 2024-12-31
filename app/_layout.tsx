import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      {/* StatusBar moved outside Stack */}
      <StatusBar backgroundColor="#3243da" barStyle="light-content" />
      
      {/* Stack with Screen components */}
      <Stack>
        <Stack.Screen
          name="(studentTabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Pages"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Welcome" }}
        />
      </Stack>
    </>
  );
}
