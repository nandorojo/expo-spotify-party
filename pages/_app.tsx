import React from 'react'
import { AppProps } from 'next/app'
import Providers from '../src/providers'
import styled from 'styled-components/native'
import { ThemeProps } from '../src/theme'
import Header from '../src/components/Header.web'
// @ts-ignore
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment'

// fix the setImmediate usage from react-native-reanimated
import 'setimmediate'

// fix SSR "location is not defined error"
if (canUseDOM) {
  if (location.protocol !== 'https:' && __DEV__) {
    console.warn(
      'WebBrowser.. Try cancelling this session and running yarn https.'
    )
  } else {
    const WebBrowser = require('expo-web-browser')
    WebBrowser.maybeCompleteAuthSession()
  }
}

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
