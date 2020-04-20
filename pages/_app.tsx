import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import Providers from '../src/providers'
// @ts-ignore
import { PageTransition } from 'next-page-transitions'
import { Platform } from 'react-native'

if (Platform.OS === 'web' && process.browser) {
  const WebBrowser = require('expo-web-browser')
  WebBrowser.maybeCompleteAuthSession()
}

export default ({ Component, pageProps, router }: AppProps) => {
  return (
    <Providers>
      <PageTransition timeout={300} classNames="page-transition">
        <Component {...pageProps} key={router.route} />
      </PageTransition>
      <style jsx global>{`
        .page-transition-enter {
          opacity: 0;
        }
        .page-transition-enter-active {
          opacity: 1;
          transition: opacity 300ms;
        }
        .page-transition-exit {
          opacity: 1;
        }
        .page-transition-exit-active {
          opacity: 0;
          transition: opacity 300ms;
        }
        /* REACT NATIVE WEB RESET */
        [class^='page-transition'] {
          width: 100%;
          /* To smooth any scrolling behavior */
          -webkit-overflow-scrolling: touch;
          margin: 0px;
          padding: 0px;
          /* Allows content to fill the viewport and go beyond the bottom */
          min-height: 100%;

          flex-shrink: 0;
          flex-basis: auto;
          flex-direction: column;
          flex-grow: 1;
          display: flex;
          flex: 1;
        }
      `}</style>
    </Providers>
  )
}
