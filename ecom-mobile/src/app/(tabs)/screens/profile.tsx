import { Alert, StyleSheet } from 'react-native'
import { ThemedText, ThemedView } from '@/components/ui/atoms'
import { useColorScheme } from 'react-native'
import { Colors, Space } from '@/constants'
import { Button } from '@/components/ui/molecules'
import { useAuthStore } from '@/store/auth'
import { router } from 'expo-router'
import Header from '@/components/ui/molecules/Header'
import Image from '@/components/ui/molecules/Image'
import ParallaxScrollView from '@/components/ui/organisms/ParallaxScrollView'

export default function Profile () {
  const colorScheme = useColorScheme()
  const clearAuth = useAuthStore(state => state.clearAuth)

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Logout',
        onPress: () => {
          clearAuth()
          router.replace('/(auth)')
        },
        style: 'destructive'
      }
    ])
  }

  return (
    <ThemedView
      style={[
        {
          flex: 1,
          backgroundColor: Colors[colorScheme ?? 'light'].background
        }
      ]}
    >
      <Header title='Profile' />
      <ParallaxScrollView
        headerBackgroundColor={{
          dark: Colors.dark.background,
          light: Colors.light.background
        }}
        headerImage={
          <Image
            source={{
              uri: 'https://github.com/vishnuchandramc/ecom-mobile-app/blob/code_refactor/ecom-mobile/src/assets/images/image6.jpg?raw=true'
            }}
          />
        }
      >
        <ThemedView style={styles.profileContainer}>
          <Image
            source={{
              uri: 'https://ui-avatars.com/api/?background=1B1B1B&color=fff&name=vi'
            }}
            style={[styles.profileImageContainer]}
          />
          <ThemedText type='hero' style={styles.title}>
            John Doe
          </ThemedText>
          <ThemedText type='default'>vcmpd@gmail.com</ThemedText>
        </ThemedView>
      </ParallaxScrollView>
      <Button
        variant='primary'
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        Logout
      </Button>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Space.$4
  },
  title: {
    textAlign: 'center',
    fontSize: 38,
    marginTop: Space.$4,
    fontFamily: 'AtypTextBold',
    paddingVertical: Space.$4,
    letterSpacing: 1,
    textTransform: 'uppercase'
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  logoutButton: {
    margin: Space.$4
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  }
})
