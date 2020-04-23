import React, { ComponentPropsWithoutRef } from 'react'
import { Button as Btn } from 'react-native-elements'
import { ThemeProps, ThemeUi } from '../theme'

type Props = {
  onPress?: () => void
  variant?: 'small' | 'outline' | 'contained'
  color?: keyof typeof ThemeUi['colors']
} & ComponentPropsWithoutRef<typeof Btn>

const Button = (props: Props) => {
  const {
    title = 'Continue',
    variant = 'contained',
    color = 'primary',
    ...p
  } = props
  const buttonStyle = ({ theme }: ThemeProps) => ({
    backgroundColor: theme.colors[color],
    paddingVertical:
      variant === 'small' ? theme.spacing[1] : theme.spacing[1] * 1.25,
    borderRadius: theme.radii[4],
    paddingHorizontal:
      variant === 'small' ? theme.spacing[3] : theme.spacing[3] * 2,
    // marginTop: theme.spacing[2],
  })
  return (
    <Btn
      title={title}
      buttonStyle={buttonStyle({ theme: ThemeUi })}
      titleStyle={{
        fontWeight: ThemeUi.fontWeights.semibold,
      }}
      {...p}
      // type={'outline'}
    />
  )
}

export default React.memo(Button)
