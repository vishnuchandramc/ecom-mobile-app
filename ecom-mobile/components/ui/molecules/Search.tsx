import React from "react";
import {
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  TextStyle,
  StyleProp,
  TouchableOpacity,
} from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { Space, BorderRadius } from "@/constants/Space";
import SearchIcon from "@/assets/icons/SearchIcon";
import FilterIcon from "@/assets/icons/FilterIcon";

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
}) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const defaultIconColor = iconColor || colors.icon;

  const handleSubmit = () => {
    if (value && onSearch) {
      onSearch(value);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { borderColor: colors.primary },
        containerStyle,
      ]}
    >
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
      />

      {showFilter && (
        <TouchableOpacity onPress={onFilterPress} style={styles.filterButton}>
          <FilterIcon size={20} color={defaultIconColor} />
        </TouchableOpacity>
      )}
    </View>
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
