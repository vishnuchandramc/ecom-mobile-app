import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View
} from 'react-native'
import { useRouter, usePathname } from 'expo-router'
import useCartStore from '@/store/cart'
import { ThemedText } from '../atoms'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BorderRadius, Colors, Space } from '@/constants'

export const CartToast: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const insets = useSafeAreaInsets()
  const itemCount = useCartStore(state => state.items.length)
  const colorScheme = useColorScheme()

  if (
    itemCount === 0 ||
    pathname.includes('/Cart') ||
    pathname.includes('(auth)') ||
    pathname === '/Cart' ||
    pathname === '/' ||
    pathname === '/screens/Login' ||
    pathname === '/screens/Signup' ||
    pathname === '/screens/profile'
  )
    return null

  const handlePress = () => {
    router.push('/(other)/Cart')
  }

  const bottomPadding = () => {
    if (pathname === '/CategoryList') return 10
    if (pathname === '/screens' || pathname === '/screens/explore') return 90
    return 110
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          bottom: insets.bottom + bottomPadding(),
          backgroundColor: Colors[colorScheme ?? 'light'].primary
        }
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <ThemedText
          style={[
            styles.text,
            { color: Colors[colorScheme ?? 'light'].background }
          ]}
        >
          {itemCount} {itemCount === 1 ? 'item' : 'items'} in cart
        </ThemedText>
        <ThemedText
          style={[
            styles.viewCart,
            { color: Colors[colorScheme ?? 'light'].background }
          ]}
        >
          View Cart
        </ThemedText>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: Space.$5,
    right: Space.$5,
    borderRadius: BorderRadius.standard,
    padding: Space.$4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontSize: 16
  },
  viewCart: {
    fontSize: 16,
    textDecorationLine: 'underline'
  }
})
