import React from 'react'
import { useRouting } from 'expo-next-react-navigation'
import dynamic from 'next/dynamic'
const AuthFlow = dynamic(() => import('../components/Auth'), { ssr: false })
import { User } from '../api/user'
import { NavigationRoutes } from '../navigation/routes'
import { useAuthStateChanged } from '../hooks/useAuthStateChanged'

type Props<T extends { routeName: string }> = {
  redirect?: T
}

function Auth<T extends { routeName: string }>(props: Props<T>) {
  const { getParam } = useRouting()
  const redirectPartyId = getParam<T>('redirectPartyId')
  const authType = getParam<'sign in' | 'sign up' | undefined>('authType')
  const { navigate } = useRouting()
  useAuthStateChanged(async user => {
    if (!user) return
    const me = await User.get()
    if (me.has_auth) {
      // all auth is complete
      navigate({
        routeName: NavigationRoutes.party,
        params: {
          id: redirectPartyId,
        },
      })
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
  })

  return (
    <AuthFlow
      backgroundColor="#1DB954"
      phoneScreenProps={{
        title: `Sign in to continue`,
        message: `We'll text you a code to confirm it's you.`,
        disclaimer: `We'll never spam you. Reply "Chill" to stop texts.`,
        buttonText: 'Join Party 🎸',
      }}
      // onCodeVerified={}
    />
  )
}

export default Auth
