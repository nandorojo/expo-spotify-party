import React, { useRef } from 'react'
import {
  NavigationContainer,
  useLinking,
  NavigationContainerRef,
  InitialState,
} from '@react-navigation/native'
import MainTabs from './tabs/main-tabs'
import { Linking } from 'expo'
import LoadingScreen from '../views/Loading-Screen'
import { NavigationRoutes } from './routes'
import * as NavigationService from './navigation-service'

// const useDeepLinking = () => {
//   const ref = useRef<NavigationContainerRef>(null)

//   const { getInitialState } = useLinking(ref, {
//     prefixes: [Linking.makeUrl('/')],
//     config: {
//       [NavigationRoutes.account]: {
//         path: NavigationRoutes.account,
//         initialRouteName: NavigationRoutes.account,
//         screens: {
//           [NavigationRoutes.party]: 'party/:id',
//         },
//       },
//     },
//   })

//   const [isReady, setIsReady] = React.useState(false)
//   const [initialState, setInitialState] = React.useState<
//     InitialState | undefined
//   >()

//   React.useEffect(() => {
//     Promise.race([
//       getInitialState(),
//       new Promise(resolve =>
//         // Timeout in 150ms if `getInitialState` doesn't resolve
//         // Workaround for https://github.com/facebook/react-native/issues/25675
//         setTimeout(() => resolve(undefined), 150)
//       ),
//     ])
//       .catch(e => {
//         console.error(e)
//       })
//       // @ts-ignore
//       .then((state?: InitialState) => {
//         if (state !== undefined) {
//           setInitialState(state)
//         }

//         setIsReady(true)
//       })
//   }, [getInitialState])

//   return {
//     isReady,
//     initialState,
//     ref,
//   }
// }

export default function Navigator() {
  // const { ref, isReady, initialState } = useDeepLinking()
  // if (!isReady) return <LoadingScreen delay={0} />

  return (
    <NavigationContainer
      // initialState={initialState}
      ref={NavigationService.navigationRef}
    >
      <MainTabs />
    </NavigationContainer>
  )
}
