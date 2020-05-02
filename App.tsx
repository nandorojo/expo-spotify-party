import * as React from 'react'

import { enableScreens } from 'react-native-screens'
import Providers from './src/providers'
import Navigator from './src/navigation'
import { withOta } from './src/hoc/with-ota'

import '@expo/match-media'

enableScreens()

function App() {
  return (
    <Providers>
      <Navigator />
    </Providers>
  )
}

export default withOta(App)
