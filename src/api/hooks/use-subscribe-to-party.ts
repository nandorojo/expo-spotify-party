import { useState, useCallback } from 'react'
import { Party } from '../party'

export const useSubscribeToParty = ({ id }: { id: string }) => {
  const [status, setStatus] = useState<
    'none' | 'loading' | 'error' | 'success'
  >('none')

  const subscribe = useCallback(async () => {
    try {
      setStatus('loading')
      await new Party({ id }).subscribe()
      setStatus('success')
    } catch (e) {
      setStatus('error')
    }
  }, [id])

  return {
    subscribe,
    loading: status === 'loading',
  }
}
