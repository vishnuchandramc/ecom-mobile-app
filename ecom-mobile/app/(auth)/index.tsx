import {
  SafeAreaView,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { router } from "expo-router";
import { ThemedView } from "@/components/ui/atoms/ThemedView";
import { ThemedText } from "@/components/ui/atoms/ThemedText";
import { Button } from "@/components/ui/molecules/Button";
import { Space } from "@/constants/Space";
import { Marquee } from "@/components/ui/organisms/Marquee";
import { Colors } from "@/constants";

const Auth = () => {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();

  const handleSignUp = () => {
    router.navigate("/(auth)/Signup");
  };

  const handleLogin = () => {
    router.navigate("/(auth)/Login");
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors[colorScheme ?? "light"].background,
      }}
    >
      <ThemedView style={styles.container}>
        <ThemedText
          style={{
            fontSize: 24,
            textAlign: "center",
            paddingBottom: Space.$8,
            paddingTop: Space.$4,
            fontWeight: "bold",
            fontFamily: "AtypTextBold",
          }}
        >
          BLUME.
        </ThemedText>
        <View style={styles.contentContainer}>
          <Marquee
            images={[
              "https://picsum.photos/id/870/200/300?grayscale&blur=2&random=1",
              "https://picsum.photos/id/870/200/300?grayscale&random=4",
              "https://picsum.photos/200/300?grayscale",
              "https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0",
            ]}
            height={width * 0.6}
            gap={Space.$5}
            speed={20000}
            style={{ marginBottom: Space.$5 }}
          />
          <ThemedText
            type="hero"
            style={{
              textAlign: "center",
              paddingVertical: Space.$5,
              width: "80%",
              alignSelf: "center",
            }}
          >
            Discover your next favourite in our latest collection.
          </ThemedText>
          <ThemedText
            type="default"
            style={{
              textAlign: "center",
              paddingVertical: Space.$3,
              width: "80%",
              alignSelf: "center",
            }}
          >
            Upgrade your look with new arrivals. Grab your favourite pieces and
            create your own style.
          </ThemedText>
        </View>

        <View style={styles.buttonContainer}>
          <Button variant="primary" onPress={handleSignUp}>
            Sign up with email
          </Button>
          <Button
            variant="secondary"
            onPress={handleLogin}
            style={{ marginTop: Space.$2 }}
          >
            Login with email
          </Button>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Space.$3,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    width: "100%",
    paddingBottom: Space.$3,
  },
});
