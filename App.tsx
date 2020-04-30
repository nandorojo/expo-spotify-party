import * as React from 'react'

import { enableScreens } from 'react-native-screens'
import Providers from './src/providers'
import Navigator from './src/navigation'
import '@expo/match-media'
import { Platform } from 'react-native'
import AppleMusic from './src/views/Apple-Music'

enableScreens()

export default function App() {
  return (
    <Providers>
      {Platform.OS === 'web' ? <AppleMusic /> : <Navigator />}
    </Providers>
  )
}
