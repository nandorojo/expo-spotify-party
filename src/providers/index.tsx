import React, { ReactNode } from 'react'
import dynamic from 'next/dynamic'
const Doorman = dynamic(() => import('./Doorman'), { ssr: false })
import FuegoProvider from './fuego'

type Props = {
  children: ReactNode
}

// @ts-ignore
global.setImmediate = setTimeout

const Providers = ({ children }: Props) => {
  return (
    <FuegoProvider>
      <Doorman>{children}</Doorman>
    </FuegoProvider>
  )
}

export default Providers
