import { useCallback, useState } from 'react'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'
import { Platform } from 'react-native'
import { Spotify } from '../spotify'
// import { Spotify } from '../Spotify'

if (Platform.OS === 'web') {
  // @ts-ignore
  WebBrowser.maybeCompleteAuthSession()
}

export const useSpotifyAuth = () => {
  const [status, setStatus] = useState<
    'loading' | 'none' | 'success' | 'error'
  >('none')
  const authenticate = useCallback(async () => {
    try {
      setStatus('loading')
      console.log`will try here`
      const redirectUrl = AuthSession.getRedirectUrl()
      console.log({ redirectUrl })
      const result = await AuthSession.startAsync({
        authUrl: `${Spotify.authEndpoint}?redirect_uri=${encodeURIComponent(
          redirectUrl
        )}`,
      })
      setStatus('success')
      console.log({ result })
      // @ts-ignore
      return result
      // return result?.params?.code
    } catch (err) {
      setStatus('error')
      console.error(err)
      return { success: false }
    }
  }, [])
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
