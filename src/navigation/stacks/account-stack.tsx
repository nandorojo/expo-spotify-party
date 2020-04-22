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
import Dashboard from '../../views/Dashboard'
import MaybeAccount from '../../views/Maybe-Account'
import { fuego } from '../../api/fuego'
import PhoneScreen from '../../views/Phone-Screen'
import ConfirmPhone from '../../views/Confirm-Phone'
import { useAuthGate } from 'react-native-doorman'
import SpotifyAuthStack from './spotify-auth-stack'
import SignOutMobileOnly from '../../components/Sign-Out'

type AccountStackParams = {
  dashboard: undefined
  account: undefined
  // confirmPhone?: {
  //   redirectPartyId?: string
  // }
  // phoneScreen?: {
  //   title?: string
  //   redirectPartyId?: string
  // }
  spotifyAuth?: {
    redirectPartyId?: string
  }
  // onboarding?: {
  //   redirectPartyId?: string
  // }
  auth?: {
    redirectPartyId?: string
  }
}

// const create = Platform.select({
//   web: createStackNavigator,
//   default: createNativeStackNavigator,
// })

const Stack = createNativeStackNavigator<AccountStackParams>()

type Props = {
  initialRouteName?: keyof AccountStackParams
}

export function AccountStack({ initialRouteName }: Props) {
  const { user, loading } = useAuthGate()

  // only can close the stack if you're signing in
  const authStackGestureEnabled = !user && !loading

  return (
    <Stack.Navigator
      screenOptions={{
        headerLargeTitle: true,
        headerTintColor: ThemeUi.colors.text,
        headerStyle: { backgroundColor: ThemeUi.colors.background },
        headerRight: () => <SignOutMobileOnly />,
        contentStyle: {
          backgroundColor: ThemeUi.colors.background,
          // flex: 1,
        },
        // headerTranslucent: true,
      }}
      initialRouteName={initialRouteName}
      // mode="modal"
    >
      <Stack.Screen
        name={NavigationRoutes.account}
        component={MaybeAccount}
        options={() => ({ title: 'Account' })}
      />
      {/* <Stack.Screen
        name={NavigationRoutes.auth}
        component={AuthStack}
        options={{ stackPresentation: 'modal' }}
     />*/}
      <Stack.Screen
        name={NavigationRoutes.auth}
        component={AuthStack}
        // options={{ stackPresentation: 'modal' }}
        options={{
          stackPresentation: 'modal',
          gestureEnabled: authStackGestureEnabled,
        }}
      />
      <Stack.Screen
        name={NavigationRoutes.spotifyAuth}
        options={{ stackPresentation: 'modal' }}
        component={SpotifyAuthStack}
      />
      {/*
      <Stack.Screen
        options={({ route }) => ({
          title: route.params?.title ?? 'Sign In',
          stackPresentation: 'modal',
        })}
        name={NavigationRoutes.phoneScreen}
        component={PhoneScreen}
      />
      <Stack.Screen
        name={NavigationRoutes.confirmPhone}
        component={ConfirmPhone}
        options={() => ({
          title: 'Confirm 📱',
          stackPresentation: 'modal',
        })}
      />
      <Stack.Screen
        name={NavigationRoutes.onboarding}
        component={Onboarding}
        options={() => ({
          // gestureEnabled: false,
          // headerBackTitleVisible: false,
          stackPresentation: 'modal',
          contentStyle: {
            // backgroundColor: ThemeUi.colors.text,
          },
        })}
      />*/}
    </Stack.Navigator>
  )
}
