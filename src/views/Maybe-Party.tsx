import React, { useEffect } from 'react'
import { useRouting } from 'expo-next-react-navigation'
import { useAuthGate } from 'react-native-doorman'

import { useGetParty } from '../api/hooks/use-get-party'
import LoadingScreen from './Loading-Screen'

// import JoinParty from './Join-Party'

import dynamic from 'next/dynamic'
const JoinParty = dynamic(() => import('./Join-Party'), {
  loading: () => <LoadingScreen />,
  ssr: false,
})

import Party from './Party'
import { useMe } from '../api/hooks/use-me'
import { User } from '../api/user'
import { useDocument, Document } from '@nandorojo/swr-firestore'
import { UserSchema } from '../schema/user-schema'
import PartySplash from './Party-Splash'

const MaybeParty = () => {
  const { getParam } = useRouting()
  const id = getParam<string>('id')
  // const id = '123'

  const { user: authUser, loading: authLoading } = useAuthGate()
  // const { data: me, loading: meLoading } = useMe({ listen: true })
  // const { data: me, error } = useDocument<Document<UserSchema>>(User.me.path, {
  //   refreshInterval: 2000,
  // })
  const { data: me, error } = useMe({
    listen: true,
    // re
  })
  const meLoading = !me && !error

  const iAmSubscribed = me?.subscribed_to?.uid === id
  const iAmDj = id === authUser?.uid
  const hasSpotify = !!(me && User.hasSpotifyAccountLinked(me))

  if (authLoading) return <LoadingScreen />

  if (!id) return <JoinParty />

  if (!authUser || (!iAmDj && !iAmSubscribed)) {
    return <PartySplash hasSpotify={hasSpotify} id={id} />
  }

  return <Party id={id} iAmSubscribed={iAmSubscribed} iAmDj={iAmDj} />
}

export default MaybeParty
