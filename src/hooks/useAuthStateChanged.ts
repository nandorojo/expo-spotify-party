import { useEffect, useRef } from 'react'
import * as firebase from 'firebase/app'
import { useAuthGate } from 'react-native-doorman'

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
