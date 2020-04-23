// export { default } from '../src/views/Loading-Screen'
import React from 'react'
import MaybeAccount from '../src/views/Maybe-Account'
import { NavigationRoutes } from '../src/navigation/routes'
import { useRouting } from 'expo-next-react-navigation'
import { useEffect } from 'react'

export default () => {
  const { prefetch } = useRouting()

  useEffect(() => {
    prefetch(NavigationRoutes.auth)
  }, [prefetch])

  return <MaybeAccount />
}
