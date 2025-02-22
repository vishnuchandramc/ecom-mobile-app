import React from "react";
import { Image as ExpoImage } from "expo-image";
import { StyleProp, StyleSheet } from "react-native";
import type { ImageStyle } from "react-native";

interface ImageProps {
  source: string | { uri: string };
  style?: StyleProp<ImageStyle>;
  contentFit?: "cover" | "contain" | "fill" | "none";
  transition?: number;
}

const Image: React.FC<ImageProps> = ({
  source,
  style,
  contentFit = "cover",
  transition = 300,
  ...props
}) => {
  const imageSource = typeof source === "string" ? { uri: source } : source;

  return (
    <ExpoImage
      source={imageSource}
      style={[styles.image, style]}
      contentFit={contentFit}
      transition={transition}
      placeholder={require("@/assets/images/placeholder.png")}
      placeholderContentFit="cover"
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
  },
});

export default Image;
