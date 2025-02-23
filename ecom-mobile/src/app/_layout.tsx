import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider
} from '@react-navigation/native'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useEffect } from 'react'
import { View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import { useColorScheme } from '@/hooks/useColorScheme'
import { useAuthStore } from '@/store/auth'
import { CartToast } from '@/components/ui/molecules/CartToast'

SplashScreen.preventAutoHideAsync()

export default function RootLayout () {
  const colorScheme = useColorScheme()
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  const [loaded] = useFonts({
    AtypText: require('../assets/fonts/AtypText-Regular.otf'),
    AtypTextBold: require('../assets/fonts/AtypText-Bold.otf'),
    AtypTextMedium: require('../assets/fonts/AtypText-Medium.otf')
  })

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen
              name='(auth)'
              options={{
                headerShown: false,
                headerTitle: '',
                title: '',
                header: () => null
              }}
              redirect={isAuthenticated}
            />
            <Stack.Screen
              name='(tabs)'
              options={{ headerShown: false }}
              redirect={!isAuthenticated}
            />
            <Stack.Screen name='(other)' options={{ headerShown: false }} />
            <Stack.Screen
              name='filter'
              options={{
                presentation: 'modal'
              }}
            />
            <Stack.Screen name='+not-found' options={{ headerShown: false }} />
          </Stack>
          <StatusBar style='auto' />
          <CartToast />
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
