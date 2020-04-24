import { useDoormanUser } from 'react-native-doorman'
import { useFuego } from '@nandorojo/fuego'

export const useGetHasSpotify = () => {
  const { uid } = useDoormanUser()
  const { data, loading } = useFuego({ path: `users/${uid}` })
  // const { data } = useDocument<Documemt>

  return { data, loading }
}
