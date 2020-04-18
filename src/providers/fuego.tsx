import React, { ReactNode } from 'react'
import { FuegoProvider as Provider } from '@nandorojo/fuego'
import dynamic from 'next/dynamic'
// const Provider = dynamic(() => import('@nandorojo/fuego'), {ssr: false})

import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { fuego } from '../api/fuego'

type Props = {
  children: ReactNode
}

const FuegoProvider = ({ children }: Props) => {
  return <Provider fuego={fuego}>{children}</Provider>
}

export default FuegoProvider
