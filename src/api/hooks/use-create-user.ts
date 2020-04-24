import { useState, useCallback } from 'react'
import { User } from '../user'

export const useCreateUser = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const [handle, setHandle] = useState('')
  const [status, setStatus] = useState<
    'none' | 'loading' | 'error' | 'success'
  >()

  const create = useCallback(async () => {
    try {
      setStatus('loading')

      const { success } = await User.create({ handle })

      if (success) {
        setStatus('success')
        onSuccess?.()
      } else setStatus('error')
    } catch (e) {
      console.error(`useCreateUser.create ${e}`)
      setStatus('error')
    }
  }, [handle, onSuccess])

  return {
    handle,
    setHandle,
    create,
    status,
    isLoading: status === 'loading',
    hasErrored: status === 'error',
    ready: !!handle,
  }
}
