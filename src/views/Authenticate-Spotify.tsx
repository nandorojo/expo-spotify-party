import React from 'react'
import { View, Button, Text } from 'react-native'
import { useSpotifyAuth } from '../api/hooks/use-spotify-auth'
import { useRouting } from 'expo-next-react-navigation'
import { NavigationRoutes } from '../navigation/routes'
import { useGetSpotifyAuthUrl } from '../api/hooks/use-get-spotify-auth-url'
import { fuego } from '../api/fuego'

type Props = {
  onAuthenticationComplete?: () => void
}

const AuthenticateSpotify = () => {
  console.log('here')
  const { result, loading } = useGetSpotifyAuthUrl()
  const { authenticate, status } = useSpotifyAuth({ authUrl: result?.url })
  // return null
  // const { getParam, navigate } = useRouting()
  // const redirectPartyId = getParam<string>('redirectPartyId')
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title={result?.url ? 'Authenticate Spotify' : 'Loading...'}
        disabled={loading}
        onPress={async () => {
          if (!result?.url) return fuego.auth().signOut()
          const r = await authenticate()
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
    </View>
  )
}

export default AuthenticateSpotify
