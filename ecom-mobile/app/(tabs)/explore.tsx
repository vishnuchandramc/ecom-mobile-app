import React from "react";
import { ScrollView, StyleSheet, useColorScheme } from "react-native";
import { ProductTile } from "../../components/ui/molecules";
import { Space } from "@/constants/Space";
import { Colors } from "@/constants";

export default function ExploreScreen() {
  const colorScheme = useColorScheme();
  const handleQuantityChange = (quantity: number) => {
    console.log("Quantity changed:", quantity);
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? "light"].background },
      ]}
    >
      <ProductTile
        title="Classic red pullover Hoodie"
        price={152}
        imageUrl="https://picsum.photos/200/300"
        onQuantityChange={handleQuantityChange}
        style={{ marginBottom: Space.$4 }}
      />
      <ProductTile
        title="Classic red pullover Hoodie"
        price={152}
        imageUrl="https://picsum.photos/200/300"
        onQuantityChange={handleQuantityChange}
        style={{ marginBottom: Space.$4 }}
      />
      <ProductTile
        title="Classic red pullover Hoodie"
        price={152}
        imageUrl="https://picsum.photos/200/300"
        onQuantityChange={handleQuantityChange}
        style={{ marginBottom: Space.$4 }}
      />
      <ProductTile
        title="Classic red pullover Hoodie"
        price={152}
        imageUrl="https://picsum.photos/200/300"
        onQuantityChange={handleQuantityChange}
        style={{ marginBottom: Space.$4 }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
