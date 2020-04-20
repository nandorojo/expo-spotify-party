import * as React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import EmojiLoader from '../components/Emoji-Loader'
import useTimeout from 'use-timeout'

type Props = {
  text?: string
  delay?: number
}

const LoadingScreen = ({ text, delay = 100 }: Props) => {
  const [visible, setVisible] = React.useState(!delay)
  useTimeout(() => setVisible(true), delay)
  if (!visible) return null

  return (
    <View style={styles.container}>
      <EmojiLoader />
      {!!text && <Text style={styles.text}>{text}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: {
    textAlign: 'center',
    marginTop: 20,
  },
})

export default React.memo(LoadingScreen)
