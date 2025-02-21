import { StyleSheet } from "react-native";
import React from "react";
import { ThemedText, ThemedView } from "@/components/ui/atoms";

const explore = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">explore</ThemedText>
    </ThemedView>
  );
};

export default explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
