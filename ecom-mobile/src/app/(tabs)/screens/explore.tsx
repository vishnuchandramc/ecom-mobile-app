import React, { useState } from 'react'
import { StyleSheet, ActivityIndicator, Text } from 'react-native'
import { useProductListing } from '@/hooks/listing/useProductListing'
import { Space } from '@/constants'
import { ThemedView } from '@/components/ui/atoms'
import Header from '@/components/ui/molecules/Header'
import { FlashList } from '@shopify/flash-list'
import { Search } from '@/components/ui/molecules'
import ProductItem from '@/components/ui/organisms/Product'
import EmptyListIndicator from '@/components/ui/organisms/EmptyListIndicator'

const ExploreScreen = () => {
  const [inputValue, setInputValue] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const {
    products,
    isLoading,
    error,
    loadMore,
    isLoadingMore,
    refresh,
    isRefreshing
  } = useProductListing({ keyword: searchQuery })

  const handleSearch = (text: string) => {
    setSearchQuery(text)
  }

  const handleReset = () => {
    setInputValue('')
    setSearchQuery('')
  }

  if (isLoading) {
    return (
      <ThemedView style={[styles.container, styles.centered]}>
        <ActivityIndicator size='large' />
      </ThemedView>
    )
  }

  const ListEmptyComponent = () => {
    if (searchQuery && products.length === 0) {
      return (
        <EmptyListIndicator
          title='No products found'
          description='Please try with different keyword'
          showHeader={false}
        />
      )
    }
  }

  if (!searchQuery && (error || products.length === 0)) {
    return (
      <EmptyListIndicator
        title='Something went wrong'
        description='Please try again later'
      />
    )
  }

  return (
    <ThemedView style={styles.container}>
      <Header title='Explore' />
      <ThemedView style={styles.searchBar}>
        <Search
          placeholder='Search products and press enter'
          onSearch={handleSearch}
          value={inputValue}
          onChangeText={setInputValue}
          onClear={handleReset}
          showFilter={true}
        />
      </ThemedView>
      <FlashList
        data={products}
        estimatedItemSize={200}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        onRefresh={refresh}
        ListEmptyComponent={ListEmptyComponent}
        refreshing={isRefreshing}
        ListFooterComponent={() =>
          isLoadingMore ? <ActivityIndicator style={styles.footer} /> : null
        }
        renderItem={({ item }) => <ProductItem item={item} />}
      />
    </ThemedView>
  )
}

export default ExploreScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Space.$2
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  footer: {
    padding: Space.$4
  },
  searchBar: {
    marginVertical: Space.$4,
    marginHorizontal: Space.$2
  }
})
