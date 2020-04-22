import React, { ReactNode } from 'react'
import { FuegoProvider as Provider } from '@nandorojo/fuego'
import { FuegoProvider as FP } from '@nandorojo/swr-firestore'
// const Provider = dynamic(() => import('@nandorojo/fuego'), {ssr: false})

import 'firebase/auth'
import 'firebase/firestore'
import { fuego } from '../api/fuego'

type Props = {
  children: ReactNode
}

const FuegoProvider = ({ children }: Props) => {
  return (
    <Provider fuego={fuego}>
      <FP fuego={fuego}>{children}</FP>
    </Provider>
  )
}

export default FuegoProvider
