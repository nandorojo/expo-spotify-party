import { useState, useCallback, useRef } from 'react'
import { User } from '../user'

export const useCreateUser = ({
  onSuccess,
}: { onSuccess?: () => void } = {}) => {
  const [handle, setHandle] = useState('')
  const [status, setStatus] = useState<
    'none' | 'loading' | 'error' | 'success'
  >()
  const callback = useRef(onSuccess)

  const create = useCallback(async () => {
    try {
      setStatus('loading')

      const { success } = await User.create({ handle })

      if (success) {
        setStatus('success')
        callback.current?.()
      } else setStatus('error')
    } catch (e) {
      console.error(`useCreateUser.create ${e}`)
      setStatus('error')
    }
  }, [handle])

  return {
    handle,
    setHandle,
    create,
    status,
  }
}
