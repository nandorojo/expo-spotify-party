import { useFuego } from '@nandorojo/fuego'
import { UserSchema } from '../../schema/user-schema'
import { Document } from '@nandorojo/swr-firestore'
import { User } from '../user'
import { useMemo } from 'react'

type Props = {
  /**
   * The uid of the DJ, also the ID of the party.
   */
  uid: string
}

export const usePartySubscribers = ({ uid }: Props) => {
  const { data, ...response } = useFuego<Document<UserSchema>>(
    useMemo(
      () => ({
        path: User.collection,
        where: ['subscribed_to.uid', '==', uid],
        listen: true,
      }),
      [uid]
    )
  )

  return { data: data as (UserSchema & { id: string })[] | null, ...response }
}
