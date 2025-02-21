import { Stack } from "expo-router";
import { View } from "react-native";

export default function AuthLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        initialRouteName="index"
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: "white",
          },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="Signup" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
