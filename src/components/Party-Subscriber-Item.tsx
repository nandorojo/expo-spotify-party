import * as React from 'react'
import ColorCard from './Color-Card'
import { Avatar } from 'react-native-elements'
import { StyleSheet } from 'react-native'

type ItemProps = {
  handle: string
  displayName: string
  imageUrl: string
  isMe: boolean
}
export const PartySubscriberItem = React.memo((props: ItemProps) => {
  const { handle, imageUrl, displayName } = props
  return (
    <ColorCard
      text={handle}
      description={displayName}
      color="muted"
      icon={() => <Avatar size={50} source={{ uri: imageUrl }} rounded />}
      descriptionLocation="under text"
      textSize={1}
    />
  )
})

const itemStyles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
})
