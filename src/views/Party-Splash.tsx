import React, { useCallback } from 'react'
import styled from 'styled-components/native'
import { ThemeProps } from '../theme'
import { Container } from '../components/Container'
import { useAuthGate } from 'react-native-doorman'
import { useRouting } from 'expo-next-react-navigation'
import { NavigationRoutes } from '../navigation/routes'
import ColorCard from '../components/Color-Card'
import Button from '../components/Button'
import { useSubscribeToParty } from '../api/hooks/use-subscribe-to-party'
import { useWhyDidYouUpdate } from '../hooks/use-why-did-you-update'

type Props = {
  id: string
  // onJoinedSuccessfully: () => void
  hasSpotify: boolean
}

const Background = styled.ScrollView`
  background: ${({ theme }: ThemeProps) => theme.colors.background};
`

const Wrapper = styled(Container)`
  /* align-items: center; */
`

const Btn = styled(Button)`
  margin-top: ${({ theme }: ThemeProps) => theme.spacing[2]}px;
`

const PartySplash = ({ id: redirectPartyId, hasSpotify }: Props) => {
  const { user } = useAuthGate()
  const { navigate } = useRouting()
  const { subscribe, loading } = useSubscribeToParty()

  const onPress = useCallback(async () => {
    if (!user) {
      navigate({
        routeName: NavigationRoutes.auth,
        params: {
          redirectPartyId,
        },
      })
    } else if (!hasSpotify) {
      navigate({
        routeName: NavigationRoutes.spotifyAuth,
        params: {
          redirectPartyId,
        },
      })
    } else {
      subscribe(redirectPartyId)
    }
  }, [user, hasSpotify, navigate, redirectPartyId, subscribe])

  let buttonText = 'Join Party'
  if (!user) buttonText = 'Continue'
  else if (!hasSpotify) buttonText = 'Connect Spotify'

  return (
    <Background>
      <Wrapper>
        <ColorCard
          text="Join a Spotify Party."
          description="Once you join, your Spotify songs will update in sync with the DJ."
          color="muted"
        >
          <Btn
            loading={!!(user && hasSpotify && loading)}
            title={buttonText}
            onPress={onPress}
          />
        </ColorCard>
      </Wrapper>
    </Background>
  )
}

export default React.memo(PartySplash)
