import React, { useCallback, useState } from 'react'
import styled from 'styled-components/native'
import { ThemeProps } from '../theme'
import { Container } from '../components/Container'
import ColorCard from '../components/Color-Card'
import Button from '../components/Button'
import { useRouting } from 'expo-next-react-navigation'
import { NavigationRoutes } from '../navigation/routes'
import Input from '../components/Input'
import { useJoinParty } from '../api/hooks/use-join-party'

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

const TextInputContainer = styled.View`
  margin: ${({ theme }: ThemeProps) => theme.spacing[2]}px 0;
`

const JoinParty = () => {
  const { navigate } = useRouting()

  const onJoinedSuccessfully = useCallback(
    ({ id }: { id: string }) => {
      navigate({
        routeName: NavigationRoutes.party,
        params: { id },
        key: `${NavigationRoutes.party}${id}`,
      })
    },
    [navigate]
  )

  const { handle, setHandle, loading, join } = useJoinParty({
    onJoinedSuccessfully,
  })

  return (
    <Background keyboardShouldPersistTaps="handled">
      <Wrapper>
        <ColorCard
          text="Join a Spotify Party"
          description={`Enter the Party ID below. If you aren't sure, try the username of the DJ.
          
If someone invited you with a link, try opening it again.`}
          color="muted"
        />
        <TextInputContainer>
          <Input
            value={handle}
            onChangeText={setHandle}
            placeholder="Enter Party ID here..."
          />
        </TextInputContainer>
        <Button loading={loading} title={'Join Party'} onPress={join} />
      </Wrapper>
    </Background>
  )
}

export default React.memo(JoinParty)
