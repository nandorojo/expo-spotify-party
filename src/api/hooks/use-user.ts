import { useDocument, Document } from '@nandorojo/swr-firestore'
import { User } from '../user'
import { UserSchema } from '../../schema/user-schema'

export const useUser = (
  id: string | null,
  info?: Parameters<typeof useDocument>['1']
) => {
  return useDocument<Document<UserSchema>>(id && new User({ id }).path, info)
}
