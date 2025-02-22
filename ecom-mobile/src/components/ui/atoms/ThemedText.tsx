import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";
import { fontSize } from "@/constants/fontSize";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "hero" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor(
    { light: lightColor, dark: darkColor },
    "primary"
  );

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "hero" ? styles.hero : undefined,
        type === "title" ? styles.title : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: fontSize.default,
    lineHeight: fontSize.defaultLineHeight,
    fontFamily: "AtypText",
  },
  hero: {
    fontSize: fontSize.hero,
    lineHeight: fontSize.heroLineHeight,
    fontFamily: "AtypTextMedium",
  },
  title: {
    fontSize: fontSize.title,
    lineHeight: fontSize.titleLineHeight,
    fontFamily: "AtypTextMedium",
  },
  subtitle: {
    fontSize: fontSize.subtitle,
    fontFamily: "AtypTextMedium",
  },
});
