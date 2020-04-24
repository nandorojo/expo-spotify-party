import { useCallback, useState } from 'react'

import { Platform } from 'react-native'
import { Linking } from 'expo'
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'

type Props = {
  authUrl?: string
  alreadyAuthenticated?: boolean
}

export const useSpotifyAuth = ({ authUrl, alreadyAuthenticated }: Props) => {
  const [status, setStatus] = useState<
    'loading' | 'none' | 'success' | 'error'
  >('none')
  const authenticate = useCallback(async () => {
    try {
      setStatus('loading')
      const redirectUrl =
        Platform.OS === 'web' ? AuthSession.getRedirectUrl() : Linking.makeUrl()
      console.log(`will try spotify auth`, {
        authUrl,
        redirectUrl,
      })
      if (!alreadyAuthenticated && authUrl) {
        const authSession = await WebBrowser.openAuthSessionAsync(
          authUrl,
          redirectUrl
        )
        console.log({ returnUrl: AuthSession.getRedirectUrl() })
        return authSession
      }
    } catch (err) {
      setStatus('error')
      console.error(err)
    }
  }, [alreadyAuthenticated, authUrl])
  const isLoading = status === 'loading'
  const hasSucceeded = status === 'success'
  const hasErrored = status === 'error'

  return {
    authenticate,
    isLoading,
    hasSucceeded,
    hasErrored,
    status,
  }
}
