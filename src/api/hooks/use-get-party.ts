import { useUser } from './use-user'
import { useDocument, Document } from '@nandorojo/swr-firestore'
import { User } from '../user'
import { UserSchema } from '../../schema/user-schema'

export const useGetParty = (
  id: string,
  options?: Parameters<typeof useDocument>['1']
) => {
  // return useUser(id)
  return useDocument<Document<UserSchema>>(new User({ id }).path, options)
}
