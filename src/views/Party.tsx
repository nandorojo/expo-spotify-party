import React, { useCallback } from 'react'
import { useDoormanUser } from 'react-native-doorman'
import { FlatList, StyleSheet } from 'react-native'
import { useGetParty } from '../api/hooks/use-get-party'
import { usePartySubscribers } from '../api/hooks/use-party-members'
import { UserSchema } from '../schema/user-schema'
import { empty } from '../helpers/empty'
import { ButtonGroup, Avatar } from 'react-native-elements'
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

type Props = {
  id: string
  iAmSubscribed: boolean
  iAmDj: boolean
}

const Empty = styled.Text`
  font-size: ${({ theme }: ThemeProps) => theme.fontSizes[2]}px;
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

const Column = styled(Col)`
  &: first-of-type;
`

const Party = ({ id, iAmDj, iAmSubscribed }: Props) => {
  const { data: dj, error } = useGetParty(id, {
    refreshInterval: 3000,
  })
  const djLoading = !dj && !error

  const {
    data: subscribers,
    loading: subscribersLoading,
  } = usePartySubscribers({ uid: id })
  const { navigate } = useRouting()

  const { uid } = useDoormanUser()

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
          <Col style={{ marginRight: ThemeUi.spacing[1] / 2 }}>
            <Btn color="secondary" variant="small" title="Share Party" />
          </Col>
          <Col style={{ marginLeft: ThemeUi.spacing[1] / 2 }}>
            <Btn
              color="muted"
              variant="small"
              title={iAmDj ? 'End Party' : 'Leave'}
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
          </Col>
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
    renderDJImage,
    subscribersLength,
  ])

  if (error) {
    return (
      <Wrapper>
        <ColorCard
          color="alert"
          text="Oops"
          description={
            error?.message ??
            "Something wen't wrong, but we're not sure what yet. 😬 Can you try refreshing?"
          }
          icon="md-alert"
        />
      </Wrapper>
    )
  }

  const partyDefinitelyDoesNotExist = !djLoading && !dj?.is_dj

  if (partyDefinitelyDoesNotExist) {
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
              navigate({
                routeName: NavigationRoutes.party,
              })
            }}
          />
        </ColorCard>
      </Wrapper>
    )
  }

  return (
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
        // contentContainerStyle={styles.list}
      />
    </Wrapper>
  )
}

const keyExtractor = (item: { id: string }) => item.id

export default React.memo(Party)
