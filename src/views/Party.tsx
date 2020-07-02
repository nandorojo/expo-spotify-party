import React, { useCallback, useEffect } from 'react'
import { useDoormanUser } from 'react-native-doorman'
import { FlatList, Clipboard, Share, Platform } from 'react-native'
import { useGetParty } from '../api/hooks/use-get-party'
import { usePartySubscribers } from '../api/hooks/use-party-members'
import { UserSchema } from '../schema/user-schema'
import { empty } from '../helpers/empty'
import { Avatar } from 'react-native-elements'
import ColorCard from '../components/Color-Card'
import { Container } from '../components/Container'
import styled from 'styled-components/native'
import { ThemeProps, ThemeUi } from '../theme'
import { Document } from '@nandorojo/swr-firestore'
import LoadingScreen from './Loading-Screen'
import Btn from '../components/Button'
import { useRouting } from 'expo-next-react-navigation'
import { NavigationRoutes } from '../navigation/routes'
import { PartySubscriberItem } from '../components/Party-Subscriber-Item'
import { Row, Col } from '@nandorojo/bootstrap'
import { Party as PartyClass } from '../api/party'
import { useActionSheet } from '@expo/react-native-action-sheet'
import { fuego } from '../api/fuego'
import Sheet from './Sheet'

type Props = {
  id: string
  iAmSubscribed: boolean
  iAmDj: boolean
}

const Empty = styled.Text`
  color: ${({ theme }: ThemeProps) => theme.colors.text};
  font-size: ${({ theme }: ThemeProps) => theme.fontSizes[2]}px;
  margin: ${({ theme }: ThemeProps) => theme.spacing[6]}px 0;
`

const Wrapper = styled(Container)`
  flex: 1;
`

const Button = styled(Btn)`
  margin-top: ${({ theme }: ThemeProps) => theme.spacing[2]}px;
`

const StyledRow = styled(Row)`
  margin-bottom: ${({ theme }: ThemeProps) => theme.spacing[2]}px;
`

const ListTitle = styled.Text`
  font-size: ${({ theme }: ThemeProps) => theme.fontSizes[4]}px;
  color: ${({ theme }: ThemeProps) => theme.colors.text};
  font-weight: ${({ theme }: ThemeProps) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }: ThemeProps) => theme.spacing[2]}px;
`

const ListFooter = styled.View`
  margin: ${({ theme }: ThemeProps) => theme.spacing[2]}px 0;
`

