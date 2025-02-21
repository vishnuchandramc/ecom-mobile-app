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
import { fontSize } from "@/constants/fontSize";

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
    paddingVertical: Space.$5,
    paddingHorizontal: Space.$3,
    borderRadius: BorderRadius.rounded,
    minHeight: Space.$8,
  },
  secondaryContainer: {
    backgroundColor: "transparent",
    borderWidth: Space.$0,
    paddingVertical: Space.$5 - Space.$0,
    paddingHorizontal: Space.$3 - Space.$0,
  },
  tertiaryContainer: {
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    minHeight: Space.$7,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: fontSize.default,
    fontFamily: "AtypTextMedium",
    textAlign: "center",
  },
  tertiaryText: {
    textDecorationLine: "underline",
  },
  iconLeading: {
    marginRight: Space.$2,
  },
  iconTrailing: {
    marginLeft: Space.$2,
  },
});
