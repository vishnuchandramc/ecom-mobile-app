import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  ViewStyle,
} from "react-native";
import React from "react";
import { BorderRadius, Space } from "../../../constants/Space";
import { ThemedText } from "../atoms/ThemedText";
import { Button } from "../molecules";
import { Colors } from "@/constants";
import Image from "../molecules/Image";
import { ThemedView } from "../atoms";
import { Chip } from "../molecules/Chip";

interface CardProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  onAddToCart?: () => void;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  chipTitle?: string;
  chipStyle?: ViewStyle;
}

const Card = ({
  title,
  subtitle,
  imageUrl,
  onAddToCart,
  onPress = () => {},
  style,
  imageStyle,
  chipTitle,
  chipStyle,
}: CardProps) => {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView
        style={[
          styles.container,
          { borderColor: Colors[colorScheme ?? "light"].border },
          style,
        ]}
      >
        {chipTitle && (
          <Chip
            title={chipTitle}
            style={[styles.chip, chipStyle]}
            textColor={Colors[colorScheme ?? "light"].primary}
          />
        )}
        <Image
          source={{ uri: imageUrl }}
          style={[styles.image, imageStyle]}
          contentFit="cover"
        />
        <ThemedView style={styles.content}>
          <ThemedText type="subtitle" style={styles.title}>
            {title}
          </ThemedText>
          {subtitle && (
            <ThemedText type="subtitle" style={styles.price}>
              ${subtitle}
            </ThemedText>
          )}
          {onAddToCart && (
            <Button
              style={styles.button}
              variant="primary"
              onPress={onAddToCart}
            >
              Add to cart
            </Button>
          )}
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: BorderRadius.standard,
    overflow: "hidden",
    width: "100%",
    borderWidth: Space.$0,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: Space.$3,
  },
  title: {
    marginBottom: Space.$2,
  },
  price: {
    marginBottom: Space.$3,
  },
  button: {
    width: "100%",
    minHeight: Space.$6,
    paddingVertical: Space.$2,
  },
  chip: {
    position: "absolute",
    top: Space.$2,
    left: Space.$2,
    zIndex: 2,
    opacity: 0.6,
  },
});
