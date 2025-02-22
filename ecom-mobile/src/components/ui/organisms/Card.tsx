import {
  ImageStyle,
  Pressable,
  StyleProp,
  StyleSheet,
  useColorScheme,
  ViewStyle,
} from "react-native";
import React, { memo } from "react";
import { BorderRadius, Space } from "../../../constants/Space";
import { ThemedText } from "../atoms/ThemedText";
import { Button, CounterButton } from "../molecules";
import { Colors } from "@/constants";
import Image from "../molecules/Image";
import { ThemedView } from "../atoms";
import { Chip } from "../molecules/Chip";
import useCartStore from "@/store/cart";

interface CardProps {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  chipTitle?: string;
  chipStyle?: ViewStyle;
  onDecrement?: () => void;
  onIncrement?: () => void;
  showATCButton?: boolean;
}

const Card = ({
  id,
  title,
  subtitle,
  imageUrl,
  onPress = () => { },
  style,
  imageStyle,
  chipTitle,
  chipStyle,
  onDecrement,
  onIncrement,
  showATCButton = true,
}: CardProps) => {
  const colorScheme = useColorScheme();
  const itemQuantity = useCartStore((state) => state.getItemQuantity(id));

  const renderATCButton = () => {
    if (!showATCButton) return null;
    if (itemQuantity > 0) {
      return (
        <CounterButton
          value={itemQuantity}
          onIncrement={() => onIncrement?.()}
          onDecrement={() => onDecrement?.()}
        />
      );
    }
    return (
      <Button style={styles.button} variant="primary" onPress={onIncrement}>
        Add to cart
      </Button>
    );
  };

  return (
    <Pressable onPress={onPress}>
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
          <ThemedView style={styles.buttonContainer}>
            {renderATCButton()}
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </Pressable>
  );
};

export default memo(Card);

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
    paddingVertical: Space.$3,
  },
  chip: {
    position: "absolute",
    top: Space.$2,
    left: Space.$2,
    zIndex: 2,
    opacity: 0.6,
  },
  buttonContainer: {
    paddingVertical: Space.$2,
  },
});
