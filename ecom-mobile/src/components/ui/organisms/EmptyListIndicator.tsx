import { StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { ThemedText, ThemedView } from '../atoms'
import Header from '../molecules/Header'
import { Colors } from '@/constants'
import { Ionicons } from '@expo/vector-icons'
import Wrapper from '../molecules/Wrapper'
import { router } from 'expo-router'

interface EmptyListIndicatorProps {
  title: string
  description: string
  showHeader?: boolean
}

const EmptyListIndicator = ({
  title,
  description,
  showHeader = true
}: EmptyListIndicatorProps) => {
  const colorScheme = useColorScheme()
  return (
    <Wrapper style={styles.wrapper}>
      {showHeader && (
        <Header
          title={'Oops!'}
          leftIcon={
            <Ionicons
              name='chevron-back'
              size={24}
              color={Colors[colorScheme ?? 'light'].primary}
              onPress={() => router.back()}
            />
          }
        />
      )}
      <ThemedView style={styles.container}>
        <ThemedText type='subtitle'>{title}</ThemedText>
        <ThemedText type='default'>{description}</ThemedText>
      </ThemedView>
    </Wrapper>
  )
}

export default EmptyListIndicator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    paddingHorizontal: 0
  }
})
