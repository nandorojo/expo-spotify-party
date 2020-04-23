import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import { ThemeProps } from '../theme'
import { Container } from './Container'
import { Row } from '@nandorojo/bootstrap'

const Wrapper = styled.View`
  background-color: ${({ theme }: ThemeProps) => theme.colors.muted};
  padding: ${({ theme }: ThemeProps) => theme.spacing[1]}px 0;
`

const Header = () => {
  return (
    <Wrapper>
      <Container>
        <Row justifyContent="space-between">
          <></>
        </Row>
      </Container>
    </Wrapper>
  )
}

export default Header
