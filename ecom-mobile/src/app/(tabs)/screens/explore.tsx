import React from "react";
import { StyleSheet, ActivityIndicator, Text } from "react-native";
import { useProductListing } from "@/hooks/listing/useProductListing";
import { Space } from "@/constants";
import { ThemedView } from "@/components/ui/atoms";
import Header from "@/components/ui/molecules/Header";
import { FlashList } from "@shopify/flash-list";
import { Search } from "@/components/ui/molecules";
import ProductItem from "@/components/ui/organisms/Product";

const ExploreScreen = () => {
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
        renderItem={({ item }) => <ProductItem item={item} />}
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
