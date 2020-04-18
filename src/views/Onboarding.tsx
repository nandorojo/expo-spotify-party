import React from 'react'
import { useCreateUser } from '../api/hooks/use-create-user'
import styled from 'styled-components/native'
import { User } from '../api/user'
import { useRouting } from 'expo-next-react-navigation'
import { NavigationRoutes } from '../navigation/routes'

type Props = {}

const Container = styled.View`
  flex: 1;
  justify-content: 'center';
  align-items: 'center';
`
const Input = styled.TextInput`
  padding: 20px;
  border-width: 1px;
`
const Btn = styled.Button`
  margin-top: 20px;
`
const Text = styled.Text``

const Onboarding = () => {
  const { getParam, navigate } = useRouting()
  const redirect = getParam<{ routeName: string }>('redirect')
  const { handle, setHandle, create, status } = useCreateUser({
    onSuccess: async () => {
      if ((await User.get()).has_auth) {
        navigate(redirect)
      } else {
        navigate({
          routeName: NavigationRoutes.spotifyAuth,
          params: {
            redirect,
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
      />
      <Text>{status}</Text>
      <Btn title="Create User" onPress={create} />
    </Container>
  )
}

export default Onboarding
