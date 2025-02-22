import { BorderRadius, Space } from "@/constants";
import React from "react";
import { StyleSheet, ViewStyle, TextStyle, StyleProp } from "react-native";
import { ThemedText, ThemedView } from "../atoms";

interface ChipProps {
  title: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
}

export const Chip: React.FC<ChipProps> = ({
  title,
  textColor = "#000000",
  style,
  textStyle,
}) => {
  return (
    <ThemedView style={[styles.container, style]}>
      <ThemedText
        type="default"
        style={[
          styles.text,
          {
            color: textColor,
          },
          textStyle,
        ]}
      >
        {title}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.rounded,
    alignSelf: "flex-start",
    paddingHorizontal: Space.$4,
    paddingVertical: Space.$2,
  },
  text: {
    fontFamily: "AtypTextBold",
  },
});
