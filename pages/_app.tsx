import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import Providers from '../src/providers'

export default ({ Component, pageProps }: AppProps) => {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}
