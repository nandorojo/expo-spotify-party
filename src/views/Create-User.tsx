import React from 'react'
import { useCreateUser } from '../api/hooks/use-create-user'
import styled from 'styled-components/native'
import { User } from '../api/user'
import { useRouting } from 'expo-next-react-navigation'
import { NavigationRoutes } from '../navigation/routes'
import { Container } from '../components/Container'
import ColorCard from '../components/Color-Card'
import { ThemeUi, ThemeProps } from '../theme'
import {
  useNavigation,
  TabActions,
  StackActions,
} from '@react-navigation/native'
import { Platform } from 'react-native'
import { Button } from 'react-native-elements'
import Input from '../components/Input'

type Props = {}

// const Container = styled.View`
//   flex: 1;
//   /* justify-content: center; */
//   margin-top: 100px;
//   /* align-items: center; */
// `
const Background = styled.ScrollView`
  background-color: ${({ theme }: ThemeProps) => theme.colors.background};
`

// const Input = styled.TextInput`
//   color: ${({ theme }: ThemeProps) => theme.colors.text};
//   font-size: ${({ theme }: ThemeProps) => theme.fontSizes[2]}px;
//   font-weight: bold;
//   padding-top: ${({ theme }: ThemeProps) => theme.spacing[0]}px;
//   padding-bottom: ${({ theme }: ThemeProps) => theme.spacing[1]}px;
// `
const Btn = styled(Button)`
  /* margin-top: 20px; */
  /* background-color: ${({ theme }: ThemeProps) => theme.colors.primary}; */
`
const Text = styled.Text``

const Onboarding = () => {
  const { getParam, navigate: replace, popToTop } = useRouting()
  const redirectPartyId = getParam<string>('redirectPartyId')
  const { dispatch } = useNavigation()
  const { handle, setHandle, create, isLoading, ready } = useCreateUser({
    onSuccess: async () => {
      const me = await User.get()
      if (User.hasSpotifyAccountLinked(me)) {
        if (redirectPartyId) {
          replace({
            routeName: NavigationRoutes.party,
            params: {
              id: redirectPartyId,
            },
          })
        } else {
          replace({
            routeName: NavigationRoutes.dashboard,
          })
        }
      } else {
        // popToTop()
        // replace({
        //   routeName: NavigationRoutes.account,
        // })
        if (Platform.OS === 'web') {
          replace({
            routeName: NavigationRoutes.spotifyAuth,
          })
        } else {
          replace({
            routeName: NavigationRoutes.spotifyAuth,
          })
        }
        // console.log('CREATE USER SHOULD POP')
        // dispatch(TabActions.jumpTo(NavigationRoutes.account))
        // dispatch(StackActions.pop())

        // replace({
        //   routeName: NavigationRoutes.spotifyAuth,
        //   key: NavigationRoutes.spotifyAuth,
        //   params: {
        //     redirectPartyId,
        //   },
        // })
      }
    },
  })
  return (
    <Background keyboardShouldPersistTaps="handled">
      <Container>
        {/* <ColorCard color="muted">
          <Input
            value={handle}
            onChangeText={setHandle}
            placeholder="Type a username"
            onSubmitEditing={create}
            placeholderTextColor={`${ThemeUi.colors.text}80`}
            // autoFocus
            selectionColor={ThemeUi.colors.primary}
            </ColorCard>
  />*/}
        <Input
          value={handle}
          onChangeText={setHandle}
          placeholder="Type a username"
          onSubmitEditing={create}
          placeholderTextColor={`${ThemeUi.colors.text}80`}
          // autoFocus
          selectionColor={ThemeUi.colors.primary}
        />
        {!!ready && (
          <Btn
            title="Continue"
            onPress={create}
            buttonStyle={buttonStyle({ theme: ThemeUi })}
            titleStyle={titleStyle({ theme: ThemeUi })}
            loading={isLoading}
            // type={'outline'}
          />
        )}
      </Container>
    </Background>
  )
}

const buttonStyle = ({ theme }: ThemeProps) => ({
  backgroundColor: theme.colors.primary,
  paddingVertical: theme.spacing[2],
  borderRadius: theme.radii[4],
  marginTop: theme.spacing[2],
})
const titleStyle = ({ theme }: ThemeProps) => ({
  fontWeight: theme.fontWeights.semibold,
})

export default Onboarding
