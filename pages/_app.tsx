import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import Providers from '../src/providers'
// @ts-ignore
import { PageTransition } from 'next-page-transitions'
import { Platform } from 'react-native'

if (Platform.OS === 'web' && process.browser) {
  if (location.protocol !== 'https:' && process.env.NODE_ENV !== 'production') {
    console.warn(
      'This app requires HTTPS. Try cancelling this session and running yarn https.'
    )
  } else {
    const WebBrowser = require('expo-web-browser')
    WebBrowser.maybeCompleteAuthSession()
  }
}

export default ({ Component, pageProps, router }: AppProps) => {
  return (
    <Providers>
        <Component {...pageProps} key={router.route} />
    </Providers>
  )
}
