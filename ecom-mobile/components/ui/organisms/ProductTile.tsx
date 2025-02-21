import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  View,
  useColorScheme,
  StyleProp,
  ViewStyle,
} from "react-native";
import { ThemedView } from "../atoms/ThemedView";
import { ThemedText } from "../atoms/ThemedText";
import { CounterButton } from "../molecules/CounterButton";
import { BorderRadius, Colors, Space } from "@/constants";

interface ProductTileProps {
  title: string;
  price: number;
  imageUrl: string;
  onQuantityChange?: (quantity: number) => void;
  style?: StyleProp<ViewStyle>;
}

export const ProductTile: React.FC<ProductTileProps> = ({
  title,
  price,
  imageUrl,
  onQuantityChange,
  style,
}) => {
  const colorScheme = useColorScheme();
  const [quantity, setQuantity] = useState(1);
  const onIncrement = () => {
    setQuantity(quantity + 1);
  };
  const onDecrement = () => {
    setQuantity(quantity - 1);
  };
  return (
    <ThemedView
      style={[
        styles.container,
        { borderColor: Colors[colorScheme ?? "light"].border },
        style,
      ]}
    >
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <ThemedView style={styles.rightContent}>
        <ThemedView style={styles.content}>
          <ThemedText type="default" style={styles.title}>
            {title}
          </ThemedText>
          <ThemedText type="subtitle" style={styles.price}>
            ${price}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.counterContainer}>
          <CounterButton
            value={quantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            style={styles.counter}
          />
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Space.$3,
    borderRadius: BorderRadius.standard,
    flexDirection: "row",
    borderWidth: Space.$0,
  },
  image: {
    width: 120,
    height: 140,
    borderRadius: 4,
    marginRight: 16,
  },
  rightContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
    width: "80%",
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
  },
  counterContainer: {
    width: 120,
    height: 55,
  },
  counter: {
    marginTop: 8,
  },
});
