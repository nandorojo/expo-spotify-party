import * as React from 'react'

import { enableScreens } from 'react-native-screens'
import Providers from './src/providers'
import Navigator from './src/navigation'
import '@expo/match-media'

enableScreens()

export default function App() {
  return (
    <Providers>
      <Navigator />
    </Providers>
  )
}
