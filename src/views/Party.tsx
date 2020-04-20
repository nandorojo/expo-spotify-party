import React from 'react'
import { useRouting } from 'expo-next-react-navigation'
import { useAuthGate } from 'react-native-doorman'
import { Text, Button } from 'react-native'
import { useGetPartyName } from '../api/hooks/use-get-party-name'
import * as firebase from 'firebase/app'
import { NavigationRoutes } from '../navigation/routes'
// import { fuego } from '../api/fuego'

const Party = () => {
  const { getParam, navigate } = useRouting()
  const id = getParam<string>('id')

  const { user, loading } = useAuthGate()
  const name = useGetPartyName({ id })

  // useEffect(() => {
  //   if (!loading && !user) {
  //     navigate({
  //       routeName: NavigationRoutes.auth,
  //       params: {
  //         redirect: {
  //           routeName: 'party',
  //           params: {
  //             id,
  //           },
  //         },
  //       },
  //     })
  //   }
  // }, [user, loading, navigate, id])

  if (loading) return null

  if (!user)
    return (
      <Button
        title="Sign Up"
        onPress={() =>
          navigate({
            routeName: NavigationRoutes.auth,
            // web: {
            //   as: '/auth',
            // },
            params: {
              redirectPartyId: id,
            },
          })
        }
      />
    )

  //   if (authState && !user) {
  //     return (
  //       <AuthFlow
  //         backgroundColor="#1DB954"
  //         phoneScreenProps={{
  //           title: `Sign in to continue to ${name}`,
  //           message: `We'll text you a code to confirm it's you.`,
  //           disclaimer: `We'll never spam you. Reply "Chill" to stop texts.`,
  //           buttonText: 'Join Party 🎸',
  //         }}
  //       />
  //     )
  //   }

  return (
    <Text onPress={() => firebase.auth().signOut()}>
      {`It's a party!`} {name}
    </Text>
  )
}

export default Party