const Party = ({ id, iAmDj, iAmSubscribed }: Props) => {
  console.log('[Party]', { id })

  const { data: dj, error } = useGetParty(id, {
    listen: true,
  })
  const {
    data: subscribers,
    loading: subscribersLoading,
  } = usePartySubscribers({ handle: id })
  const djLoading = !dj && !error

  const { navigate, replace } = useRouting()

  const { uid } = useDoormanUser()
  const { showActionSheetWithOptions } = useActionSheet()

  const renderItem = useCallback(
    ({ item }: { item: Document<UserSchema> }) => {
      return (
        <PartySubscriberItem
          handle={item.handle ?? ''}
          displayName={item.display_name ?? ''}
          imageUrl={item.images?.[0].url ?? ''}
          isMe={item.id === uid}
        />
      )
    },
    [uid]
  )

  const djImage = dj?.images?.[0].url
  const djDisplayName = dj?.display_name
  const djHandle = dj?.handle
  const renderDJImage = useCallback(
    () => <Avatar size={75} source={{ uri: djImage }} rounded />,
    [djImage]
  )

  const subscribersLength = subscribers?.length ?? 0

  const ListHeaderComponent = useCallback(() => {
    if (!djDisplayName && !djHandle && !renderDJImage) return null

    const actions = () => {
      return (
        <StyledRow>
          <Col>
            <Btn
              color="secondary"
              variant="small"
              title="Share Party"
              onPress={() => {
                const options = Platform.select({
                  web: ['Copy URL', 'Cancel'],
                  default: ['Copy URL', 'Share via...', 'Cancel'],
                })
                // const destructiveButtonIndex = 0;
                const cancelButtonIndex = Platform.select({
                  web: 1,
                  default: 2,
                })
                showActionSheetWithOptions(
                  {
                    options,
                    cancelButtonIndex,
                  },
                  (index: number) => {
                    const url = PartyClass.shareUrl({ id })
                    if (index === 0) Clipboard.setString(url)
                    else if (index === 1 && Platform.OS !== 'web')
                      Share.share(
                        {
                          url,
                          title: 'Join my Spotify Party!',
                          message:
                            'Hey open this so we can listen to music together remotely',
                        },
                        {
                          dialogTitle: 'Invite friends to join your party!',
                          tintColor: ThemeUi.colors.primary,
                          // subject: "We can listen to music in sync with each other."
                        }
                      )
                  }
                )
              }}
            />
          </Col>
          {!iAmDj && (
            <Col style={{ marginLeft: ThemeUi.spacing[1] }}>
              <Btn
                color="primary"
                variant="small"
                title={'Sync Music'}
                onPress={async () => {
                  if (djHandle) {
                    alert(
                      'Make sure your Spotify app is already playing music, then press Sync.'
                    )
                    new PartyClass({ handle: djHandle }).subscribe()
                  }
                }}
              />
            </Col>
          )}
        </StyledRow>
      )
    }

    const ListHeader = () => {
      if (!subscribersLength) return null

      return <ListTitle>Listeners</ListTitle>
    }

    return (
      <>
        <ColorCard
          text={djHandle}
          description={djDisplayName}
          icon={djImage ? renderDJImage : undefined}
          marginBottom={2}
          color="muted"
          descriptionLocation="under text"
          right={() => (
            <Avatar
              title="DJ"
              rounded
              overlayContainerStyle={{
                backgroundColor: ThemeUi.colors.primary,
              }}
              titleStyle={{ color: ThemeUi.colors.text }}
            />
          )}
        />
        {actions()}
        {ListHeader()}
      </>
    )
  }, [
    djDisplayName,
    djHandle,
    djImage,
    iAmDj,
    id,
    renderDJImage,
    showActionSheetWithOptions,
    subscribersLength,
  ])

  const ListFooterComponent = useCallback(() => {
    if (djLoading || subscribersLoading) return null

    return (
      <ListFooter>
        <Btn
          color="muted"
          variant="small"
          title={iAmDj ? 'End Party' : 'Leave Party'}
          onPress={async () => {
            if (iAmDj) {
              const { success } = await PartyClass.end()
              console.log('[party-ended]: ', { success })
              navigate({
                routeName: NavigationRoutes.account,
              })
            } else {
              await PartyClass.unsubscribe()
              navigate({
                routeName: NavigationRoutes.account,
              })
            }
          }}
        />
      </ListFooter>
    )
  }, [djLoading, iAmDj, navigate, subscribersLoading])

  if (error) {
    return (
      <Wrapper>
        <ColorCard
          color="alert"
          text="Oops"
          description={
            // @ts-ignore
            error?.message ??
            "Something went wrong, but we're not sure what yet. 😬 Can you try refreshing?"
          }
          icon="md-alert"
        />
      </Wrapper>
    )
  }

  const partyDefinitelyDoesNotExist = !djLoading && !dj?.is_dj

  if (partyDefinitelyDoesNotExist) {
    console.log('[Party][definitelyDoesNotExist]', { dj })
    return (
      <Wrapper>
        <ColorCard
          text="🤷‍♂️ No party found"
          color="muted"
          description={`This party either doesn't exist or has been ended. 
        
Think that's a mistake? Try searching for the party again.`}
        >
          <Button
            title="Search Again"
            onPress={() => {
              replace({
                routeName: NavigationRoutes.party,
              })
            }}
          />
        </ColorCard>
      </Wrapper>
    )
  }

  return (
    <>
      <Wrapper>
        <FlatList
          data={subscribers ?? empty.array}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListHeaderComponent={ListHeaderComponent}
          ListEmptyComponent={
            subscribersLoading ? (
              <LoadingScreen />
            ) : (
              <Empty>No one is listening yet...</Empty>
            )
          }
          ListFooterComponent={ListFooterComponent}
          contentContainerStyle={{ flex: 1 }}
          style={{ flex: 1 }}
        />
      </Wrapper>
      {!!dj?.player && !!dj.player.album_images?.[0].url && (
        <Sheet
          title={dj.player.name}
          artist={dj.player.artist}
          artworkUrl={dj.player.album_images[0].url}
          duration_ms={dj.player.duration_ms}
          progress_ms={dj.player.progress_ms}
          track_uri={dj.player.track_uri}
          device_name={dj.device?.name}
        />
      )}
    </>
  )
}

// const HeaderRight = () => {
//   const { getParam, navigate } = useRouting()
//   const iAmDj = getParam<boolean | undefined>('iAmDj')

//   const onPress = async () => {
//     if (iAmDj) {
//       const { success } = await PartyClass.end()
//       console.log('[party-ended]: ', { success })
//       navigate({
//         routeName: NavigationRoutes.account,
//       })
//     } else {
//       await PartyClass.unsubscribe()
//       navigate({
//         routeName: NavigationRoutes.account,
//       })
//     }
//   }
// }

// Party.HeaderRight = HeaderRight

const keyExtractor = (item: { id: string }) => item.id

export default React.memo(Party)
