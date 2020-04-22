import { useUser } from './use-user'
import { useDoormanUser } from 'react-native-doorman'

export const useMe = (info?: Parameters<typeof useUser>['1']) => {
  const { uid } = useDoormanUser()
  console.log('useMe', { uid })
  return useUser(uid, info)
}
