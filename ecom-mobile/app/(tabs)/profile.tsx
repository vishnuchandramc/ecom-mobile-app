import { StyleSheet, View } from "react-native";
import React from "react";
import { ThemedText } from "@/components/ui/atoms/ThemedText";
import { ThemedView } from "@/components/ui/atoms/ThemedView";

const profile = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome!</ThemedText>
    </ThemedView>
  );
};

export default profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
