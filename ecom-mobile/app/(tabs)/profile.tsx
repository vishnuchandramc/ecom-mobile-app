import { StyleSheet } from "react-native";
import { ThemedText, ThemedView } from "@/components/ui/atoms";
import { useColorScheme } from "react-native";
import { Colors, Space } from "@/constants";
import { Button } from "@/components/ui/molecules";
import { useAuthStore } from "@/store/auth";
import { router } from "expo-router";

export default function Profile() {
  const colorScheme = useColorScheme();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  const handleLogout = () => {
    clearAuth();
    router.replace("/(auth)");
  };

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? "light"].background },
      ]}
    >
      <ThemedText type="title" style={styles.title}>
        Profile Screen
      </ThemedText>

      <Button
        variant="primary"
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        Logout
      </Button>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Space.$4,
  },
  title: {
    textAlign: "center",
    marginBottom: Space.$4,
  },
  logoutButton: {
    marginTop: "auto",
    marginBottom: 100,
  },
});
