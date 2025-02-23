import { Alert, Dimensions, StyleSheet } from 'react-native'
import { ThemedText, ThemedView } from '@/components/ui/atoms'
import { useColorScheme } from 'react-native'
import { Colors, Space } from '@/constants'
import { Button } from '@/components/ui/molecules'
import { useAuthStore } from '@/store/auth'
import { router } from 'expo-router'
import Image from '@/components/ui/molecules/Image'

const width = Dimensions.get('window').width

export default function Profile () {
  const colorScheme = useColorScheme()
  const clearAuth = useAuthStore(state => state.clearAuth)
  const userData = useAuthStore(state => state.userData)

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
      <Image
        source={{
          uri:
            colorScheme === 'light'
              ? 'https://github.com/vishnuchandramc/ecom-mobile-app/blob/bug_fixes/ecom-mobile/src/assets/images/image9.jpg?raw=true'
              : 'https://github.com/vishnuchandramc/ecom-mobile-app/blob/bug_fixes/ecom-mobile/src/assets/images/image10.jpg?raw=true'
        }}
        style={[styles.headerImage]}
      />
      <ThemedView style={styles.profileContainer}>
        <Image
          source={{
            uri: `https://ui-avatars.com/api/?background=1B1B1B&color=fff&name=${userData?.name}`
          }}
          style={[
            styles.profileImageContainer,
            { borderColor: Colors[colorScheme ?? 'light'].background }
          ]}
        />
        <ThemedText type='hero' style={styles.title}>
          {userData?.name}
        </ThemedText>
        <ThemedText type='default' style={{ paddingTop: Space.$2 }}>
          {userData?.email}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.versionContainer}>
        <ThemedText type='default'>App version: </ThemedText>
        <ThemedText type='default'>1.0.0</ThemedText>
      </ThemedView>
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
    fontFamily: 'AtypTextBold'
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    top: -50,
    borderWidth: 4,
    alignSelf: 'center'
  },
  logoutButton: {
    margin: Space.$4
  },
  headerImage: {
    width: '100%',
    height: width
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  versionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
