import { StyleProp, StyleSheet, useColorScheme, ViewStyle } from "react-native";
import React from "react";
import { Colors } from "@/constants";
import { ThemedText } from "../atoms";
import { Space } from "@/constants";
import { ThemedView } from "../atoms";

interface TitleContainerProps {
  title: string;
  subtitle: string;
  style?: StyleProp<ViewStyle>;
}

const TitleContainer = ({ title, subtitle, style }: TitleContainerProps) => {
  const colorScheme = useColorScheme();
  return (
    <ThemedView
      style={[
        styles.container,
        { borderBottomColor: Colors[colorScheme ?? "light"].border },
        style,
      ]}
    >
      <ThemedText type="subtitle">{title}</ThemedText>
      <ThemedText type="default">{subtitle}</ThemedText>
    </ThemedView>
  );
};

export default TitleContainer;

const styles = StyleSheet.create({
  container: {
    paddingVertical: Space.$5,
    paddingHorizontal: Space.$3,
    borderBottomWidth: 1,
  },
});
