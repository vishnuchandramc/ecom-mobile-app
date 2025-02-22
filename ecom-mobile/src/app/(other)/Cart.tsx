import React from "react";
import { Platform, StyleSheet, useColorScheme } from "react-native";
import { FlashList } from "@shopify/flash-list";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ProductTile } from "@/components/ui/organisms/ProductTile";
import { ThemedView } from "@/components/ui/atoms/ThemedView";
import { ThemedText } from "@/components/ui/atoms/ThemedText";
import { Button } from "@/components/ui/molecules/Button";
import { Space } from "@/constants/Space";
import useCartStore from "@/store/cart";
import { router } from "expo-router";
import Header from "@/components/ui/molecules/Header";
import { Colors } from "@/constants";

const Cart = () => {
  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const { items, totalPrice } = useCartStore();

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? "light"].background },
      ]}
    >
      <ThemedView style={styles.container}>
        <Header title="Cart" />

        <FlashList
          data={items}
          renderItem={({ item }) => (
            <ProductTile item={item} style={styles.item} />
          )}
          estimatedItemSize={200}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={() => (
            <ThemedText style={styles.emptyText}>Your cart is empty</ThemedText>
          )}
        />

        <ThemedView
          style={[
            styles.bottomBar,
            {
              paddingBottom: insets.bottom,
              borderTopColor: Colors[colorScheme ?? "light"].border,
              marginBottom: Platform.OS === "ios" ? 0 : Space.$4,
            },
          ]}
        >
          <ThemedView style={styles.priceContainer}>
            <ThemedText type="default">Total</ThemedText>
            <ThemedText type="title">${totalPrice.toFixed(2)}</ThemedText>
          </ThemedView>

          <Button
            variant="primary"
            onPress={() => {
              router.replace("/(tabs)/screens");
            }}
            style={styles.checkoutButton}
            disabled={items.length === 0}
          >
            Checkout
          </Button>
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    padding: Space.$4,
  },
  list: {
    padding: Space.$4,
    paddingBottom: 200,
  },
  item: {
    marginBottom: Space.$3,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: Space.$4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopWidth: 1,
  },
  priceContainer: {
    flex: 1,
  },
  checkoutButton: {
    width: 140,
  },
  emptyText: {
    textAlign: "center",
    marginTop: Space.$8,
  },
});
