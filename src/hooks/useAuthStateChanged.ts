import { useEffect, useRef } from 'react'
import * as firebase from 'firebase/app'

export const useAuthStateChanged = (
  c: (user: firebase.User | null) => void
) => {
  const callback = useRef(c)
  useEffect(() => {
    firebase.auth().onIdTokenChanged(callback.current)
  }, [])
}
