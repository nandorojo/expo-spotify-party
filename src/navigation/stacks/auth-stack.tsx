import * as React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import PhoneScreen from '../../views/Phone-Screen'
import ConfirmPhone from '../../views/Confirm-Phone'
import { NavigationRoutes } from '../routes'
import AuthenticateSpotify from '../../views/Authenticate-Spotify'
import Onboarding from '../../views/Onboarding'

type AuthStackParams = {
  confirmPhone?: {
    redirectPartyId?: string
  }
  auth?: {
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

const Stack = createNativeStackNavigator<AuthStackParams>()

export function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={({ route }) => ({
          title: route.params?.title ?? 'Sign In 🎧',
        })}
        name={NavigationRoutes.auth}
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
      />
      <Stack.Screen name={NavigationRoutes.onboarding} component={Onboarding} />
    </Stack.Navigator>
  )
}
