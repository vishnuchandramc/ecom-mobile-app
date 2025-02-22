import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import React from "react";
import CartIcon from "@/assets/icons/CartIcon";
import { Colors, Space } from "@/constants";
import { Button, Search } from "@/components/ui/molecules";
import { Carousel } from "@/components/ui/organisms/Carausel";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedView, ThemedText } from "@/components/ui/atoms";
import Header from "@/components/ui/molecules/Header";
import { useCategoryList } from "@/hooks/listing/useCategoryList";
import { FlashList } from "@shopify/flash-list";
import Card from "@/components/ui/organisms/Card";
import TitleContainer from "@/components/ui/molecules/TitleContainer";
import Footer from "@/components/ui/organisms/Footer";
import { router } from "expo-router";

const index = () => {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();

  const { categories, isLoading, error } = useCategoryList();

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator
          size="large"
          color={Colors[colorScheme ?? "light"].primary}
        />
      </ThemedView>
    );
  }

  if (error) {
    return <ThemedView style={styles.container}></ThemedView>;
  }

  const ListHeaderComponent = () => {
    return (
      <ThemedView>
        <Carousel
          images={[
            "https://picsum.photos/id/870/200/300?grayscale&blur=2&random=1",
          ]}
          activeIndicatorColor={Colors[colorScheme ?? "light"].primary}
          indicatorColor={Colors[colorScheme ?? "light"].primary}
          width={width - Space.$1 * 2}
        >
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.8)"]}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: 100,
            }}
          />
          <ThemedView
            style={{
              flex: 1,
              backgroundColor: "transparent",
              flexDirection: "column-reverse",
              paddingHorizontal: Space.$4,
              paddingBottom: Space.$6,
            }}
          >
            <Button
              variant="tertiary"
              onPress={() => {
                router.navigate("/screens/explore");
              }}
              textStyle={{
                color: Colors["dark"].primary,
              }}
              style={{
                width: 80,
                alignSelf: "flex-start",
                paddingHorizontal: 0,
                paddingVertical: Space.$2,
              }}
            >
              Shop now
            </Button>
            <ThemedText
              type="default"
              style={{ color: Colors["dark"].primary }}
            >
              Available for a limited time
            </ThemedText>
            <ThemedText type="title" style={{ color: Colors["dark"].primary }}>
              Summer 2025 best deals
            </ThemedText>
          </ThemedView>
        </Carousel>
        <TitleContainer
          title="Shop by category"
          subtitle="Explore our wide range of categories"
        />
      </ThemedView>
    );
  };
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <Header
          title="BLUME."
          titleStyle={styles.title}
          rightIcon={
            <Pressable
              onPress={() => {
                router.navigate(`/(other)/Cart`);
              }}
            >
              <ThemedView style={{ padding: Space.$1 }}>
                <CartIcon
                  color={Colors[colorScheme ?? "light"].primary}
                  size={Space.$5}
                />
              </ThemedView>
            </Pressable>
          }
        />
      </ThemedView>
      <ThemedView style={styles.contentContainer}>
        <Search
          onSearch={() => {}}
          showFilter={false}
          isClickable={true}
          inputStyle={{ paddingVertical: Space.$1 }}
          onPress={() => {
            router.navigate("/screens/explore");
          }}
        />
      </ThemedView>
      <FlashList
        data={categories}
        ListHeaderComponent={ListHeaderComponent}
        style={{ width }}
        numColumns={2}
        renderItem={({ item, index }) => (
          <ThemedView style={{ margin: Space.$0, flex: 1 }}>
            <Card
              id={item.id.toString()}
              title={item.name}
              imageUrl={item.image}
              style={{ borderWidth: 1 }}
              showATCButton={false}
              onPress={() => {
                router.navigate(`/(other)/CategoryList?categoryId=${item.id}`);
              }}
            />
          </ThemedView>
        )}
        ListFooterComponent={Footer}
      />
    </ThemedView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Space.$1,
  },
  title: {
    fontFamily: "AtypTextBold",
  },
  headerContainer: {
    paddingHorizontal: Space.$3,
  },
  contentContainer: {
    paddingVertical: Space.$5,
    paddingHorizontal: Space.$3,
  },
  buttonContainer: {
    width: "100%",
    paddingBottom: 100,
  },
});
