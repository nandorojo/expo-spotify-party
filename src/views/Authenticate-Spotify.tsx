import React from 'react'
import { View, Button, Text } from 'react-native'
import { useSpotifyAuth } from '../api/hooks/use-spotify-auth'
import { useRouting } from 'expo-next-react-navigation'
import { NavigationRoutes } from '../navigation/routes'
import { useGetSpotifyAuthUrl } from '../api/hooks/use-get-spotify-auth-url'
import { useMaybeDoormanUser, useAuthGate } from 'react-native-doorman'
import { useAuthStateChanged } from '../hooks/useAuthStateChanged'
import LoadingScreen from './Loading-Screen'

type Props = {
  onAuthenticationComplete?: () => void
}

const AuthenticateSpotify = () => {
  console.log('here')
  const { result, loading } = useGetSpotifyAuthUrl()
  const { loading: authLoading } = useAuthGate()
  const [user, signOut] = useMaybeDoormanUser()
  const { authenticate, status } = useSpotifyAuth({ authUrl: result?.url })
  const { navigate, getParam } = useRouting()
  const redirectPartyId = getParam('redirectPartyId')

  useAuthStateChanged((user, loading) => {
    if (loading) return
    if (!user) {
      navigate({
        routeName: NavigationRoutes.auth,
        params: redirectPartyId
          ? {
              redirectPartyId,
            }
          : undefined,
      })
    } else {
      // navigate()
    }
  })
  if (authLoading || !user || loading)
    return <LoadingScreen text="Loading Spotify..." />
  // return null
  // const { getParam, navigate } = useRouting()
  // const redirectPartyId = getParam<string>('redirectPartyId')
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title={result?.url ? 'Authenticate Spotify' : 'Loading...'}
        disabled={loading}
        onPress={async () => {
          const r = await authenticate()
          if (r?.type === 'success') {
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
          }
          // if (redirectPartyId) {
          //   navigate({
          //     routeName: NavigationRoutes.party,
          //     params: {
          //       id: redirectPartyId,
          //     },
          //   })
          // }
        }}
      />
      <Text>status: {status}</Text>
      <Button title={'Sign Out'} onPress={signOut} />
    </View>
  )
}

export default AuthenticateSpotify
