import React from 'react'
import { StyleSheet } from 'react-native'
import { FlashList } from '@shopify/flash-list'
import { ProductTile } from '@/components/ui/organisms/ProductTile'
import { ThemedView } from '@/components/ui/atoms/ThemedView'
import { Space } from '@/constants/Space'
import useCartStore from '@/store/cart'
import Header from '@/components/ui/molecules/Header'
import Wrapper from '@/components/ui/molecules/Wrapper'
import EmptyListIndicator from '@/components/ui/organisms/EmptyListIndicator'
import Checkout from '@/components/ui/organisms/Checkout'

const Cart = () => {
  const { items } = useCartStore()

  const ListEmptyComponent = () => {
    return (
      <ThemedView style={styles.emptyContainer}>
        <EmptyListIndicator
          title='Your cart is empty'
          description='Add some products to your cart'
          showHeader={false}
        />
      </ThemedView>
    )
  }

  return (
    <Wrapper>
      <ThemedView style={styles.container}>
        <Header title='Cart' />

        <FlashList
          data={items}
          renderItem={({ item }) => (
            <ProductTile item={item} style={styles.item} />
          )}
          estimatedItemSize={200}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
          ListEmptyComponent={ListEmptyComponent}
        />
        <Checkout />
      </ThemedView>
    </Wrapper>
  )
}

export default Cart

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    padding: Space.$4
  },
  list: {
    padding: Space.$4,
    paddingBottom: 200
  },
  item: {
    marginBottom: Space.$3
  },
  emptyContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyText: {
    textAlign: 'center',
    marginTop: Space.$8
  }
})
