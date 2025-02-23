import React from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  interpolate,
  withSpring
} from 'react-native-reanimated'
import { ThemedView } from '../atoms'
import Image from '../molecules/Image'

interface CarouselProps {
  images: string[]
  children?: React.ReactNode
  height?: number
  width?: number
  indicatorColor?: string
  activeIndicatorColor?: string
}

const { width: screenWidth } = Dimensions.get('window')

export const Carousel: React.FC<CarouselProps> = ({
  images,
  children,
  width = screenWidth,
  height = 300,
  indicatorColor = '#ffffff80',
  activeIndicatorColor = '#ffffff'
}) => {
  const translateX = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      translateX.value = event.contentOffset.x
    }
  })

  return (
    <ThemedView style={[styles.container, { height }]}>
      {children && <ThemedView style={styles.overlay}>{children}</ThemedView>}

      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <ThemedView key={index} style={[styles.slide, { width }]}>
            <Image source={{ uri: image }} style={styles.image} />
          </ThemedView>
        ))}
      </Animated.ScrollView>

      {images.length > 1 && (
        <ThemedView style={styles.indicatorContainer}>
          {images.map((_, index) => (
            <CarouselIndicator
              key={index}
              index={index}
              translateX={translateX}
              activeColor={activeIndicatorColor}
              inactiveColor={indicatorColor}
              width={width}
            />
          ))}
        </ThemedView>
      )}
    </ThemedView>
  )
}

interface IndicatorProps {
  index: number
  translateX: Animated.SharedValue<number>
  activeColor: string
  inactiveColor: string
  width: number
}

const CarouselIndicator: React.FC<IndicatorProps> = ({
  index,
  translateX,
  activeColor,
  inactiveColor,
  width
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.5, 1, 0.5],
      'clamp'
    )

    const scale = interpolate(
      translateX.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [1, 1.2, 1],
      'clamp'
    )

    return {
      opacity,
      transform: [{ scale: withSpring(scale) }],
      backgroundColor: opacity === 1 ? activeColor : inactiveColor
    }
  })

  return <Animated.View style={[styles.indicator, animatedStyle]} />
}

const styles = StyleSheet.create({
  container: {
    position: 'relative'
  },
  slide: {
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    zIndex: 1
  }
})
