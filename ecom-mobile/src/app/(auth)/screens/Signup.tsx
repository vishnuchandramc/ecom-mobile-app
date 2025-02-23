import { StyleSheet, useColorScheme, Animated } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import { ThemedText, ThemedView, ThemedInput } from '@/components/ui/atoms'
import { Button } from '@/components/ui/molecules'
import { Colors, Space } from '@/constants'
import { Ionicons } from '@expo/vector-icons'
import { useSignUp } from '@/hooks/auth/useSignUp'
import Wrapper from '@/components/ui/molecules/Wrapper'
import CustomActivityIndicator from '@/components/ui/organisms/ActivityIndicator'

const Signup = () => {
  const colorScheme = useColorScheme()
  const { form, formErrors, loading, error, handleChange, handleSubmit } =
    useSignUp()
  const [buttonScale] = useState(new Animated.Value(1))

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
          color={Colors[colorScheme ?? 'light'].icon}
        />
      </Button>

      <ThemedText type='title' style={[styles.title]}>
        Create Account
      </ThemedText>
      <ThemedText type='default' style={[styles.subtitle]}>
        Create account using your email and password
      </ThemedText>

      <ThemedInput
        placeholder='Full Name'
        value={form.name}
        onChangeText={handleChange('name')}
      />

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

      <ThemedInput
        placeholder='Confirm Password'
        value={form.confirmPassword}
        onChangeText={handleChange('confirmPassword')}
        secureTextEntry
        error={formErrors.confirmPassword ?? undefined}
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

      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <Button
          variant='primary'
          style={styles.button}
          onPress={handleSubmit}
          disabled={
            loading || Object.values(formErrors).some(error => error !== null)
          }
        >
          {loading ? <CustomActivityIndicator size='small' /> : 'Sign Up'}
        </Button>
      </Animated.View>

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
          Already have an account?
        </ThemedText>
        <Button
          onPress={() => router.push('/(auth)/screens/Login')}
          variant='tertiary'
          style={styles.link}
        >
          Login here
        </Button>
      </ThemedView>
    </Wrapper>
  )
}

export default Signup

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 40,
    zIndex: 1,
    padding: 8
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
    marginTop: Space.$6
  },
  link: {
    paddingVertical: 0,
    paddingHorizontal: 0
  },
  error: {
    marginBottom: Space.$4,
    textAlign: 'center'
  },
  wrapper: {
    paddingHorizontal: Space.$4
  }
})
