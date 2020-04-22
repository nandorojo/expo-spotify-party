import React from 'react'
import { useCreateUser } from '../api/hooks/use-create-user'
import styled from 'styled-components/native'
import { User } from '../api/user'
import { useRouting } from 'expo-next-react-navigation'
import { NavigationRoutes } from '../navigation/routes'

type Props = {}

const Container = styled.View`
  flex: 1;
  /* justify-content: center; */
  margin-top: 100px;
  /* align-items: center; */
`
const Input = styled.TextInput`
  padding: 20px;
  margin: 0 20px;
  border-width: 1px;
  color: blue;
`
const Btn = styled.Button`
  margin-top: 20px;
`
const Text = styled.Text``

const Onboarding = () => {
  const { getParam, navigate } = useRouting()
  const redirectPartyId = getParam<string>('redirectPartyId')
  const { handle, setHandle, create, status } = useCreateUser({
    onSuccess: async () => {
      const me = await User.get()
      if (User.hasSpotifyAccountLinked(me)) {
        if (redirectPartyId) {
          navigate({
            routeName: NavigationRoutes.party,
            params: {
              id: redirectPartyId,
            },
          })
        } else {
          navigate({
            routeName: NavigationRoutes.dashboard,
          })
        }
      } else {
        navigate({
          routeName: NavigationRoutes.spotifyAuth,
          key: NavigationRoutes.spotifyAuth,
          params: {
            redirectPartyId,
          },
        })
      }
    },
  })
  return (
    <Container>
      <Input
        value={handle}
        onChangeText={setHandle}
        placeholder="Custom handle"
        onSubmitEditing={create}
        placeholderTextColor="blue"
      />
      <Text>{status}</Text>
      <Btn title="Create User" onPress={create} />
    </Container>
  )
}

export default Onboarding
