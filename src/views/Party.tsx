import React, { useCallback } from 'react'
import { useDoormanUser } from 'react-native-doorman'
import { FlatList, StyleSheet } from 'react-native'
import { useGetParty } from '../api/hooks/use-get-party'
import { usePartySubscribers } from '../api/hooks/use-party-members'
import { UserSchema } from '../schema/user-schema'
import { empty } from '../helpers/empty'
import { ListItem, Avatar } from 'react-native-elements'
import ColorCard from '../components/Color-Card'
import { Container } from '../components/Container'
import styled from 'styled-components/native'
import { ThemeProps } from '../theme'

type Props = {
  id: string
  iAmSubscribed: boolean
  iAmDj: boolean
} & UserSchema

const Empty = styled.Text`
  font-size: ${({ theme }: ThemeProps) => theme.fontSizes[2]}px;
`

const Wrapper = styled(Container)`
  flex: 1;
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

  console.log('party details', { dj, subscribers, iAmDj, iAmSubscribed })

  const { uid } = useDoormanUser()

  const renderItem = useCallback(({ item }: { item: UserSchema }) => {
    return (
      <Item
        handle={item.handle ?? ''}
        displayName={item.display_name ?? ''}
        imageUrl={item.images?.[0].url ?? ''}
      />
    )
  }, [])

  const djImage = dj?.images?.[0].url
  const djDisplayName = dj?.display_name
  const djHandle = dj?.handle

  const renderDj = useCallback(() => {
    console.log('renderDJ', { dj })
    if (!dj) return null
    return (
      <ColorCard
        text={djHandle}
        description={djDisplayName}
        icon={() =>
          !!djImage && <Avatar size={75} source={{ uri: djImage }} rounded />
        }
        marginBottom={2}
        descriptionLocation="under text"
      />
    )
  }, [dj, djDisplayName, djHandle, djImage])

  return (
    <Wrapper>
      <FlatList
        data={subscribers ?? empty.array}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={renderDj}
        ListEmptyComponent={
          subscribersLoading ? (
            undefined
          ) : (
            <Empty>No one is listening yet...</Empty>
          )
        }
        // contentContainerStyle={styles.list}
      />
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
})

type ItemProps = {
  handle: string
  displayName: string
  imageUrl: string
}
const Item = React.memo((props: ItemProps) => {
  const { handle, imageUrl, displayName } = props
  return (
    <ListItem
      title={handle}
      subtitle={displayName}
      leftAvatar={{ source: { uri: imageUrl }, rounded: true, size: 50 }}
    />
  )
})

const keyExtractor = (item: { id: string }) => item.id

export default React.memo(Party)
