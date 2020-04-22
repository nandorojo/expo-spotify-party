// @generated: @expo/next-adapter@2.0.31
import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
import { useMaybeDoormanUser } from 'react-native-doorman'
import { useRouting } from 'expo-next-react-navigation'
import { NavigationRoutes } from '../src/navigation/routes'
// import * as WebBrowser from 'expo-web-browser'

export default function Home() {
  const [user, signOut] = useMaybeDoormanUser()
  console.log({ user })
  const { navigate } = useRouting()
  return (
    <View style={styles.container}>
      <Text
        style={styles.text}
        onPress={
          user ? signOut : () => navigate({ routeName: NavigationRoutes.auth })
        }
      >
        Welcome to Spotify Party 👋 Click me to sign {!!user ? 'out' : 'in'}.
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
  },
})
