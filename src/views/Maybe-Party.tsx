import React, { useEffect } from 'react'
import { useRouting } from 'expo-next-react-navigation'
import { useAuthGate } from 'react-native-doorman'

import { useGetParty } from '../api/hooks/use-get-party'
import LoadingScreen from './Loading-Screen'

import JoinParty from './Join-Party'

import Party from './Party'
import { useMe } from '../api/hooks/use-me'
import { User } from '../api/user'
import { useDocument, Document } from '@nandorojo/swr-firestore'
import { UserSchema } from '../schema/user-schema'

const MaybeParty = () => {
  const { getParam } = useRouting()
  const id = getParam<string>('id')
  // const id = '123'

  const { user: authUser, loading: authLoading } = useAuthGate()
  // const { data: me, loading: meLoading } = useMe({ listen: true })
  const { data: me } = useDocument<Document<UserSchema>>(User.me.path, {
    refreshInterval: 2000,
  })

  const iAmSubscribed = me?.subscribed_to?.uid === id
  const iAmDj = id === authUser?.uid
  const hasSpotify = !!(me && User.hasSpotifyAccountLinked(me))

  useEffect(() => {
    console.log({ me })
  }, [me])

  if (authLoading) return <LoadingScreen />

  if (!id) throw new Error('missing party id')

  if (!authUser || !me || (!iAmDj && !iAmSubscribed)) {
    return <JoinParty hasSpotify={hasSpotify} id={id} />
  }

  return <Party id={id} iAmSubscribed={iAmSubscribed} iAmDj={iAmDj} {...me} />
}

export default MaybeParty
