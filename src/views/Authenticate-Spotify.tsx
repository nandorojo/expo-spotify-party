import React from 'react'
import { View, Text, Platform } from 'react-native'
import { useSpotifyAuth } from '../api/hooks/use-spotify-auth'
import { useRouting } from 'expo-next-react-navigation'
import { NavigationRoutes } from '../navigation/routes'
import { useGetSpotifyAuthUrl } from '../api/hooks/use-get-spotify-auth-url'
import { useMaybeDoormanUser, useAuthGate } from 'react-native-doorman'
import LoadingScreen from './Loading-Screen'
import { User } from '../api/user'
import { useNavigation } from '@react-navigation/native'
import styled from 'styled-components/native'
import { ThemeProps, ThemeUi } from '../theme'
import { Button } from 'react-native-elements'
import { Container } from '../components/Container'
// @ts-ignore
import Entypo from '@expo/vector-icons/Entypo'
import ColorCard from '../components/Color-Card'

type Props = {
  onAuthenticationComplete?: () => void
}

const Background = styled.ScrollView`
  background-color: ${(props: ThemeProps) => props.theme.colors.background};
`

const AuthenticateSpotify = () => {
  console.log('here')
  const { result, loading } = useGetSpotifyAuthUrl()
  const { loading: authLoading } = useAuthGate()
  const [user] = useMaybeDoormanUser()
  const { authenticate } = useSpotifyAuth({ authUrl: result?.url })
  const { navigate, getParam } = useRouting()
  const redirectPartyId = getParam('redirectPartyId')

  // useAuthStateChanged((user, loading) => {
  //   if (loading) return
  //   if (!user) {
  //     navigate({
  //       routeName: NavigationRoutes.phoneScreen,
  //       params: redirectPartyId
  //         ? {
  //             redirectPartyId,
  //           }
  //         : undefined,
  //     })
  //   } else {
  //     // navigate()
  //   }
  // })
  if (authLoading || !user || loading)
    return <LoadingScreen text="Loading Spotify..." />
  // return null
  // const { getParam, navigate } = useRouting()
  // const redirectPartyId = getParam<string>('redirectPartyId')
  return (
    <Background>
      <Container>
        <ColorCard
          text="Sign in to Spotify"
          color="muted"
          description="Click the button below to start listening to Spotify with your friends."
        />
        <Button
          title={result?.url ? 'Connect Spotify' : 'Loading...'}
          buttonStyle={buttonStyle({ theme: ThemeUi })}
          titleStyle={titleStyle({ theme: ThemeUi })}
          loading={loading}
          disabled={loading}
          icon={
            <Entypo
              style={{ marginRight: ThemeUi.spacing[1] }}
              name="spotify"
              size={30}
              color={ThemeUi.colors.text}
            />
          }
          onPress={async () => {
            const r = await authenticate()
            if (r?.type === 'success') {
              User.me.mutate({
                has_auth: true,
              })
              if (redirectPartyId) {
                navigate({
                  routeName: NavigationRoutes.party,
                  params: {
                    id: redirectPartyId,
                  },
                })
              } else {
                if (Platform.OS === 'web') {
                  navigate({ routeName: NavigationRoutes.dashboard })
                } else {
                  // pop()
                  navigate({ routeName: NavigationRoutes.account })
                }
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
      </Container>
    </Background>
  )
}
const buttonStyle = ({ theme }: ThemeProps) => ({
  backgroundColor: theme.colors.primary,
  paddingVertical: theme.spacing[2],
  borderRadius: theme.radii[4],
  marginTop: theme.spacing[2],
})
const titleStyle = ({ theme }: ThemeProps) => ({
  fontWeight: theme.fontWeights.semibold,
})

export default AuthenticateSpotify
