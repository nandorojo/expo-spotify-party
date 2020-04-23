import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import { Platform } from 'react-native'

import Providers from '../src/providers'
import styled from 'styled-components/native'
import { ThemeProps } from '../src/theme'
import Header from '../src/components/Header.web'

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

// @ts-ignore
global.setImmediate = setTimeout

const Wrapper = styled.View`
  flex: 1;
  background-color: ${({ theme }: ThemeProps) => theme.colors.background};
`

export default ({ Component, pageProps, router }: AppProps) => {
  return (
    <Providers>
      <Header />
      <Wrapper>
        <Component {...pageProps} key={router.route} />
      </Wrapper>
    </Providers>
  )
}
