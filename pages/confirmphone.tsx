import React, { useEffect } from 'react'
import { AuthFlow } from 'react-native-doorman'
import { useRouting } from 'expo-next-react-navigation'
import { NavigationRoutes } from '../src/navigation/routes'
import { useAuthStateChanged } from '../src/hooks/useAuthStateChanged'
import { User } from '../src/api/user'
import { Platform } from 'react-native'
import ConfirmScreen from '../src/views/Confirm-Phone'

export default function ConfirmPhone() {
  const { getParam, navigate, goBack, prefetch } = useRouting()
  const redirectPartyId = getParam<string | undefined>('redirectPartyId')
  useEffect(() => {
    if (redirectPartyId) {
      prefetch(`NavigationRoutes.party/${redirectPartyId}`)
    } else {
      prefetch(NavigationRoutes.onboarding)
    }
  }, [prefetch, redirectPartyId])

  useAuthStateChanged(async user => {
    if (user) {
      const me = await User.get()
      if (me.has_auth) {
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
          navigate({
            routeName: NavigationRoutes.dashboard,
          })
        }
      } else if (me.handle) {
        // has handle, but not spotify
        navigate({
          routeName: NavigationRoutes.spotifyAuth,
          params: {
            redirectPartyId,
          },
        })
      } else {
        // has no auth
        navigate({
          routeName: NavigationRoutes.onboarding,
          params: {
            redirectPartyId,
          },
        })
      }
      //   if (partyRedirectId) {
      //     navigate({
      //       routeName: NavigationRoutes.party,
      //       params: {
      //         id: partyRedirectId,
      //       },
      //     })
      //   } else {
      //     navigate({
      //       routeName: NavigationRoutes.dashboard,
      //     })
      //   }
    }
  })
  return <ConfirmScreen />
}
