import React from 'react'
import styled from 'styled-components/native'
import { ThemeProps } from '../theme'
import { Container } from './Container'
import { Row } from '@nandorojo/bootstrap'
import Link from 'next/link'
import { useAuthGate, useMaybeDoormanUser } from 'react-native-doorman'

const Wrapper = styled.View`
  background-color: ${({ theme }: ThemeProps) => theme.colors.muted};
  padding: ${({ theme }: ThemeProps) => theme.spacing[1]}px 0;
`

const LogoText = styled.Text`
  font-size: ${({ theme }: ThemeProps) => theme.fontSizes[2]}px;
  color: ${({ theme }: ThemeProps) => theme.colors.primary};
  font-style: italic;
  font-weight: ${({ theme }: ThemeProps) => theme.fontWeights.bold};
`

const SignOut = styled.Text`
  font-weight: ${({ theme }: ThemeProps) => theme.fontWeights.bold};
  color: ${({ theme }: ThemeProps) => theme.colors.text};
`

const Header = () => {
  const { loading } = useAuthGate()
  const [user, signOut] = useMaybeDoormanUser()
  return (
    <Wrapper>
      <Container>
        <Row justifyContent="space-between" alignItems="center">
          <Link passHref href="/dashboard">
            <LogoText accessibilityRole="link">SpotifyParty</LogoText>
          </Link>
          {!!loading ? null : !!user ? (
            <SignOut onPress={() => signOut()} accessibilityRole="link">
              Sign Out
            </SignOut>
          ) : (
            <Link prefetch={true} passHref href="/auth">
              <SignOut accessibilityRole="link">Sign In</SignOut>
            </Link>
          )}
        </Row>
      </Container>
    </Wrapper>
  )
}

export default Header
