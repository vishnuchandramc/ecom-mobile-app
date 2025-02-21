import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";
import { ThemedText } from "../atoms/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Space, BorderRadius } from "@/constants/Space";

interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary";
  onPress?: () => void;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  onPress,
  leadingIcon,
  trailingIcon,
  disabled = false,
  style,
  textStyle,
  children,
}) => {
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        variant === "primary"
          ? { backgroundColor: Colors[colorScheme ?? "light"].primary }
          : variant === "secondary"
          ? [
              styles.secondaryContainer,
              { borderColor: Colors[colorScheme ?? "light"].primary },
            ]
          : styles.tertiaryContainer,
        disabled && styles.disabled,
        style,
      ]}
    >
      {leadingIcon && <View style={styles.iconLeading}>{leadingIcon}</View>}

      <ThemedText
        style={[
          styles.text,
          variant === "primary"
            ? { color: Colors[colorScheme ?? "light"].background }
            : variant === "secondary"
            ? { color: Colors[colorScheme ?? "light"].primary }
            : styles.tertiaryText,
          disabled && { color: Colors[colorScheme ?? "light"].icon },
          textStyle,
        ]}
      >
        {children}
      </ThemedText>

      {trailingIcon && <View style={styles.iconTrailing}>{trailingIcon}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Space.md,
    paddingHorizontal: Space.md,
    borderRadius: BorderRadius.rounded,
    minHeight: Space.xl,
  },
  secondaryContainer: {
    backgroundColor: "transparent",
    borderWidth: Space.xxxs,
    paddingVertical: Space.sm,
    paddingHorizontal: Space.md,
  },
  tertiaryContainer: {
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    minHeight: Space.lg,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontFamily: "AtypTextMedium",
    textAlign: "center",
  },
  tertiaryText: {
    textDecorationLine: "underline",
  },
  iconLeading: {
    marginRight: Space.xs,
  },
  iconTrailing: {
    marginLeft: Space.xs,
  },
});
