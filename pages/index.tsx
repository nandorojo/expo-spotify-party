// @generated: @expo/next-adapter@2.0.31
import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { useMaybeDoormanUser, useAuthGate } from 'react-native-doorman'
import { useRouting } from 'expo-next-react-navigation'
import { NavigationRoutes } from '../src/navigation/routes'
import MaybeAccount from '../src/views/Maybe-Account'
import LoadingScreen from '../src/views/Loading-Screen'
import { ThemeUi } from '../src/theme'
// import * as WebBrowser from 'expo-web-browser'

export default function Home() {
  const { user, loading } = useAuthGate()
  console.log({ user })
  const { navigate } = useRouting()
  if (loading) return <LoadingScreen />
  if (user) return <MaybeAccount />

  return (
    <View style={styles.container}>
      <Text
        style={styles.text}
        // onPress={
        //   user ? signOut : () => navigate({ routeName: NavigationRoutes.auth })
        // }
      >
        Welcome to Spotify Party 👋 This is a landing page...
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: ThemeUi.colors.text,
  },
})
