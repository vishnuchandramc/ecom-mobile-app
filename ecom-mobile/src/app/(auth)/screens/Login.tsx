import { StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { ThemedText, ThemedView, ThemedInput } from '@/components/ui/atoms'
import { Button } from '@/components/ui/molecules'
import { Colors, Space } from '@/constants'
import { useLogin } from '@/hooks/auth/useLogin'
import Wrapper from '@/components/ui/molecules/Wrapper'

const Login = () => {
  const colorScheme = useColorScheme()
  const { form, formErrors, loading, error, handleChange, handleSubmit } =
    useLogin()

  return (
    <Wrapper style={styles.wrapper}>
      <Button
        variant='tertiary'
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <Ionicons
          name='close'
          size={24}
          color={Colors[colorScheme ?? 'light'].primary}
        />
      </Button>

      <ThemedText type='title' style={[styles.title]}>
        Welcome Back
      </ThemedText>
      <ThemedText type='default' style={[styles.subtitle]}>
        Login with your email and password
      </ThemedText>

      <ThemedInput
        placeholder='Email'
        value={form.email}
        onChangeText={handleChange('email')}
        keyboardType='email-address'
        autoCapitalize='none'
        error={formErrors.email ?? undefined}
      />

      <ThemedInput
        placeholder='Password'
        value={form.password}
        onChangeText={handleChange('password')}
        secureTextEntry
        error={formErrors.password ?? undefined}
      />

      {error && (
        <ThemedText
          type='default'
          style={[
            styles.error,
            { color: Colors[colorScheme ?? 'light'].error }
          ]}
        >
          {error}
        </ThemedText>
      )}

      <Button
        variant='primary'
        style={styles.button}
        onPress={handleSubmit}
        disabled={
          loading || Object.values(formErrors).some(error => error !== null)
        }
      >
        {loading ? 'Loading...' : 'Login'}
      </Button>

      <ThemedView
        style={[
          styles.footer,
          { backgroundColor: Colors[colorScheme ?? 'light'].background }
        ]}
      >
        <ThemedText
          type='default'
          style={[{ color: Colors[colorScheme ?? 'light'].primary }]}
        >
          Don't have an account?{' '}
        </ThemedText>
        <Button
          variant='tertiary'
          style={styles.link}
          onPress={() => router.push('/(auth)/screens/Signup')}
        >
          Sign up
        </Button>
      </ThemedView>
    </Wrapper>
  )
}

export default Login

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 40,
    zIndex: 1,
    padding: Space.$2
  },
  title: {
    marginBottom: Space.$2,
    textAlign: 'center'
  },
  subtitle: {
    marginBottom: Space.$4,
    textAlign: 'center',
    width: '80%',
    alignSelf: 'center'
  },
  button: {
    marginTop: Space.$4
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Space.$4
  },
  link: {
    paddingVertical: 0,
    paddingHorizontal: 0
  },
  error: {
    marginTop: Space.$2,
    marginBottom: Space.$4,
    textAlign: 'center'
  },
  wrapper: {
    paddingHorizontal: Space.$4
  }
})
