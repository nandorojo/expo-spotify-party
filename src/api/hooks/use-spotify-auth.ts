import { useCallback, useState } from 'react'

import { Platform } from 'react-native'
import { Linking } from 'expo'
import * as WebBrowser from 'expo-web-browser'
import * as AuthSession from 'expo-auth-session'
// import WebBrowser from '../../components/Browser'

type Props = {
  authUrl?: string
  alreadyAuthenticated?: boolean
}

export const useSpotifyAuth = ({ authUrl, alreadyAuthenticated }: Props) => {
  const [status, setStatus] = useState<
    'loading' | 'none' | 'success' | 'error'
  >('none')
  // const discovery = AuthSession.useAutoDiscovery(authUrl ?? '')
  // const [result, r, prompt] = AuthSession.useAuthRequest(
  //   {
  //     redirectUri: AuthSession.getRedirectUrl(),
  //     // responseType: {

  //     // },
  //     scopes: [],
  //     clientId: '',
  //   },
  //   {
  //     authorizationEndpoint: authUrl ?? '',
  //     tokenEndpoint: authUrl ?? '',
  //   }
  // )
  const authenticate = useCallback(async () => {
    try {
      setStatus('loading')
      const redirectUrl =
        Platform.OS === 'web' ? AuthSession.getRedirectUrl() : Linking.makeUrl()
      console.log(`will try spotify auth`, {
        authUrl,
        redirectUrl,
      })
      // console.log(
      //   'spotify endpoint',
      //   `${Spotify.authEndpoint}?redirect_uri=${encodeURIComponent(
      //     'http://locahost:3000/party/2'
      //   )}`
      // )
      if (!alreadyAuthenticated && authUrl) {
        // window.open(
        //   url,
        //   'location,status,scrollbars,resizable,width=600, height=600'
        // )
        const authSession = await WebBrowser.openAuthSessionAsync(
          authUrl,
          redirectUrl
        )
        console.log({ returnUrl: AuthSession.getRedirectUrl() })
        // const authSession = await AuthSession.startAsync({
        //   authUrl,
        //   returnUrl:
        //     Platform.OS === 'web' ? AuthSession.getRedirectUrl() : undefined,
        // })
        return authSession
        console.log('autttthhh', { authSession })
        if (authSession.type === 'success') alert('Success!')
        // const authSession = await AuthSession.startAsync({
        //   authUrl: url,
        // })
        // console.log('should start auth session', { auth })
        // await AuthSession.
        // const authSession = await AuthSession.startAsync(
        //   // Spotify.authEndpoint,
        //   {
        //     authUrl,
        //     returnUrl: AuthSession.getRedirectUrl(),
        //   }
        //   // ''
        // )
        // console.log({ authSession })
        // setStatus('success')
      }
      // const redirectUrl = AuthSession.getRedirectUrl()
      // console.log({ redirectUrl })
      // const result = await AuthSession.startAsync({
      //   authUrl: `${Spotify.authEndpoint}?redirect_uri=${encodeURIComponent(
      //     redirectUrl
      //   )}`,
      // })
      // console.log({ result })
      // // @ts-ignore
      // return result
      // return result?.params?.code
    } catch (err) {
      setStatus('error')
      console.error(err)
      // return { success: false }
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
