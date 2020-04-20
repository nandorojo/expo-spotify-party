import * as React from 'react'
import AuthenticateSpotify from './src/views/Authenticate-Spotify'
import FuegoProvider from './src/providers/fuego'
import Doorman from './src/providers/Doorman'
import { AuthGate, AuthFlow } from 'react-native-doorman'

import { enableScreens } from 'react-native-screens'

enableScreens()

export default function App() {
  return (
    <FuegoProvider>
      <Doorman>
        <AuthGate>
          {({ loading, user }) => {
            if (loading) return <></>
            if (!user) return <AuthFlow />
            return <AuthenticateSpotify />
          }}
        </AuthGate>
      </Doorman>
    </FuegoProvider>
  )
}
