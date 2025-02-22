import { Stack } from "expo-router";
import { View } from "react-native";

export default function AuthLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        initialRouteName="screens/index"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "white",
          },
        }}
      >
        <Stack.Screen name="screens/index" options={{ headerShown: false }} />
        <Stack.Screen name="screens/Login" options={{ headerShown: false }} />
        <Stack.Screen name="screens/Signup" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
