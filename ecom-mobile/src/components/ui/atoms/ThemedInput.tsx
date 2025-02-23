import {
  StyleSheet,
  TextInput,
  TextInputProps,
  Text,
  useColorScheme
} from 'react-native'
import React from 'react'
import { BorderRadius, Colors } from '@/constants'
import { ThemedView } from './ThemedView'
import { ThemedText } from './ThemedText'

interface ThemedInputProps extends TextInputProps {
  error?: string
}

const ThemedInput = ({ error, ...props }: ThemedInputProps) => {
  const colorScheme = useColorScheme()

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: Colors[colorScheme ?? 'light'].border,
            color: Colors[colorScheme ?? 'light'].primary,
            fontFamily: 'AtypText',
            borderColor: error
              ? Colors[colorScheme ?? 'light'].error
              : Colors[colorScheme ?? 'light'].border
          }
        ]}
        placeholderTextColor={Colors[colorScheme ?? 'light'].primary}
        {...props}
      />
      {error && (
        <ThemedText
          style={[
            styles.errorText,
            { color: Colors[colorScheme ?? 'light'].error }
          ]}
        >
          {error}
        </ThemedText>
      )}
    </ThemedView>
  )
}

export { ThemedInput }

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8
  },
  input: {
    height: 62,
    borderWidth: 1,
    borderRadius: BorderRadius.standard,
    paddingHorizontal: 16,
    fontSize: 16
  },
  errorText: {
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  }
})
