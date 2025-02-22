import { Stack } from "expo-router";

export default function OtherLayout() {
  return (
    <Stack
      initialRouteName="CategoryList"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CategoryList" options={{ headerShown: false }} />
      <Stack.Screen name="Details" options={{ headerShown: false }} />
    </Stack>
  );
}
