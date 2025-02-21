import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  StyleProp,
  View,
} from "react-native";
import { ThemedText } from "../atoms/ThemedText";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Space, BorderRadius } from "@/constants/Space";
import { fontSize } from "@/constants/fontSize";

interface CounterButtonProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  min?: number;
  max?: number;
}

export const CounterButton: React.FC<CounterButtonProps> = ({
  value,
  onIncrement,
  onDecrement,
  disabled = false,
  style,
  textStyle,
  min = 0,
  max = 99,
}) => {
  const colorScheme = useColorScheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? "light"].primary },
        disabled && styles.disabled,
        style,
      ]}
    >
      <TouchableOpacity
        onPress={onDecrement}
        disabled={disabled || value <= min}
        style={[styles.button, { opacity: value <= min ? 0.5 : 1 }]}
      >
        <ThemedText
          style={[
            styles.buttonText,
            { color: Colors[colorScheme ?? "light"].background },
          ]}
        >
          -
        </ThemedText>
      </TouchableOpacity>

      <View style={styles.valueContainer}>
        <ThemedText
          style={[
            styles.value,
            { color: Colors[colorScheme ?? "light"].background },
            textStyle,
          ]}
        >
          {value}
        </ThemedText>
      </View>

      <TouchableOpacity
        onPress={onIncrement}
        disabled={disabled || value >= max}
        style={[styles.button, { opacity: value >= max ? 0.5 : 1 }]}
      >
        <ThemedText
          style={[
            styles.buttonText,
            { color: Colors[colorScheme ?? "light"].background },
          ]}
        >
          +
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: BorderRadius.rounded,
    minHeight: Space.$8,
    overflow: "hidden",
  },
  disabled: {
    opacity: 0.5,
  },
  button: {
    padding: Space.$3,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    minWidth: Space.$8,
  },
  buttonText: {
    fontSize: fontSize.title,
    fontFamily: "AtypTextMedium",
  },
  valueContainer: {
    paddingHorizontal: Space.$2,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontSize: fontSize.default,
    fontFamily: "AtypTextMedium",
    textAlign: "center",
  },
});
