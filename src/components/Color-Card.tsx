import React, { ReactNode } from 'react'
import styled, { useTheme } from 'styled-components/native'
import { ThemeProps, ThemeUi } from '../theme'
import { TouchableOpacity, View } from 'react-native'
import { Row } from '@nandorojo/bootstrap'
// @ts-ignore
import Ionicons from '@expo/vector-icons/Ionicons'

type Props = {
  color?: keyof typeof ThemeUi['colors']
  padding?: number
  text?: string
  onPress?: () => void
  children?: ReactNode
  icon?: string | ((info: { size: number }) => ReactNode)
  description?: string
  marginBottom?: 0 | 1 | 2 | 3 | 4 | 5
  type?: 'outlined' | 'contained' | 'empty'
  descriptionLocation?: 'under image' | 'under text'
  // left?: () => ReactNode
}

const Container = styled.View`
  background-color: ${({
    theme,
    color = 'primary',
    type = 'contained',
  }: Pick<Props, 'color' | 'type'> & ThemeProps) =>
    type === 'outlined'
      ? theme.colors.muted
      : type === 'empty'
      ? 'transparent'
      : theme.colors[color]};
  padding: ${({
    theme,
    padding = theme.spacing[1],
  }: Pick<Props, 'padding'> & ThemeProps) => `${padding}px`};
  border-radius: ${({ theme }: ThemeProps) => `${theme.radii[4]}px`};
  margin-bottom: ${({ theme, marginBottom = 0 }: Props & ThemeProps) =>
    `${theme.spacing[marginBottom]}px`};
  border-style: solid;
  border-width: ${({ theme }: ThemeProps) => `${theme.borders[1]}px`};
  border-color: ${({
    theme,
    color = 'primary',
    type = 'contained',
  }: Pick<Props, 'color' | 'type'> & ThemeProps) =>
    type === 'outlined'
      ? theme.colors[color]
      : type === 'empty'
      ? 'transparent'
      : theme.colors[color]};
`

const TextContainer = styled.View`
  padding-left: ${({ theme, icon }: Pick<Props, 'icon'> & ThemeProps) =>
    icon ? theme.spacing[1] : 0}px;
`

const Text = styled.Text`
  color: ${({ theme }: ThemeProps) => theme.colors.text};
  font-size: ${({ theme }: ThemeProps) => theme.fontSizes[3]}px;
  font-weight: bold;
`
const Description = styled.Text`
  color: ${({ theme }: ThemeProps) => theme.colors.text};
  margin-top: ${({ theme, descriptionLocation }: Props & ThemeProps) =>
    descriptionLocation === 'under text' ? 0 : theme.spacing[2]}px;
  font-size: ${({ theme }: ThemeProps) => theme.fontSizes[0]}px;
`

const Flex = styled.View`
  flex: 1;
`

const ColorCard = (props: Props) => {
  const {
    color,
    children,
    padding,
    text,
    onPress,
    icon,
    description,
    marginBottom,
    type,
    descriptionLocation = 'under image',
  } = props
  // @ts-ignore
  const theme: typeof ThemeUi = useTheme()
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Container
        type={type}
        marginBottom={marginBottom}
        padding={padding}
        color={color}
      >
        <Row>
          <Flex>
            <Row alignItems="center">
              {!!icon && typeof icon === 'function' ? (
                icon({ size: 30 })
              ) : (
                <Ionicons name={icon} size={30} color={theme.colors.text} />
              )}
              <TextContainer icon={icon}>
                {!!text && <Text>{text}</Text>}
                {!!description && descriptionLocation === 'under text' && (
                  <Description descriptionLocation={descriptionLocation}>
                    {description}
                  </Description>
                )}
              </TextContainer>
            </Row>
            {!!description && descriptionLocation === 'under image' && (
              <Description descriptionLocation={descriptionLocation}>
                {description}
              </Description>
            )}
            {children}
          </Flex>
          {!!onPress && (
            <Ionicons
              size={30}
              color={theme.colors.text}
              name="ios-arrow-forward"
            />
          )}
        </Row>
      </Container>
    </TouchableOpacity>
  )
}

export default ColorCard
