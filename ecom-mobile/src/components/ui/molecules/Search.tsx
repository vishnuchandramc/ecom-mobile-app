import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  TextStyle,
  StyleProp,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors, Space, BorderRadius } from "@/constants";
import SearchIcon from "@/assets/icons/SearchIcon";
import FilterIcon from "@/assets/icons/FilterIcon";
import { ThemedView } from "../atoms";

interface SearchProps {
  onSearch?: (text: string) => void;
  onFilterPress?: () => void;
  showFilter?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  iconColor?: string;
  placeholderTextColor?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  isClickable?: boolean;
  onPress?: () => void;
}

export const Search: React.FC<SearchProps> = ({
  onSearch,
  onFilterPress,
  showFilter = true,
  containerStyle,
  inputStyle,
  iconColor,
  placeholderTextColor,
  value,
  onChangeText,
  placeholder = "Search",
  isClickable = false,
  onPress,
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const defaultIconColor = iconColor || colors.icon;

  const handleSubmit = () => {
    if (value && onSearch) {
      onSearch(value);
    }
  };

  const searchContent = (
    <>
      <SearchIcon size={20} color={defaultIconColor} />
      <TextInput
        style={[
          styles.input,
          { color: Colors[colorScheme ?? "light"].primary },
          inputStyle,
        ]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || colors.icon}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={handleSubmit}
        editable={!isClickable}
        pointerEvents={isClickable ? "none" : "auto"}
      />
      {showFilter && (
        <TouchableOpacity
          onPress={isClickable ? undefined : onFilterPress}
          style={styles.filterButton}
          disabled={isClickable}
        >
          <FilterIcon size={20} color={defaultIconColor} />
        </TouchableOpacity>
      )}
    </>
  );

  if (isClickable) {
    return (
      <Pressable onPress={onPress}>
        <ThemedView
          style={[
            styles.container,
            { borderColor: colors.primary },
            containerStyle,
          ]}
        >
          {searchContent}
        </ThemedView>
      </Pressable>
    );
  }

  return (
    <ThemedView
      style={[
        styles.container,
        { borderColor: colors.primary },
        containerStyle,
      ]}
    >
      {searchContent}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Space.$4,
    paddingVertical: Space.$4,
    borderWidth: Space.$0,
    borderRadius: BorderRadius.rounded,
    backgroundColor: "transparent",
    minHeight: Space.$8,
  },
  input: {
    flex: 1,
    marginLeft: Space.$2,
    fontSize: 16,
    fontFamily: "AtypTextMedium",
    padding: 0,
  },
  filterButton: {
    marginLeft: Space.$2,
    padding: Space.$1,
  },
});
