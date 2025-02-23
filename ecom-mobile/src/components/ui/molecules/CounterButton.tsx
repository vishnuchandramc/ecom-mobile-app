import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  StyleProp,
  View
} from 'react-native'
import { ThemedText } from '../atoms/ThemedText'
import { useColorScheme } from '@/hooks/useColorScheme'
import { Colors, Space, BorderRadius, fontSize } from '@/constants'
import { ThemedView } from '../atoms'

interface CounterButtonProps {
  value: number
  onIncrement: () => void
  onDecrement: () => void
  disabled?: boolean
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

export const CounterButton: React.FC<CounterButtonProps> = ({
  value,
  onIncrement,
  onDecrement,
  disabled = false,
  style,
  textStyle
}) => {
  const colorScheme = useColorScheme()

  return (
    <ThemedView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? 'light'].primary },
        disabled && styles.disabled,
        style
      ]}
    >
      <TouchableOpacity
        onPress={onDecrement}
        disabled={disabled || value <= 0}
        style={[styles.button, { opacity: value <= 0 ? 0.5 : 1 }]}
      >
        <ThemedText
          style={[
            styles.buttonText,
            { color: Colors[colorScheme ?? 'light'].background }
          ]}
        >
          -
        </ThemedText>
      </TouchableOpacity>

      <ThemedView
        style={[
          styles.valueContainer,
          { backgroundColor: Colors[colorScheme ?? 'light'].primary }
        ]}
      >
        <ThemedText
          style={[
            styles.value,
            { color: Colors[colorScheme ?? 'light'].background },
            textStyle
          ]}
        >
          {value}
        </ThemedText>
      </ThemedView>

      <TouchableOpacity
        onPress={onIncrement}
        disabled={disabled}
        style={[styles.button, { opacity: disabled ? 0.5 : 1 }]}
      >
        <ThemedText
          style={[
            styles.buttonText,
            { color: Colors[colorScheme ?? 'light'].background }
          ]}
        >
          +
        </ThemedText>
      </TouchableOpacity>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: BorderRadius.rounded,
    minHeight: Space.$8,
    overflow: 'hidden'
  },
  disabled: {
    opacity: 0.5
  },
  button: {
    padding: Space.$3,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minWidth: Space.$8
  },
  buttonText: {
    fontSize: fontSize.title,
    fontFamily: 'AtypTextMedium'
  },
  valueContainer: {
    paddingHorizontal: Space.$2,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  value: {
    fontSize: fontSize.default,
    fontFamily: 'AtypTextMedium',
    textAlign: 'center'
  }
})
