import React, { useCallback } from 'react'
import { useMaybeDoormanUser } from 'react-native-doorman'
// @ts-ignore
import Ionicons from '@expo/vector-icons/Ionicons'
import styled from 'styled-components/native'
import { ThemeProps, ThemeUi } from '../theme'
import { Alert } from 'react-native'

const Icon = styled(Ionicons)`
  padding: ${({ theme }: ThemeProps) => theme.spacing[1]}px 0;
`

const SignOutMobileOnly = () => {
  const [user, signOut] = useMaybeDoormanUser()
  const onPress = useCallback(() => {
    Alert.alert('Want to sign out?', undefined, [
      {
        style: 'destructive',
        text: 'Sign Out',
        onPress: signOut,
      },
      {
        text: 'Go Back',
        style: 'cancel',
      },
    ])
  }, [signOut])
  if (!user) return null
  return (
    <Icon
      color={ThemeUi.colors.text}
      name="ios-settings"
      onPress={onPress}
      size={30}
    />
  )
}

export default SignOutMobileOnly
