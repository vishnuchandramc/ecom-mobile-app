import React from "react";
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
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ProductItem from "@/components/ui/organisms/Product";

const CategoryList = () => {
  const colorScheme = useColorScheme();
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();

  const {
    products,
    isLoading,
    error,
    loadMore,
    isLoadingMore,
    refresh,
    isRefreshing,
  } = useProductListing({
    categoryId: Number(categoryId),
  });

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
    <SafeAreaView
      style={[
        { flex: 1, backgroundColor: Colors[colorScheme ?? "light"].background },
      ]}
    >
      <ThemedView
        style={[
          styles.container,
          { backgroundColor: Colors[colorScheme ?? "light"].background },
        ]}
      >
        <Header
          title={products?.[0]?.category?.name || "Category"}
          leftIcon={
            <Ionicons
              name="chevron-back"
              color={Colors[colorScheme ?? "light"].primary}
              size={24}
              onPress={() => router.back()}
            />
          }
        />
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
    </SafeAreaView>
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: Space.$2,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    padding: Space.$4,
  },
});
