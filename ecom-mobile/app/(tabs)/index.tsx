import { StyleSheet, View } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ui/atoms/ThemedView";
import { ThemedText } from "@/components/ui/atoms/ThemedText";
import { Button } from "@/components/ui/molecules/Button";
import { Space } from "@/constants/Space";
import { Search } from "@/components/ui/molecules/Search";

const index = () => {
  return (
    <ThemedView style={styles.container}>
      <View style={styles.contentContainer}>
        <ThemedText
          type="hero"
          style={{ textAlign: "center", paddingVertical: Space.$3 }}
        >
          Discover your next favourite in our latest collection.
        </ThemedText>
        <Search onSearch={() => {}} onFilterPress={() => {}} />
      </View>
      <View style={styles.buttonContainer}>
        <Button variant="primary" style={{ width: "100%" }} onPress={() => {}}>
          Sign up with email
        </Button>
        <Button
          variant="secondary"
          onPress={() => {}}
          style={{ marginTop: Space.$2, width: "100%" }}
        >
          Sign up with email
        </Button>
      </View>
    </ThemedView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Space.$3,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    paddingBottom: Space.$8,
  },
});
