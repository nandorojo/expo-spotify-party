import * as React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { AuthStack } from './auth-stack'
import Party from '../../views/Party'
import Onboarding from '../../views/Create-User'
import { NavigationRoutes } from '../routes'
import AuthenticateSpotify from '../../views/Authenticate-Spotify'
import { ThemeUi } from '../../theme'
import Dashboard from '../../views/Dashboard'
import MaybeAccount from '../../views/Maybe-Account'

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
  account: undefined
}

// const create = Platform.select({
//   web: createStackNavigator,
//   default: createNativeStackNavigator,
// })

const Stack = createNativeStackNavigator<BaseStackParams>()

type Props = {
  initialRouteName?: keyof BaseStackParams
}

export function BaseStack({ initialRouteName }: Props) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerTintColor: ThemeUi.colors.text,
        headerStyle: { backgroundColor: ThemeUi.colors.background },
        contentStyle: {
          backgroundColor: ThemeUi.colors.background,
          // flex: 1,
        },
        // headerTranslucent: true,
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
        component={Dashboard}
        options={() => ({ title: 'Spotify Party' })}
      />
      <Stack.Screen
        name={NavigationRoutes.account}
        component={MaybeAccount}
        options={() => ({ title: 'Account' })}
      />
    </Stack.Navigator>
  )
}
