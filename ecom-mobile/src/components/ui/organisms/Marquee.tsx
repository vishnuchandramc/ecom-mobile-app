import React from 'react'
import {
  StyleSheet,
  View,
  Dimensions,
  ViewStyle,
  StyleProp
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing
} from 'react-native-reanimated'
import Image from '../molecules/Image'
import { ThemedView } from '../atoms'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

interface MarqueeProps {
  images: string[]
  direction?: 'rtl' | 'ltr'
  speed?: number
  height?: number
  gap?: number
  style?: StyleProp<ViewStyle>
}

export const Marquee: React.FC<MarqueeProps> = ({
  images,
  direction = 'ltr',
  speed = 10000,
  height = 50,
  gap = 20,
  style
}) => {
  const containerWidth = (height + gap) * images.length
  const startPosition = direction === 'rtl' ? 0 : -containerWidth
  const endPosition = direction === 'rtl' ? -containerWidth : 0

  const translateX = useSharedValue(startPosition)

  translateX.value = withRepeat(
    withTiming(endPosition, {
      duration: speed,
      easing: Easing.linear
    }),
    -1,
    false
  )

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }))

  const renderImages = () => {
    const duplicatedImages = [...images, ...images]

    return duplicatedImages.map((image, index) => (
      <ThemedView
        key={`${index}`}
        style={[
          styles.imageContainer,
          {
            marginRight: gap,
            height: height,
            width: height
          }
        ]}
      >
        <Image
          source={{ uri: image }}
          style={styles.image}
          contentFit='cover'
        />
      </ThemedView>
    ))
  }

  return (
    <ThemedView style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.marqueeContainer,
          {
            width: containerWidth * 2
          },
          animatedStyle
        ]}
      >
        {renderImages()}
      </Animated.View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: SCREEN_WIDTH
  },
  marqueeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageContainer: {
    borderRadius: 8,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  }
})
