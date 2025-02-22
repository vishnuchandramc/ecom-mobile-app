import React from "react";
import { StyleSheet, useColorScheme } from "react-native";
import { ThemedView } from "../atoms";
import { ThemedText } from "../atoms/ThemedText";
import { Button, CounterButton } from "../molecules";
import { Space } from "@/constants/Space";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useCartStore from "@/store/cart";
import { Product } from "@/models/ProductModel";
import { Colors } from "@/constants";

interface BottomBarProps {
  item: Product;
}

export const BottomBar = ({ item }: BottomBarProps) => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const itemQuantity = useCartStore((state) =>
    state.getItemQuantity(item.id.toString())
  );

  const cartStore = useCartStore();
  const onIncrement = () =>
    cartStore.addItem({
      id: item.id.toString(),
      name: item.title,
      image: item.images[0],
      price: item.price,
    });
  const onDecrement = () => cartStore.removeItem(item.id.toString());

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingBottom: insets.bottom,
          backgroundColor: Colors[colorScheme || "light"].background,
          borderColor: Colors[colorScheme || "light"].border,
        },
      ]}
    >
      <ThemedView style={styles.content}>
        <ThemedView>
          <ThemedText type="default">Price</ThemedText>
          <ThemedText type="title" style={styles.price}>
            ${itemQuantity === 0 ? item.price : item.price * itemQuantity}
          </ThemedText>
          <ThemedText style={{ fontSize: 12 }} type="default">
            Exclusive all taxes
          </ThemedText>
        </ThemedView>

        {itemQuantity > 0 ? (
          <CounterButton
            value={itemQuantity}
            onIncrement={() => onIncrement?.()}
            onDecrement={() => onDecrement?.()}
            style={{ minWidth: 140, paddingVertical: Space.$1 }}
          />
        ) : (
          <Button variant="primary" onPress={onIncrement} style={styles.button}>
            Add to cart
          </Button>
        )}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    backgroundColor: "white",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Space.$4,
  },
  price: {
    flex: 1,
  },
  button: {
    minWidth: 140,
    paddingVertical: Space.$4,
  },
});
