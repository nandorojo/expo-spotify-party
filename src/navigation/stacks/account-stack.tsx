import * as React from 'react'
import { createNativeStackNavigator } from 'react-native-screens/native-stack'
import { Platform } from 'react-native'
import { AuthStack } from './auth-stack'
import { NavigationRoutes } from '../routes'
import { ThemeUi } from '../../theme'
import MaybeAccount from '../../views/Maybe-Account'
import { useAuthGate } from 'react-native-doorman'
import SpotifyAuthStack from './spotify-auth-stack'
import SignOutMobileOnly from '../../components/Sign-Out'
import MaybeParty from '../../views/Maybe-Party'
import AppleMusic from '../../views/Apple-Music'
import Sheet from '../../views/Sheet'

type AccountStackParams = {
  dashboard: undefined
  account: undefined
  'Apple Music': undefined
  Sheet: undefined
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
  party: {
    id: string
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
        headerTintColor: ThemeUi.colors.text,
        headerStyle: { backgroundColor: ThemeUi.colors.background },
        ...Platform.select({
          default: {
            contentStyle: {
              backgroundColor: ThemeUi.colors.background,
            },
          },
          web: {
            cardStyle: {
              backgroundColor: ThemeUi.colors.background,
            },
          },
        }),
        // headerTranslucent: true,
      }}
      initialRouteName={initialRouteName}
      // mode="modal"
    >
      <Stack.Screen
        name={NavigationRoutes.account}
        component={MaybeAccount}
        options={() => ({
          title: 'Spotify Party',
          headerLargeTitle: true,
          headerRight: () => <SignOutMobileOnly />,
        })}
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
      <Stack.Screen
        options={() => ({
          title: 'Party',
        })}
        name={NavigationRoutes.party}
        component={MaybeParty}
      />
      <Stack.Screen name={'Apple Music'} component={AppleMusic} />
      <Stack.Screen name={'Sheet'} component={Sheet} />
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
