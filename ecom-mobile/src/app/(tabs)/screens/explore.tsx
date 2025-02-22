import React from "react";
import { ScrollView, StyleSheet, useColorScheme } from "react-native";
import { Colors } from "@/constants";
import { useProductListing } from "@/hooks/listing/useProductListing";
import { ThemedView } from "@/components/ui/atoms";

const ExploreScreen = () => {
  const colorScheme = useColorScheme();

  const { products, isLoading, error } = useProductListing();

  console.log("PRODUCTS", products);

  if (isLoading) {
    return <ThemedView style={styles.container}></ThemedView>;
  }

  if (error) {
    return <ThemedView style={styles.container}></ThemedView>;
  }

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? "light"].background },
      ]}
    ></ScrollView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
