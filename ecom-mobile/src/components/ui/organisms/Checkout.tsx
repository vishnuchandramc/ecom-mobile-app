import { Platform, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { ThemedText } from '../atoms'
import { ThemedView } from '../atoms'
import { Colors, Space } from '@/constants'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useCartStore from '@/store/cart'
import { Button } from '../molecules'
import { router } from 'expo-router'

const Checkout = () => {
  const insets = useSafeAreaInsets()
  const colorScheme = useColorScheme()
  const { items, totalPrice, clearCart } = useCartStore()

  return (
    <ThemedView
      style={[
        styles.bottomBar,
        {
          paddingBottom: insets.bottom,
          borderTopColor: Colors[colorScheme ?? 'light'].border,
          marginBottom: Platform.OS === 'ios' ? 0 : Space.$4
        }
      ]}
    >
      <ThemedView style={styles.priceContainer}>
        <ThemedText type='default'>Total</ThemedText>
        <ThemedText type='title'>${totalPrice.toFixed(2)}</ThemedText>
        <ThemedText
          type='default'
          style={{ fontSize: 12, width: '60%', lineHeight: 16 }}
        >
          Exclusive of all taxes and shipping charges
        </ThemedText>
      </ThemedView>

      <Button
        variant='primary'
        onPress={() => {
          clearCart()
          router.replace('/(tabs)/screens')
        }}
        style={styles.checkoutButton}
        disabled={items.length === 0}
      >
        Checkout
      </Button>
    </ThemedView>
  )
}

export default Checkout

const styles = StyleSheet.create({
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Space.$4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1
  },
  priceContainer: {
    flex: 1
  },
  checkoutButton: {
    width: 140
  }
})
