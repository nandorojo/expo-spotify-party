import React, { useCallback, useEffect } from 'react'
import { useRouting } from 'expo-next-react-navigation'
import dynamic from 'next/dynamic'
import LoadingScreen from './Loading-Screen'

// const Screen = dynamic(() => import('../components/Phone-Screen'), {
//   // ssr: false,
//   loading: () => <LoadingScreen />,
// })
import { AuthFlow } from 'react-native-doorman'
// const { PhoneScreen } = AuthFlow
import { User } from '../api/user'
import { NavigationRoutes } from '../navigation/routes'
import { useAuthStateChanged } from '../hooks/useAuthStateChanged'
import { useAuthGate } from 'react-native-doorman'
import { Platform, StyleSheet } from 'react-native'

// type Props<T extends { routeName: string }> = {
//   redirect?: T
// }

function PhoneScreen<T extends { routeName: string }>() {
  const { getParam } = useRouting()
  const redirectPartyId = getParam<T>('redirectPartyId')
  // const authType = getParam<'sign in' | 'sign up' | undefined>('authType')
  const { navigate } = useRouting()
  const onSmsSuccessfullySent = useCallback(() => {
    navigate({
      routeName: NavigationRoutes.confirmPhone,
      key: NavigationRoutes.confirmPhone,
      params: redirectPartyId
        ? {
            redirectPartyId,
          }
        : undefined,
    })
  }, [navigate, redirectPartyId])
  console.log('here on auth!!')

  return (
    <AuthFlow.PhoneScreen
      backgroundColor="#1DB954"
      {...{
        title: `Sign in to continue`,
        message: `We'll text you a code to confirm it's you.`,
        disclaimer: `We'll never spam you. Reply "Chill" to stop texts.`,
        buttonText: redirectPartyId ? 'Join Party 🎸' : undefined,
      }}
      // no header on mobile: let react navigation handle that
      renderHeader={Platform.OS === 'web' ? undefined : null}
      onSmsSuccessfullySent={onSmsSuccessfullySent}
      containerStyle={styles.container}
    />
  )
}

const styles = StyleSheet.create({
  container: Platform.select({
    web: undefined,
    default: { width: '100%' },
  }),
})

export default PhoneScreen
