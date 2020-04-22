import * as React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { createStackNavigator } from '@react-navigation/stack'

import PhoneScreen from '../../views/Phone-Screen'
import ConfirmPhone from '../../views/Confirm-Phone'
import { NavigationRoutes } from '../routes'
import AuthenticateSpotify from '../../views/Authenticate-Spotify'
import Onboarding from '../../views/Create-User'
import { ThemeUi } from '../../theme'
import { Platform } from 'react-native'

type AuthStackParams = {
  confirmPhone?: {
    redirectPartyId?: string
  }
  phoneScreen?: {
    title?: string
    redirectPartyId?: string
  }
  spotifyAuth?: {
    redirectPartyId?: string
  }
  onboarding?: {
    redirectPartyId?: string
  }
}

const create = Platform.select({
  web: createStackNavigator,
  default: createNativeStackNavigator,
})

const Stack = create<AuthStackParams>()

export function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ route }) => ({
          title: route.params?.title ?? 'Sign In',
        })}
        name={NavigationRoutes.phoneScreen}
        component={PhoneScreen}
      />
      <Stack.Screen
        name={NavigationRoutes.confirmPhone}
        component={ConfirmPhone}
        options={() => ({
          title: 'Almost there 🎹',
        })}
      />
      <Stack.Screen
        name={NavigationRoutes.spotifyAuth}
        component={AuthenticateSpotify}
        options={() => ({
          gestureEnabled: false,
          headerBackTitleVisible: false,
        })}
      />
      <Stack.Screen
        name={NavigationRoutes.onboarding}
        component={Onboarding}
        options={() => ({
          gestureEnabled: false,
          headerBackTitleVisible: false,
          contentStyle: {
            backgroundColor: ThemeUi.colors.text,
          },
        })}
      />
    </Stack.Navigator>
  )
}
