import React, { ComponentPropsWithoutRef, useState } from 'react'
import { Text, StyleSheet } from 'react-native'
import useInterval from '../hooks/use-interval'

const EmojiLoader = (
  props: Omit<ComponentPropsWithoutRef<typeof Text>, 'children' | 'style'> & {
    interval?: number
  }
) => {
  const { interval = 400, ...textProps } = props

  const [count, setCount] = useState(0)
  useInterval(() => {
    setCount(state => state + 1)
  }, interval)

  const emojis = ['🎹', '🎸', '🎧', '🥳']

  const emoji = emojis[count % emojis.length]

  return (
    <Text {...textProps} style={styles.text}>
      {emoji}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
  },
})

export default React.memo(EmojiLoader)
