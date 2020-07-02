import React from 'react'
import { useRouting } from 'expo-next-react-navigation'
import { useAuthGate } from 'react-native-doorman'

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
import PartySplash from './Party-Splash'

const MaybeParty = () => {
  const { getParam } = useRouting()
  const id = getParam<string>('id')

  const { user: authUser, loading: authLoading } = useAuthGate()

  const { data: me, error } = useMe({
    listen: true,
  })
  const meLoading = !me && !error

  const iAmSubscribed = me?.subscribed_to?.handle === id
  // const iAmDj = id === authUser?.uid
  const iAmDj = me?.handle === id
  const hasSpotify = !!(me && User.hasSpotifyAccountLinked(me))

  if (authLoading || meLoading) return <LoadingScreen />

  if (!id) return <JoinParty />

  if (!authUser || (!iAmDj && !iAmSubscribed)) {
    return <PartySplash hasSpotify={hasSpotify} id={id} />
  }

  return <Party id={id} iAmSubscribed={iAmSubscribed} iAmDj={iAmDj} />
}

export default MaybeParty
