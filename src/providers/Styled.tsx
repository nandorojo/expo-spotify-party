import React, { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components/native'

type Props = {
  children: ReactNode
}

const FuegoProvider = ({ children }: Props) => {
  return <ThemeProvider>{children}</ThemeProvider>
}

export default FuegoProvider
