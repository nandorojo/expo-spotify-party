// export { default } from '../src/views/Loading-Screen'
import React from 'react'
// import MaybeAccount from '../src/views/Maybe-Account'
import dynamic from 'next/dynamic'
const MaybeAccount = dynamic(() => import('../src/views/Maybe-Account'), {
  loading: () => <LoadingScreen delay={0} />,
  ssr: false,
})
import { NavigationRoutes } from '../src/navigation/routes'
import { useRouting } from 'expo-next-react-navigation'
import { useEffect } from 'react'
import LoadingScreen from '../src/views/Loading-Screen'

export default () => {
  const { prefetch } = useRouting()

  useEffect(() => {
    prefetch(NavigationRoutes.auth)
  }, [prefetch])

  return <MaybeAccount />
}
