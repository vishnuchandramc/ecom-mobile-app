import {
  StyleSheet,
  Pressable,
  useColorScheme,
  StyleProp,
  TextStyle,
} from "react-native";
import { ReactNode } from "react";
import { Colors } from "@/constants";
import { ThemedText, ThemedView } from "../atoms";

interface HeaderProps {
  title?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  titleStyle?: StyleProp<TextStyle>;
}

const Header = ({
  title,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  titleStyle,
}: HeaderProps) => {
  const colorScheme = useColorScheme();

  return (
    <ThemedView
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme ?? "light"].background,
          borderBottomColor: Colors[colorScheme ?? "light"].border,
        },
      ]}
    >
      <ThemedView style={styles.iconContainer}>
        {leftIcon && (
          <Pressable
            onPress={onLeftPress}
            hitSlop={8}
            style={styles.leftIconContainer}
          >
            {leftIcon}
          </Pressable>
        )}
      </ThemedView>

      <ThemedView style={styles.titleContainer}>
        {title && (
          <ThemedText type="title" style={[styles.title, titleStyle]}>
            {title}
          </ThemedText>
        )}
      </ThemedView>
      <ThemedView style={styles.iconContainer}>
        {rightIcon && (
          <Pressable onPress={onRightPress} hitSlop={8}>
            {rightIcon}
          </Pressable>
        )}
      </ThemedView>
    </ThemedView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 56,
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  leftIconContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
  },
});
