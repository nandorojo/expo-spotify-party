import React, { ComponentProps } from 'react'
import ColorCard from './Color-Card'
import styled from 'styled-components/native'
import { ThemeProps, ThemeUi } from '../theme'
import { empty } from '../helpers/empty'
import { Platform } from 'react-native'

type Props = {
  cardProps?: ComponentProps<typeof ColorCard>
} & ComponentProps<typeof TextInput>

const TextInput = styled.TextInput`
  color: ${({ theme }: ThemeProps) => theme.colors.text};
  font-size: ${({ theme }: ThemeProps) => theme.fontSizes[2]}px;
  font-weight: bold;
  padding-top: ${({ theme }: ThemeProps) =>
    // fix the TextInput padding bug on mobile
    theme.spacing[Platform.OS === 'web' ? 1 : 0]}px;
  padding-bottom: ${({ theme }: ThemeProps) => theme.spacing[1]}px;
`

const Input = (props: Props) => {
  const { cardProps = empty.object, ...inputProps } = props
  return (
    <ColorCard color="muted" {...cardProps}>
      <TextInput
        placeholderTextColor={`${ThemeUi.colors.text}80`}
        // autoFocus
        selectionColor={ThemeUi.colors.primary}
        // textAlign
        {...inputProps}
      />
    </ColorCard>
  )
}

export default React.memo(Input)
