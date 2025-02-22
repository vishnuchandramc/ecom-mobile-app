import React from "react";
import { Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { ThemedText, ThemedView } from "@/components/ui/atoms";

const NotFoundScreen = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <ThemedView style={styles.container}>
        <ThemedText type="title">not exist.</ThemedText>
      </ThemedView>
    </>
  );
};

export default NotFoundScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
