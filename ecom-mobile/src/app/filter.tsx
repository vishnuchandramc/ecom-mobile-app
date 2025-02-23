import { StyleSheet, Pressable, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import { ThemedView } from '@/components/ui/atoms/ThemedView'
import Checkbox from 'expo-checkbox'
import { ThemedText } from '@/components/ui/atoms'
import { Colors, Space } from '@/constants'
import { useCategoryList } from '@/hooks/listing/useCategoryList'
import CustomActivityIndicator from '@/components/ui/organisms/ActivityIndicator'
import EmptyListIndicator from '@/components/ui/organisms/EmptyListIndicator'
import { useColorScheme } from 'react-native'
import { useFilterStore } from '@/store/filterStore'
import { Button } from '@/components/ui/molecules'
import { router } from 'expo-router'
import Wrapper from '@/components/ui/molecules/Wrapper'
import CustomSlider, {
  CustomSliderRef
} from '@/components/ui/molecules/CustomSlider'
const filter = () => {
  const { categories, isLoading, error } = useCategoryList()
  const colorScheme = useColorScheme()
  const {
    price_min,
    price_max,
    categoryId,
    setPriceMin,
    setPriceMax,
    setCategoryId,
    resetFilters
  } = useFilterStore()

  const minSliderRef = useRef<CustomSliderRef>(null)
  const maxSliderRef = useRef<CustomSliderRef>(null)

  const [localCategoryId, setLocalCategoryId] = useState<number | null>(
    categoryId
  )

  if (isLoading) {
    return <CustomActivityIndicator />
  }
  if (error || categories.length === 0) {
    return (
      <EmptyListIndicator
        title='Error'
        description='Error fetching categories'
        showHeader={false}
      />
    )
  }

  const handleCheckboxChange = (itemId: number) => {
    setLocalCategoryId(localCategoryId === itemId ? null : itemId)
  }

  const handleApplyFilters = () => {
    setPriceMin(minSliderRef.current?.value ?? 0)
    setPriceMax(maxSliderRef.current?.value ?? 0)
    setCategoryId(localCategoryId)
    router.back()
  }

  const handleResetFilters = () => {
    resetFilters()
    setLocalCategoryId(null)
    router.back()
  }

  return (
    <Wrapper style={styles.container}>
      <ThemedView style={styles.section}>
        <ThemedText type='title' style={styles.sectionTitle}>
          Price Range
        </ThemedText>
        <ThemedView style={styles.sliderContainer}>
          <ThemedView style={styles.sliderRow}>
            <CustomSlider
              ref={minSliderRef}
              min={0}
              max={1000}
              value={price_min}
              label='Min'
            />
          </ThemedView>
          <ThemedView style={styles.sliderRow}>
            <CustomSlider
              ref={maxSliderRef}
              min={0}
              max={1000}
              value={price_max}
              label='Max'
            />
          </ThemedView>
        </ThemedView>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type='title' style={styles.sectionTitle}>
          Categories
        </ThemedText>
        <FlatList
          data={categories}
          keyExtractor={item => item.id.toString()}
          style={styles.categoryList}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleCheckboxChange(item.id)}
              style={({ pressed }) => [
                styles.categoryItem,
                pressed && styles.pressed,
                { borderBottomColor: Colors[colorScheme ?? 'light'].border }
              ]}
            >
              <Checkbox
                style={styles.checkbox}
                value={item.id === localCategoryId}
                color={
                  item.id === localCategoryId
                    ? Colors[colorScheme ?? 'light'].primary
                    : undefined
                }
                disabled={isLoading}
              />
              <ThemedText style={styles.categoryItemText}>
                {item.name}
              </ThemedText>
            </Pressable>
          )}
        />
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <Button
          variant='secondary'
          onPress={handleResetFilters}
          style={styles.resetButton}
        >
          Reset Filters
        </Button>
        <Button onPress={handleApplyFilters} style={styles.applyButton}>
          Apply Filters
        </Button>
      </ThemedView>
    </Wrapper>
  )
}

export default filter

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Space.$4
  },
  section: {
    marginBottom: Space.$6,
    paddingHorizontal: Space.$5
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: Space.$4
  },
  sliderContainer: {
    gap: Space.$4
  },
  sliderRow: {
    gap: Space.$2
  },

  categoryList: {
    maxHeight: 300
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Space.$3,
    borderBottomWidth: 1
  },
  categoryItemText: {
    fontSize: 16,
    marginLeft: Space.$2
  },
  checkbox: {
    margin: Space.$2
  },
  pressed: {
    opacity: 0.7
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: Space.$3,
    padding: Space.$5,
    marginTop: 'auto'
  },
  resetButton: {
    flex: 1
  },
  applyButton: {
    flex: 1
  }
})
