import React from 'react'
import styled from 'styled-components/native'
import { ThemeProps } from '../theme'
import ColorCard from '../components/Color-Card'
import { Container } from '../components/Container'

const Scroll = styled.ScrollView`
  flex: 1;
  /* background-color: ${({ theme }: ThemeProps) => theme.colors.background}; */
  /* padding: ${({ theme }: ThemeProps) => `${theme.spacing[1]}px`}; */
`

const Text = styled.Text`
  font-size: ${({ theme }: ThemeProps) => theme.fontSizes[4]}px;
  color: ${({ theme }: ThemeProps) => theme.colors.text};
`

const StyledContainer = styled(Container)`
  flex: 1;
`

const Card = styled.View`
  margin-bottom: ${({ theme }: ThemeProps) => theme.spacing[2]}px;
`

const Dashboard = () => {
  return (
    <Scroll>
      <StyledContainer>
        <Card>
          <ColorCard
            icon="ios-add-circle"
            text="New Party"
            description="Become the DJ of a virtual Spotify party. Invite friends to listen to your songs in real-time."
          ></ColorCard>
        </Card>
        <Card>
          <ColorCard
            color="secondary"
            icon="ios-musical-note"
            text="Join Party"
            description="If your friend already started a party, you can join and listen to their songs along with them."
          ></ColorCard>
        </Card>
      </StyledContainer>
    </Scroll>
  )
}

export default Dashboard
