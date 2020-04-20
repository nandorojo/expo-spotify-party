import React, { useCallback, useEffect } from 'react'
import { useRouting } from 'expo-next-react-navigation'
import dynamic from 'next/dynamic'
import LoadingScreen from './Loading-Screen'

const PhoneScreen = dynamic(() => import('../components/Phone-Screen'), {
  // ssr: false,
  loading: () => <LoadingScreen />,
})
// import { AuthFlow } from 'react-native-doorman'
// const { PhoneScreen } = AuthFlow
import { User } from '../api/user'
import { NavigationRoutes } from '../navigation/routes'
import { useAuthStateChanged } from '../hooks/useAuthStateChanged'
import { useAuthGate } from 'react-native-doorman'

// type Props<T extends { routeName: string }> = {
//   redirect?: T
// }

function Auth<T extends { routeName: string }>() {
  const { getParam, prefetch } = useRouting()
  const redirectPartyId = getParam<T>('redirectPartyId')
  // const authType = getParam<'sign in' | 'sign up' | undefined>('authType')
  const { navigate } = useRouting()
  const { user, loading } = useAuthGate()
  useEffect(() => {
    console.log('prefetching confirm screen')
    prefetch(NavigationRoutes.confirmPhone)
  }, [prefetch])
  useAuthStateChanged(async user => {
    if (!user) return console.log('no user here...')
    const me = await User.get()
    console.log({ me })
    if (me.has_auth) {
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
    } else if (me.handle) {
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
  const onSmsSuccessfullySent = useCallback(() => {
    navigate({
      routeName: NavigationRoutes.confirmPhone,
      params: redirectPartyId
        ? {
            redirectPartyId,
          }
        : undefined,
    })
  }, [navigate, redirectPartyId])
  if (user || loading) return <LoadingScreen delay={0} />

  return (
    <PhoneScreen
      backgroundColor="#1DB954"
      {...{
        title: `Sign in to continue`,
        message: `We'll text you a code to confirm it's you.`,
        disclaimer: `We'll never spam you. Reply "Chill" to stop texts.`,
        buttonText: redirectPartyId ? 'Join Party 🎸' : undefined,
      }}
      onSmsSuccessfullySent={onSmsSuccessfullySent}
    />
  )
}

export default Auth
