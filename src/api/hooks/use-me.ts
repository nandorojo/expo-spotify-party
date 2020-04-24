import { useUser } from './use-user'
import { useMaybeDoormanUser } from 'react-native-doorman'

export const useMe = (info?: Parameters<typeof useUser>['1']) => {
  const [user] = useMaybeDoormanUser()
  return useUser(user?.uid ?? null, info)
}
