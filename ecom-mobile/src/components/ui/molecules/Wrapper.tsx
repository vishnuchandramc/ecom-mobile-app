import { StyleProp, StyleSheet, useColorScheme, ViewStyle } from 'react-native'
import React from 'react'
import { Colors, Space } from '@/constants'
import { SafeAreaView } from 'react-native-safe-area-context'

interface WrapperProps {
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
}

const Wrapper = ({ children, style }: WrapperProps) => {
  const colorScheme = useColorScheme()
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme ?? 'light'].background },
        style
      ]}
    >
      {children}
    </SafeAreaView>
  )
}

export default Wrapper

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})
