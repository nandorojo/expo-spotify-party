import React, { useEffect } from 'react'
import { useRouting } from 'expo-next-react-navigation'
import dynamic from 'next/dynamic'
import LoadingScreen from '../src/views/Loading-Screen'

const AuthFlow = dynamic(() => import('../src/components/Auth-Flow'), {
  loading: () => <LoadingScreen />,
})
import { User } from '../src/api/user'
import { NavigationRoutes } from '../src/navigation/routes'
import { useAuthStateChanged } from '../src/hooks/use-auth-state-changed'
import { useAuthGate } from 'react-native-doorman'
import { ThemeUi } from '../src/theme'

function Auth<T extends { routeName: string }>() {
  const { getParam, prefetch } = useRouting()
  const redirectPartyId = getParam<T>('redirectPartyId')
  // const authType = getParam<'sign in' | 'sign up' | undefined>('authType')
  const { navigate } = useRouting()
  const { user, loading } = useAuthGate()
  useEffect(() => {
    console.log('prefetching account screen')
    prefetch(`/${NavigationRoutes.account}`)
  }, [prefetch])
  useAuthStateChanged(async user => {
    if (!user) return console.log('no user here...')
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
        })
      } else {
        navigate({ routeName: NavigationRoutes.dashboard })
      }
    } else if (User.hasOnboarded(me)) {
      // has handle, but not spotify
      navigate({
        routeName: NavigationRoutes.spotifyAuth,
        params: redirectPartyId
          ? {
              redirectPartyId,
            }
          : undefined,
      })
    } else {
      // has no auth
      navigate({
        routeName: NavigationRoutes.onboarding,
        params: redirectPartyId
          ? {
              redirectPartyId,
            }
          : undefined,
      })
    }
  })
  if (user || loading) {
    return (
      <LoadingScreen
        delay={0}
        text={user ? 'Get ready to party...' : 'Beep boop.'}
      />
    )
  }

  return (
    <AuthFlow
      phoneScreenProps={{
        message: "We'll text you a code to confirm it's you.",
        disclaimer: `We'll never spam you. Reply "Chill" to stop texts.`,
        buttonText: redirectPartyId ? 'Join Party 🎸' : undefined,
        headerText: 'Get Started',
      }}
      backgroundColor={ThemeUi.colors.primary}
    />
  )
}

export default Auth
