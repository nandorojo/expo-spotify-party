import { useState, useCallback } from 'react'
import { Party } from '../party'

export const useSubscribeToParty = () => {
  const [status, setStatus] = useState<
    'none' | 'loading' | 'error' | 'success'
  >('none')

  const subscribe = useCallback(async (handle: string) => {
    try {
      setStatus('loading')
      const { success, message, uid } = await new Party({ handle }).subscribe()
      if (!success) throw new Error(message)
      setStatus('success')
      return { uid, handle }
    } catch (e) {
      console.error('useSubscribeToParty error ', e.message)
      setStatus('error')
    }
  }, [])

  return {
    subscribe,
    loading: status === 'loading',
  }
}
