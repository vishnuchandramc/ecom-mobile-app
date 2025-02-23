import React from 'react'
import {
  StyleSheet,
  useColorScheme,
  StyleProp,
  ViewStyle,
  Pressable
} from 'react-native'
import { ThemedView } from '../atoms/ThemedView'
import { ThemedText } from '../atoms/ThemedText'
import { CounterButton } from '../molecules/CounterButton'
import { BorderRadius, Colors, Space } from '@/constants'
import useCartStore from '@/store/cart'
import { Product } from '@/models/ProductModel'
import Image from '../molecules/Image'
import { router } from 'expo-router'

interface ProductTileProps {
  item: Product
  style?: StyleProp<ViewStyle>
}

export const ProductTile: React.FC<ProductTileProps> = ({ item, style }) => {
  const colorScheme = useColorScheme()
  const { addItem, removeItem } = useCartStore()
  const { id = 0, title, category, price, images = [], description } = item
  const strId = id.toString()
  const counter = useCartStore(state => state.getItemQuantity(strId))

  const onIncrement = () => {
    addItem(item)
  }

  const onDecrement = () => {
    removeItem(strId)
  }

  return (
    <Pressable
      onPress={() => router.navigate(`/(other)/Details?id=${id}`)}
      style={[
        styles.container,
        { borderColor: Colors[colorScheme ?? 'light'].border },
        style
      ]}
    >
      <Image source={{ uri: images[0] ?? '' }} style={styles.image} />
      <ThemedView style={styles.rightContent}>
        <ThemedView style={styles.content}>
          <ThemedText type='default' style={styles.title}>
            {title}
          </ThemedText>
          <ThemedText type='subtitle' style={styles.price}>
            ${price}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.counterContainer}>
          <CounterButton
            value={counter}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            style={styles.counter}
          />
        </ThemedView>
      </ThemedView>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: Space.$3,
    borderRadius: BorderRadius.standard,
    flexDirection: 'row',
    borderWidth: Space.$0
  },
  image: {
    width: 120,
    height: 140,
    borderRadius: 4,
    marginRight: 16
  },
  rightContent: {
    flex: 1,
    justifyContent: 'space-between'
  },
  content: {
    flex: 1
  },
  title: {
    marginBottom: 4,
    width: '80%'
  },
  price: {
    fontSize: 18,
    fontWeight: '600'
  },
  counterContainer: {
    width: 120,
    height: 55
  },
  counter: {
    marginTop: 8
  }
})
