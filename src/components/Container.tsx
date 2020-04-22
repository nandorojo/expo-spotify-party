import styled from 'styled-components/native'
import { ThemeProps } from '../theme'

export const Container = styled.View`
  max-width: ${({ theme }: ThemeProps) => theme.sizes.container};
  width: 100%;
  margin: 0 auto;
`
