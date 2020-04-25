import React, { useCallback } from 'react'
import { useRouting } from 'expo-next-react-navigation'

import { AuthFlow } from 'react-native-doorman'
import { NavigationRoutes } from '../navigation/routes'
import { StyleSheet } from 'react-native'

function PhoneScreen<T extends { routeName: string }>() {
  const { getParam } = useRouting()
  const redirectPartyId = getParam<T>('redirectPartyId')
  const { navigate } = useRouting()
  const onSmsSuccessfullySent = useCallback(() => {
    console.log('text sent, will navigate')
    navigate({
      routeName: NavigationRoutes.confirmPhone,
      // key: NavigationRoutes.confirmPhone,
      params: redirectPartyId
        ? {
            redirectPartyId,
          }
        : undefined,
    })
  }, [navigate, redirectPartyId])

  return (
    <AuthFlow.PhoneScreen
      backgroundColor="#1DB954"
      {...{
        title: `Sign in to continue`,
        message: `We'll text you a code to confirm it's you.`,
        disclaimer: `We'll never spam you. Reply "Chill" to stop texts.`,
        buttonText: redirectPartyId ? 'Join Party 🎸' : undefined,
      }}
      onSmsSuccessfullySent={onSmsSuccessfullySent}
      containerStyle={styles.container}
      renderHeader={null}
    />
  )
}

const styles = StyleSheet.create({
  container: { width: '100%' },
})

export default PhoneScreen
