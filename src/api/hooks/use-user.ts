import { useDocument, Document } from '@nandorojo/swr-firestore'
import { User } from '../user'
import { UserSchema } from '../../schema/user-schema'
import { useFuego } from '@nandorojo/fuego'

export const useUser = (
  id: string,
  info: Parameters<typeof useDocument>['1']
) => {
  // return useDocument<Document<UserSchema>>(new User({ id }).path, info)
  const { data, ...response } = useFuego<Document<UserSchema>>({
    path: new User({ id }).path,
    listen: info?.listen,
  })

  return { ...response, data: data as UserSchema | null }
}
