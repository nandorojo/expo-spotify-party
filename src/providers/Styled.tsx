import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Theme = ({ children }: Props) => {
  return <>{children}</>
}

export default Theme
