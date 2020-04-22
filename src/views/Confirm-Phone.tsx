import React from 'react'
import { AuthFlow } from 'react-native-doorman'
import { useRouting } from 'expo-next-react-navigation'
import { NavigationRoutes } from '../navigation/routes'
import { User } from '../api/user'
import { Platform } from 'react-native'
import {
  useNavigation,
  CommonActions,
  StackActions,
} from '@react-navigation/native'

export default function ConfirmPhone() {
  const { getParam, navigate, goBack, popToTop } = useRouting()
  const { dispatch } = useNavigation()
  const redirectPartyId = getParam<string | undefined>('redirectPartyId')
  return (
    <AuthFlow.ConfirmScreen
      // no header on mobile: let react navigation handle that
      renderHeader={Platform.OS === 'web' ? undefined : null}
      backgroundColor="#1DB954"
      onGoBack={goBack}
      inputProps={{ autoFocus: false }}
      onUserSuccessfullySignedIn={async () => {
        console.log('user sign in worked...')
        const me = await User.get()
        console.log({ me })
        if (User.hasSpotifyAccountLinked(me)) {
          // all auth is complete
          if (redirectPartyId) {
            navigate({
              routeName: NavigationRoutes.party,
              params: {
                id: redirectPartyId,
              },
              web: {
                path: `/${NavigationRoutes.party}/${redirectPartyId}`,
              },
            })
          } else {
            console.log('WILLLPOPPP')
            // popToTop()
            if (Platform.OS === 'web') {
              navigate({
                routeName: NavigationRoutes.dashboard,
              })
            } else {
              navigate({ routeName: NavigationRoutes.account })
            }
          }
        } else if (User.hasOnboarded(me)) {
          // has handle, but not spotify
          navigate({
            routeName: NavigationRoutes.spotifyAuth,
            params: {
              redirectPartyId,
            },
          })
        } else {
          // has no auth
          // navigate({
          //   routeName: NavigationRoutes.onboarding,
          //   key: NavigationRoutes.onboarding,
          //   // params: {
          //   //   redirectPartyId,
          //   // },
          // })
          console.log('WILL OPEN ONBOARDING')
          navigate({
            routeName: NavigationRoutes.onboarding,
            key: NavigationRoutes.onboarding,
          })
        }
      }}
    />
  )
}
