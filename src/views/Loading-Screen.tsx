import * as React from 'react'
import { View, StyleSheet, Text, Platform } from 'react-native'
import EmojiLoader from '../components/Emoji-Loader'
import useTimeout from 'use-timeout'
import { ThemeUi } from '../theme'

type Props = {
  text?: string
  delay?: number
}

const LoadingScreen = ({
  text,
  delay = Platform.OS === 'web' ? 100 : 200,
}: Props) => {
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ThemeUi.colors.background,
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
  },
})

export default React.memo(LoadingScreen)
