import { useEffect, useRef } from 'react'
import * as firebase from 'firebase/app'
import { useAuthGate } from 'react-native-doorman'

/**
 *
 * Hook that runs a callback function whenever the auth state changes.
 *
 * Simply wraps Doorman's `useAuthGate`.
 */
export const useAuthStateChanged = (
  c: (user: firebase.User | null, loading: boolean) => void
) => {
  const callback = useRef(c)
  useEffect(() => {
    callback.current = c
  })
  const { user, loading } = useAuthGate()
  useEffect(() => {
    // firebase.auth().onIdTokenChanged(callback.current)
    callback.current(user, loading)
  }, [user, loading])
}
