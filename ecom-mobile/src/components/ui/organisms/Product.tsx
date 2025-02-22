import { StyleProp, StyleSheet, useColorScheme, ViewStyle } from "react-native";
import React from "react";
import { Space } from "@/constants/Space";
import Card from "./Card";
import { ThemedView } from "../atoms";
import { Colors } from "@/constants/Colors";
import { Product } from "@/models/ProductModel";
import useCartStore from "@/store/cart";
import { router } from "expo-router";

interface ProductProps {
  item: Product;
  style?: StyleProp<ViewStyle>;
}

const ProductItem = ({ item, style }: ProductProps) => {
  const colorScheme = useColorScheme();

  const cartStore = useCartStore();
  const onIncrement = () => cartStore.addItem(item);
  const onDecrement = () => cartStore.removeItem(item.id.toString());

  const onCardPress = () => {
    router.push({
      pathname: "/(other)/Details",
      params: { id: item.id, title: item.title },
    });
  };

  return (
    <ThemedView style={[styles.container, style]}>
      <Card
        id={item.id.toString()}
        title={item.title}
        imageUrl={item.images[0]}
        subtitle={`${item.price}`}
        imageStyle={{ height: 350 }}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        onPress={onCardPress}
        chipTitle={item.category.name}
        chipStyle={{
          backgroundColor: Colors[colorScheme ?? "light"].background,
        }}
      />
    </ThemedView>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: { marginVertical: Space.$4, flex: 1 },
});
