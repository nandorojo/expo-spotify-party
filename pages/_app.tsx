import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import Providers from '../src/providers'
// @ts-ignore
import { PageTransition } from 'next-page-transitions'

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
      `}</style>
    </Providers>
  )
}
