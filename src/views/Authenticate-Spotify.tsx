import React from 'react'
import { View, Button, Text } from 'react-native'
import { useSpotifyAuth } from '../api/hooks/use-spotify-auth'
import { useRouting } from 'expo-next-react-navigation'

type Props = {
  onAuthenticationComplete: () => void
}

const AuthenticateSpotify = (props: Props) => {
  const { onAuthenticationComplete } = props
  const { authenticate, status } = useSpotifyAuth()
  const { getParam, navigate } = useRouting()
  const redirect = getParam<{ routeName: string }>('redirect')
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Authenticate Spotify"
        onPress={async () => {
          const {} = await authenticate()
          if (redirect) {
            navigate(redirect)
          }
        }}
      />
      <Text>{status}</Text>
    </View>
  )
}

export default AuthenticateSpotify
