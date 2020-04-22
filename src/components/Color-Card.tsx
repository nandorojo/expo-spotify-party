import React, { ReactNode } from 'react'
import styled, { useTheme } from 'styled-components/native'
import { ThemeProps, ThemeUi } from '../theme'
import { TouchableOpacity } from 'react-native'
import { Row } from '@nandorojo/bootstrap'
// @ts-ignore
import Ionicons from '@expo/vector-icons/Ionicons'

type Props = {
  color?: keyof typeof ThemeUi['colors']
  padding?: number
  text?: string
  onPress?: () => void
  children?: ReactNode
  icon?: string
  description?: string
}

const Container = styled.View`
  background-color: ${({ theme, color = 'primary' }: Props & ThemeProps) =>
    theme.colors[color]};
  padding: ${({ theme, padding = theme.spacing[2] }: Props & ThemeProps) =>
    `${padding}px`};
  border-radius: ${({ theme }: Props & ThemeProps) => `${theme.radii[4]}px`};
`
const Text = styled.Text`
  color: ${({ theme }: ThemeProps) => theme.colors.text};
  font-size: ${({ theme }: ThemeProps) => theme.fontSizes[3]}px;
  font-weight: bold;
  margin-left: ${({ theme, icon }: Props & ThemeProps) =>
    icon ? theme.spacing[0] : 0}px;
`
const Description = styled.Text`
  color: ${({ theme }: ThemeProps) => theme.colors.text};
  margin-top: ${({ theme }: ThemeProps) => theme.spacing[2]}px;
  font-size: ${({ theme }: ThemeProps) => theme.fontSizes[0]}px;
`

const ColorCard = (props: Props) => {
  const { color, children, padding, text, onPress, icon, description } = props
  // @ts-ignore
  const theme: typeof ThemeUi = useTheme()
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Container padding={padding} color={color}>
        <Row alignItems="center">
          {!!icon && (
            <Ionicons name={icon} size={30} color={theme.colors.text} />
          )}
          {!!text && <Text icon={icon}>{text}</Text>}
        </Row>
        {!!description && <Description>{description}</Description>}
        {children}
      </Container>
    </TouchableOpacity>
  )
}

export default ColorCard
