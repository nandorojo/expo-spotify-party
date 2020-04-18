import React, { ReactNode } from 'react'
import { DoormanProvider } from 'react-native-doorman'

type Props = {
  children: ReactNode
}

const Doorman = ({ children }: Props) => {
  return (
    <DoormanProvider publicProjectId="AtYrAEiQZDGxTUA4CfHh">
      {children}
    </DoormanProvider>
  )
}

export default Doorman
