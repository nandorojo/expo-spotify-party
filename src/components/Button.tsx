import React, { ComponentPropsWithoutRef } from 'react'
import { Button as Btn } from 'react-native-elements'
import { ThemeProps, ThemeUi } from '../theme'

type Props = {
  onPress?: () => void
} & ComponentPropsWithoutRef<typeof Btn>

const Button = (props: Props) => {
  const { title = 'Continue', ...p } = props
  const buttonStyle = ({ theme }: ThemeProps) => ({
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing[2],
    borderRadius: theme.radii[4],
    marginTop: theme.spacing[2],
  })
  const titleStyle = ({ theme }: ThemeProps) => ({
    fontWeight: theme.fontWeights.semibold,
  })
  return (
    <Btn
      title={title}
      buttonStyle={buttonStyle({ theme: ThemeUi })}
      titleStyle={titleStyle({ theme: ThemeUi })}
      {...p}
      // onPress={onPress}
      // type={'outline'}
    />
  )
}

export default React.memo(Button)
