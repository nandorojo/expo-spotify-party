import { useFuego } from '@nandorojo/fuego'
import { UserSchema } from '../../schema/user-schema'
import { Document, useCollection } from '@nandorojo/swr-firestore'
import { User } from '../user'
import { useMemo } from 'react'

type Props = {
  /**
   * The handle of the DJ, also the ID of the party.
   */
  handle: string
}

export const usePartySubscribers = ({ handle }: Props) => {
  const { data,  ...response } = useFuego<Document<UserSchema>>(
    useMemo(
      () => ({
        path: User.collection,
        where: ['subscribed_to.handle', '==', handle],
        listen: true,
      }),
      [handle]
    )
  )
  // console.log('[use-party-subscribers]', { data })
  // const { data, error, ...response } = useCollection<Document<UserSchema>>(
  //   User.collection,
  //   {
  //     where: ['subscribed_to.handle', '==', handle],
  //   },
  //   {
  //     listen: true,
  //   }
  // )

  // return {
  //   // data: [],
  //   // loading: false,
  //   ...response,
  //   data,
  //   // loading: !data && !error,
  //   loading,
  // }

  return { data: data as (UserSchema & { id: string })[] | null, ...response }
}
