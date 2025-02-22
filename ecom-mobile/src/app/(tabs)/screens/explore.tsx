import React, { useCallback } from "react";
import {
  StyleSheet,
  useColorScheme,
  ActivityIndicator,
  Text,
} from "react-native";
import { useProductListing } from "@/hooks/listing/useProductListing";
import { Colors, Space } from "@/constants";
import { ThemedView } from "@/components/ui/atoms";
import Header from "@/components/ui/molecules/Header";
import { FlashList } from "@shopify/flash-list";
import Card from "@/components/ui/organisms/Card";
import { Search } from "@/components/ui/molecules";
import useCartStore from "@/store/cart";
import { Product } from "@/models/ProductModel";

const ExploreScreen = () => {
  const colorScheme = useColorScheme();
  const counter = useCartStore((state) => state.totalItems);
  const cartStore = useCartStore();
  const {
    products,
    isLoading,
    error,
    loadMore,
    isLoadingMore,
    refresh,
    isRefreshing,
  } = useProductListing();

  if (isLoading) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <Text>{error}</Text>
      </ThemedView>
    );
  }

  const handleCart = (item: Product) => {
    cartStore.addItem({
      id: String(item.id),
      name: item.title,
      price: item.price,
      image: item.images[0],
    });
  };

  return (
    <ThemedView style={styles.container}>
      <Header title="Explore" />
      <ThemedView style={styles.searchBar}>
        <Search placeholder="Search" onChangeText={() => {}} />
      </ThemedView>
      <FlashList
        data={products}
        estimatedItemSize={200}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        onRefresh={refresh}
        refreshing={isRefreshing}
        ListFooterComponent={() =>
          isLoadingMore ? <ActivityIndicator style={styles.footer} /> : null
        }
        renderItem={({ item }) => (
          <ThemedView style={{ marginVertical: Space.$4, flex: 1 }}>
            <Card
              title={item.title}
              imageUrl={item.images[0]}
              subtitle={`${item.price}`}
              imageStyle={{ height: 350 }}
              onAddToCart={() => handleCart(item)}
              chipTitle={item.category.name}
              chipStyle={{
                backgroundColor: Colors[colorScheme ?? "light"].background,
              }}
            />
          </ThemedView>
        )}
      />
    </ThemedView>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Space.$2,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    padding: Space.$4,
  },
  searchBar: {
    marginVertical: Space.$4,
    marginHorizontal: Space.$2,
  },
});
