// @generated: @expo/next-adapter@2.0.31
import React from 'react'
import { StyleSheet, Text, View, Platform } from 'react-native'
// import * as WebBrowser from 'expo-web-browser'

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Expo + Next.js 👋</Text>
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
