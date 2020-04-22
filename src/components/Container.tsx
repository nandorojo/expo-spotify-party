import styled from 'styled-components/native'
import { ThemeProps } from '../theme'

type Props = {
  padding?: 0 | 1 | 2 | 3 | 4 | 5
}

export const Container = styled.View`
  max-width: ${({ theme }: ThemeProps) => theme.sizes.container};
  width: 100%;
  margin: 0 auto;
  padding: ${({ theme, padding = 1 }: ThemeProps & Props) =>
    theme.spacing[padding]}px;
`
