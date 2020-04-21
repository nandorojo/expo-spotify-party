import * as React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { AuthStack } from './auth-stack'
import Party from '../../views/Party'
import Onboarding from '../../views/Onboarding'
import { NavigationRoutes } from '../routes'
import AuthenticateSpotify from '../../views/Authenticate-Spotify'

type BaseStackParams = {
  party: {
    id: string
  }
  onboarding: {
    redirectPartyId?: string
  }
  auth: {
    redirectPartyId?: string
  }
  spotifyAuth: {
    redirectPartyId?: string
  }
  dashboard: undefined
}

const Stack = createNativeStackNavigator<BaseStackParams>()

type Props = {
  initialRouteName?: keyof BaseStackParams
}

export function BaseStack({ initialRouteName }: Props) {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        options={() => ({
          title: 'Party',
        })}
        name={NavigationRoutes.party}
        component={Party}
      />
      <Stack.Screen name={NavigationRoutes.onboarding} component={Onboarding} />
      <Stack.Screen
        name={NavigationRoutes.auth}
        component={AuthStack}
        options={{ stackPresentation: 'modal' }}
      />
      <Stack.Screen
        name={NavigationRoutes.spotifyAuth}
        component={AuthenticateSpotify}
      />
    </Stack.Navigator>
  )
}
