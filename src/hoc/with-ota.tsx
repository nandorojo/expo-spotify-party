import React from 'react'
import { useExpoOta } from '../hooks/use-expo-ota'
import LoadingScreen from '../views/Loading-Screen'

export function withOta<P = {}>(Component: React.ComponentType<P>) {
  return function WithOta(props: P) {
    const { updating } = useExpoOta()
    if (updating) return <LoadingScreen text="App is updating, just a sec..." />

    return <Component {...props} />
  }
}
