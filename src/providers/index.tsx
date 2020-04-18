import React, { ReactNode } from 'react'
import Doorman from './Doorman'
import FuegoProvider from './fuego'

type Props = {
  children: ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <FuegoProvider>
      <Doorman>{children}</Doorman>
    </FuegoProvider>
  )
}

export default Providers
