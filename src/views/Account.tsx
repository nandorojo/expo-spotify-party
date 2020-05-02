import React, { useCallback, useEffect } from 'react'
import ColorCard from '../components/Color-Card'
import { useMe } from '../api/hooks/use-me'
import { Text, ScrollView } from 'react-native'
import LoadingScreen from './Loading-Screen'
import { User } from '../api/user'
// @ts-ignore
import Entypo from '@expo/vector-icons/Entypo'
import { ThemeUi, ThemeProps } from '../theme'
import { Container } from '../components/Container'
import styled from 'styled-components/native'
import { NavigationRoutes } from '../navigation/routes'
import { useRouting } from 'expo-next-react-navigation'
import { Avatar } from 'react-native-elements'
import { Party } from '../api/party'
import { APP_VERSION } from '../../app-version'

const Card = styled.View`
  margin-bottom: ${({ theme }: ThemeProps) => theme.spacing[2]}px;
`

const Account = () => {
  const { data, error } = useMe({
    listen: true,
  })
  const { navigate } = useRouting()

  const hasSpotify = User.hasSpotifyAccountLinked(data)
  const partySubscribedToId = data?.subscribed_to?.handle
  const isInAParty = !!partySubscribedToId
  const isDJ = data?.is_dj
  const handle = data?.handle
  const songName = data?.player?.name

  const renderSections = useCallback(() => {
    if (hasSpotify) {
      if (isInAParty) {
        return (
          <>
            <ColorCard
              text={songName ?? "You're in a party!"}
              description={
                songName
                  ? "You're in a party. Open it to see who's listening."
                  : 'Open it to see who else is listening.'
              }
              marginBottom={2}
              icon={() => (
                <Text style={{ fontSize: ThemeUi.fontSizes[2] }}>🎧</Text>
              )}
              onPress={() =>
                navigate({
                  routeName: NavigationRoutes.party,
                  params: { id: partySubscribedToId },
                })
              }
            />
            <ColorCard
              icon="ios-add-circle"
              text="New Party"
              color="secondary"
              description="Become the DJ of a virtual Spotify party. Invite friends to listen to your songs in real-time."
              marginBottom={2}
              onPress={async () => {
                const { success, handle } = await Party.create()
                if (success) {
                  navigate({
                    routeName: NavigationRoutes.party,
                    params: { id: handle },
                  })
                }
              }}
            />
          </>
        )
      }
      if (isDJ) {
        return (
          <>
            <ColorCard
              text={songName ?? "You're the DJ!"}
              description="Open your party to invite friends and see who is listening."
              marginBottom={2}
              icon={() => <Text style={{ fontSize: 30 }}>🎧</Text>}
              onPress={() => {
                if (!handle) {
                  return alert(
                    'You need to set a username before you can start a party.'
                  )
                }
                navigate({
                  routeName: NavigationRoutes.party,
                  params: { id: handle },
                })
              }}
            />

            <ColorCard
              color="secondary"
              icon="ios-musical-note"
              text="Join Party"
              description="If your friend already started a party, you can listen to their songs in real-time."
              marginBottom={2}
              onPress={() =>
                navigate({
                  routeName: NavigationRoutes.party,
                })
              }
            />
          </>
        )
      }
      return (
        <>
          <ColorCard
            icon="ios-add-circle"
            text="New Party"
            description="Become the DJ of a virtual Spotify party. Invite friends to listen to your songs in real-time."
            marginBottom={2}
            onPress={async () => {
              const { success, handle } = await Party.create()
              if (success) {
                navigate({
                  routeName: NavigationRoutes.party,
                  params: { id: handle },
                })
              }
            }}
          />

          <ColorCard
            color="secondary"
            icon="ios-musical-note"
            text="Join Party"
            description="If your friend already started a party, you can listen to their songs in real-time."
            marginBottom={2}
            onPress={() =>
              navigate({
                routeName: NavigationRoutes.party,
              })
            }
          />
        </>
      )
    }
    return null
  }, [
    handle,
    hasSpotify,
    isDJ,
    isInAParty,
    navigate,
    partySubscribedToId,
    songName,
  ])

  if (error) return <Text style={{ padding: 50 }}>Error 🚨</Text>
  if (!data) return <LoadingScreen />

  const profilePictureUrl = data.images?.[0].url
  return (
    <ScrollView>
      <Container>
        <Card>
          <ColorCard
            color="muted"
            text={data.handle}
            description={APP_VERSION}
            descriptionLocation="under text"
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
        {renderSections()}
        <Card>
          <ColorCard
            color={hasSpotify ? 'muted' : 'alert'}
            text={data.display_name ?? 'Spotify'}
            // type="outlined"
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
                      color={ThemeUi.colors.text}
                      size={size}
                    />
                  )
                : 'ios-alert'
            }
            description={
              hasSpotify
                ? 'Spotify successfully connected.'
                : 'Your Spotify account is not integrated. Click here to add it.'
            }
          />
        </Card>
      </Container>
    </ScrollView>
  )
}

export default React.memo(Account)
