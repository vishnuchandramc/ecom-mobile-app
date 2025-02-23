import { StyleSheet, useColorScheme } from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { ThemedView } from '../atoms/ThemedView'
import { ThemedText } from '../atoms'
import Slider from '@react-native-community/slider'
import { Colors } from '@/constants/Colors'

interface CustomSliderProps {
  min: number
  max: number
  value: number
  label: string
}

export interface CustomSliderRef {
  value: number
}

const CustomSlider = forwardRef<CustomSliderRef, CustomSliderProps>(
  ({ min, max, value, label }, ref) => {
    const [localValue, setLocalValue] = useState(value)
    const colorScheme = useColorScheme()
    useImperativeHandle(ref, () => ({
      value: localValue
    }))
    return (
      <ThemedView>
        <ThemedText type='default'>{`${label}: ${localValue}`}</ThemedText>
        <Slider
          style={styles.slider}
          minimumValue={100}
          step={1}
          maximumValue={1000}
          value={localValue}
          minimumTrackTintColor={Colors[colorScheme ?? 'light'].primary}
          maximumTrackTintColor={Colors[colorScheme ?? 'light'].tint}
          onSlidingComplete={setLocalValue}
        />
      </ThemedView>
    )
  }
)

export default CustomSlider

const styles = StyleSheet.create({
  slider: {
    width: '100%',
    height: 40
  }
})
