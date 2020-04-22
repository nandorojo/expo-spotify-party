import * as React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { AuthStack } from './auth-stack'
import Party from '../../views/Party'
import Onboarding from '../../views/Create-User'
import { NavigationRoutes } from '../routes'
import AuthenticateSpotify from '../../views/Authenticate-Spotify'
import Home from '../../../pages'
import { Text, Platform } from 'react-native'
import { ThemeUi } from '../../theme'
import { createStackNavigator } from '@react-navigation/stack'

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

const create = Platform.select({
  web: createStackNavigator,
  default: createNativeStackNavigator,
})

const Stack = create<BaseStackParams>()

type Props = {
  initialRouteName?: keyof BaseStackParams
}

export function BaseStack({ initialRouteName }: Props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerTintColor: 'white',
        headerStyle: { backgroundColor: ThemeUi.colors.primary },
        headerRight: () => <Text style={{ color: 'white' }}>Hi</Text>,
      }}
      initialRouteName={initialRouteName}
    >
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
      <Stack.Screen
        name={NavigationRoutes.dashboard}
        component={Home}
        options={() => ({ title: 'Spotify Party' })}
      />
    </Stack.Navigator>
  )
}
