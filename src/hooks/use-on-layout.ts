import { useState, useCallback } from 'react'
import { LayoutChangeEvent } from 'react-native'

type Layout = LayoutChangeEvent['nativeEvent']['layout']

export const useOnLayout = (): [Layout, (e: LayoutChangeEvent) => void] => {
  const [state, setState] = useState<Layout>({
    height: 0,
    width: 0,
    x: 0,
    y: 0,
  })
  const onLayout = useCallback(
    (event: LayoutChangeEvent) => setState(event.nativeEvent.layout),
    []
  )

  return [state, onLayout]
}
