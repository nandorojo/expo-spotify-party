import * as React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import AuthenticateSpotify from '../../views/Authenticate-Spotify'
import { NavigationRoutes } from '../routes'
import { ThemeUi } from '../../theme'

const Stack = createNativeStackNavigator()

export default function SpotifyAuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: ThemeUi.colors.background },
        headerStyle: {
          backgroundColor: ThemeUi.colors.primary,
        },
        headerTintColor: ThemeUi.colors.text,
      }}
    >
      <Stack.Screen
        name={NavigationRoutes.spotifyAuth}
        options={() => ({
          title: 'Sign in to Spotify',
        })}
        component={AuthenticateSpotify}
      />
    </Stack.Navigator>
  )
}
