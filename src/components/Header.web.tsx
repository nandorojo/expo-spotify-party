import React from 'react'
import styled from 'styled-components/native'
import { ThemeProps } from '../theme'
import { Container } from './Container'
import Button from './Button'
import { Row } from '@nandorojo/bootstrap'
import Link from 'next/link'
import { useAuthGate } from 'react-native-doorman'

const Wrapper = styled.View`
  background-color: ${({ theme }: ThemeProps) => theme.colors.muted};
  padding: ${({ theme }: ThemeProps) => theme.spacing[1]}px 0;
`

const LogoText = styled.Text`
  font-size: ${({ theme }: ThemeProps) => theme.fontSizes[2]}px;
  color: ${({ theme }: ThemeProps) => theme.colors.primary};
  font-style: italic;
`

const SignOut = styled.Text`
  font-weight: ${({ theme }: ThemeProps) => theme.fontWeights.bold};
`

const Header = () => {
  const { user, loading } = useAuthGate()
  return (
    <Wrapper>
      <Container>
        <Row justifyContent="space-between">
          <Link passHref href="/dashboard">
            <LogoText accessibilityRole="link">SpotifyParty</LogoText>
          </Link>
          {!user ? (
            <SignOut accessibilityRole="link">Sign Out</SignOut>
          ) : (
            <Link passHref href="/auth">
              <Button title="Sign In" />
            </Link>
          )}
        </Row>
      </Container>
    </Wrapper>
  )
}

export default Header
