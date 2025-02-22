import {
  ScrollView,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { ThemedView } from "@/components/ui/atoms/ThemedView";
import { ThemedText } from "@/components/ui/atoms/ThemedText";
import { router, useLocalSearchParams } from "expo-router";
import { useProductDetails } from "@/hooks/listing/useProductDetails";

import { Carousel } from "@/components/ui/organisms/Carausel";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Space } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/ui/molecules/Header";
import { Chip } from "@/components/ui/molecules/Chip";
import { BottomBar } from "@/components/ui/organisms/BottomBar";
const Details = () => {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const { id } = useLocalSearchParams<{
    id: string;
  }>();

  const { product, isLoading, error } = useProductDetails(id);

  if (isLoading) {
    return (
      <ThemedView>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  if (error || !product) {
    return (
      <ThemedView>
        <ThemedText>No data found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <Header
        title={"Details"}
        leftIcon={
          <Ionicons
            name="chevron-back"
            color={Colors[colorScheme ?? "light"].primary}
            size={24}
            onPress={() => router.back()}
          />
        }
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <Carousel images={product.images} height={400} width={width} />
        <ThemedView style={styles.productInfo}>
          <ThemedText type="hero" style={styles.title}>
            {product.title}
          </ThemedText>
          <ThemedView style={styles.priceContainer}>
            <Chip
              title={product.category.name}
              textColor={Colors[colorScheme ?? "light"].background}
              style={{
                backgroundColor: Colors[colorScheme ?? "light"].primary,
              }}
            />
          </ThemedView>
          <ThemedText type="hero" style={styles.price}>
            ${product.price}
          </ThemedText>
          <ThemedView
            style={{
              borderBottomWidth: 1,
              borderBottomColor: Colors[colorScheme ?? "light"].border,
              marginVertical: Space.$4,
            }}
          />
          <ThemedText style={styles.description}>
            {product.description}
          </ThemedText>
        </ThemedView>
      </ScrollView>
      <ThemedView style={styles.bottomBar}>
        <BottomBar item={product} />
      </ThemedView>
    </SafeAreaView>
  );
};
export default Details;
const styles = StyleSheet.create({
  container: {
    marginHorizontal: "auto",
  },
  productInfo: {
    marginTop: Space.$4,
    marginHorizontal: Space.$4,
  },
  title: {
    marginBottom: 12,
  },
  price: {
    marginBottom: 16,
  },
  description: {
    lineHeight: 24,
  },
  priceContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    marginHorizontal: Space.$4,
  },
});
