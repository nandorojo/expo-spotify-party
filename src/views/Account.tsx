import React from 'react'
import ColorCard from '../components/Color-Card'
import { useMe } from '../api/hooks/use-me'
import { Text, ScrollView } from 'react-native'
import LoadingScreen from './Loading-Screen'
import { User } from '../api/user'
import Entypo from '@expo/vector-icons/Entypo'
import { ThemeUi, ThemeProps } from '../theme'
import { useTheme } from 'styled-components'
import { Container } from '../components/Container'
import styled from 'styled-components/native'
import { Spotify } from '../api/spotify'
import { NavigationRoutes } from '../navigation/routes'
import { useRouting } from 'expo-next-react-navigation'
import { Avatar } from 'react-native-elements'

const Card = styled.View`
  margin-bottom: ${({ theme }: ThemeProps) => theme.spacing[2]}px;
`

const Account = () => {
  // @ts-ignore
  const theme: typeof ThemeUi = useTheme()
  const { data, error } = useMe({
    listen: true,
  })
  const { navigate } = useRouting()

  if (error) return <Text style={{ padding: 50 }}>Error 🚨</Text>
  if (!data) return <LoadingScreen text="🏄🏾‍♂️" />

  const hasSpotify = User.hasSpotifyAccountLinked(data)

  console.log('account screen', { hasSpotify })

  const profilePictureUrl = data.images?.[0].url

  return (
    <ScrollView>
      <Container>
        <Card>
          <ColorCard
            color="muted"
            text={data.handle}
            icon={
              profilePictureUrl
                ? () => (
                    <Avatar
                      rounded
                      source={{ uri: profilePictureUrl }}
                      size={75}
                    />
                  )
                : 'ios-person'
            }
          />
        </Card>
        <Card>
          <ColorCard
            color={hasSpotify ? 'primary' : 'alert'}
            text={data.display_name ?? 'Spotify'}
            type="outlined"
            onPress={
              !hasSpotify
                ? () => {
                    navigate({
                      routeName: NavigationRoutes.spotifyAuth,
                      key: NavigationRoutes.spotifyAuth,
                    })
                  }
                : undefined
            }
            icon={
              hasSpotify
                ? ({ size }) => (
                    <Entypo
                      name="spotify"
                      color={theme.colors.text}
                      size={size}
                    />
                  )
                : 'ios-alert'
            }
            description={
              hasSpotify
                ? 'Your Spotify has successfully connected.'
                : 'Your Spotify account is not integrated. Click here to add it.'
            }
          />
        </Card>
      </Container>
    </ScrollView>
  )
}

export default Account
