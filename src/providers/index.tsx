import React, { ReactNode } from 'react'
import dynamic from 'next/dynamic'
const Doorman = dynamic(() => import('./Doorman'), { ssr: false })
import FuegoProvider from './fuego'
import { ThemeProvider } from 'styled-components/native'
import { ThemeUi } from '../theme'

type Props = {
  children: ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <FuegoProvider>
      <Doorman>
        <ThemeProvider theme={ThemeUi}>{children}</ThemeProvider>
      </Doorman>
    </FuegoProvider>
  )
}

export default Providers
