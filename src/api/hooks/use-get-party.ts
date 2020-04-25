import { Document, useCollection } from '@nandorojo/swr-firestore'
import { User } from '../user'
import { UserSchema } from '../../schema/user-schema'
import { useFuego } from '@nandorojo/fuego'
import { useMemo } from 'react'

export const useGetParty = (
  handle: string,
  options?: Parameters<typeof useCollection>['2']
) => {
  // const response = useDocument<Document<UserSchema>>(
  //   new User({ id }).path,
  //   options
  // )
  // const { data, ...response } = useCollection<Document<UserSchema>>(
  //   User.collection,
  //   {
  //     where: ['handle', '==', handle],
  //   },
  //   options
  // )
  // console.log('[use-get-party]', { handle })
  const { data, ...response } = useFuego<Document<UserSchema>>(
    useMemo(
      () => ({
        path: User.collection,
        where: ['handle', '==', handle],
        listen: true,
      }),
      [handle]
    )
  )
  return { ...response, data: (data as Document<UserSchema>[])?.[0] ?? null }
  // return { ...response, data: data?.[0] ?? null }
}
