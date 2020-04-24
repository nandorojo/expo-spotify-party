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
  icon?: string | ((info: { size: number }) => ReactNode)
  description?: string
  marginBottom?: 0 | 1 | 2 | 3 | 4 | 5
  textSize?: 0 | 1 | 2 | 3 | 4 | 5
  type?: 'outlined' | 'contained' | 'empty'
  descriptionLocation?: 'under image' | 'under text'
  right?: () => ReactNode
  /**
   * Arrow is only visible if there is an `onPress` set.
   */
  hideArrow?: boolean
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
  font-size: ${({
    theme,
    textSize = 3,
  }: ThemeProps & Pick<Props, 'textSize'>) => theme.fontSizes[textSize]}px;
  font-weight: bold;
`
const Description = styled.Text`
  color: ${({ theme }: ThemeProps) => theme.colors.text};
  margin-top: ${({
    theme,
    location,
  }: { location: Props['descriptionLocation'] } & ThemeProps) =>
    location === 'under text' ? 0 : theme.spacing[2]}px;
  font-size: ${({ theme }: ThemeProps) => theme.fontSizes[0]}px;
`

const Flex = styled.View`
  flex: 1;
`

const Right = styled.View`
  justify-content: center;
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
    textSize,
    hideArrow = false,
    right,
  } = props
  // @ts-ignore
  const theme: typeof ThemeUi = useTheme()

  const renderRight = () => {
    if (right) return <Right>{right()}</Right>
    if (onPress && !hideArrow) {
      return (
        <Ionicons
          size={30}
          color={theme.colors.text}
          name="ios-arrow-forward"
        />
      )
    }
    return null
  }

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
                {!!text && <Text textSize={textSize}>{text}</Text>}
                {!!description && descriptionLocation === 'under text' && (
                  <Description location={descriptionLocation}>
                    {description}
                  </Description>
                )}
              </TextContainer>
            </Row>
            {!!description && descriptionLocation === 'under image' && (
              <Description location={descriptionLocation}>
                {description}
              </Description>
            )}
            {children}
          </Flex>
          {renderRight()}
        </Row>
      </Container>
    </TouchableOpacity>
  )
}

export default ColorCard
