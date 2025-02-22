import { StyleSheet } from "react-native";
import React from "react";
import { ThemedView } from "../atoms/ThemedView";
import { ThemedText } from "../atoms";
import { Space } from "@/constants";

const Footer = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.footerText} type="title">
        Made with ❤️ by BLUME
      </ThemedText>
      <ThemedText style={styles.caption} type="default">
        Made with react native expo and typescript.
      </ThemedText>
    </ThemedView>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Space.$4,
    paddingVertical: Space.$4,
    height: 200,
    justifyContent: "center",
  },
  caption: {
    opacity: 0.5,
    marginBottom: Space.$2,
    width: "80%",
  },
  footerText: {
    paddingTop: Space.$2,
    opacity: 0.5,
  },
});
