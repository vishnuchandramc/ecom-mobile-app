import { StyleSheet, useColorScheme, useWindowDimensions } from "react-native";
import React from "react";
import { ThemedView } from "@/components/ui/atoms/ThemedView";
import { Space } from "@/constants/Space";
import Header from "@/components/ui/molecules/Header";
import CartIcon from "@/assets/icons/CartIcon";
import { Colors } from "@/constants";
import { Button, Search } from "@/components/ui/molecules";
import { Carousel } from "@/components/ui/organisms/Carausel";
import { ThemedText } from "@/components/ui/atoms/ThemedText";
import { LinearGradient } from "expo-linear-gradient";

const index = () => {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerContainer}>
        <Header
          title="BLUME."
          titleStyle={styles.title}
          rightIcon={
            <CartIcon
              color={Colors[colorScheme ?? "light"].primary}
              size={Space.$5}
            />
          }
        />
      </ThemedView>
      <ThemedView style={styles.contentContainer}>
        <Search onSearch={() => {}} showFilter={false} />
      </ThemedView>
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
            onPress={() => {}}
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
            style={{ color: Colors[colorScheme ?? "light"].background }}
          >
            Available for a limited time
          </ThemedText>
          <ThemedText
            type="title"
            style={{ color: Colors[colorScheme ?? "light"].background }}
          >
            Summer 2025 best deals
          </ThemedText>
        </ThemedView>
      </Carousel>
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
