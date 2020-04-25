import { useState, useCallback } from 'react'
import { useAuthGate } from 'react-native-doorman'
import { Party } from '../party'

type Props = {
  onJoinedSuccessfully: (info: { id: string }) => void
}

export const useJoinParty = ({ onJoinedSuccessfully }: Props) => {
  const [handle, setHandle] = useState('')
  const [loading, setLoading] = useState(false)

  const { user } = useAuthGate()

  const join = useCallback(async () => {
    if (handle) {
      try {
        setLoading(true)
        const { exists, handle: actualUserHandle } = await new Party({
          handle,
        }).checkIfExists()
        if (exists) {
          if (user) {
            await new Party({ handle: actualUserHandle }).subscribe()
          }
          onJoinedSuccessfully({ id: actualUserHandle })
        } else {
          setLoading(false)
          alert('Looks like that party does not exist.')
        }
      } catch (e) {
        console.error('join party error', { e })
      }
    }
  }, [handle, onJoinedSuccessfully, user])

  return {
    handle,
    setHandle,
    loading,
    join,
  }
}
