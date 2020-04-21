import * as React from 'react'
import AuthenticateSpotify from './src/views/Authenticate-Spotify'
import { AuthGate, AuthFlow } from 'react-native-doorman'

import { enableScreens } from 'react-native-screens'
import Providers from './src/providers'
import Navigator from './src/navigation'

enableScreens()

export default function App() {
  return (
    <Providers>
      <Navigator />
    </Providers>
  )
}
