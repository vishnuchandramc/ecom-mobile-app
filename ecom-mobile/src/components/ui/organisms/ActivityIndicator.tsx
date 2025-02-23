import { ActivityIndicator, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { ThemedView } from '../atoms'
import { Colors } from '@/constants'

interface ActivityIndicatorProps {
  size?: 'small' | 'large'
}

const CustomActivityIndicator = ({
  size = 'large'
}: ActivityIndicatorProps) => {
  const colorScheme = useColorScheme()
  return (
    <ThemedView style={styles.container}>
      <ActivityIndicator
        size={size}
        color={Colors[colorScheme ?? 'light'].primary}
      />
    </ThemedView>
  )
}

export default CustomActivityIndicator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  }
})
