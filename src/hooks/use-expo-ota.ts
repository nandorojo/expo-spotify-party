import { useAppState } from '@react-native-community/hooks'
import { useEffect, useState, useRef } from 'react'
import * as Updates from 'expo-updates'
import { Platform } from 'react-native'

export const useExpoOta = () => {
  const [updating, setUpdating] = useState(false)
  const currentAppState: string = useAppState()
  const isUpdating = useRef(false)

  useEffect(() => {
    if (
      !__DEV__ &&
      currentAppState === 'active' &&
      Platform.OS !== 'web' &&
      !isUpdating.current
    ) {
      const update = async () => {
        try {
          const update = await Updates.checkForUpdateAsync()
          if (update?.isAvailable) {
            isUpdating.current = true
            setUpdating(true)
            await Updates.fetchUpdateAsync()
            await Updates.reloadAsync()
            setUpdating(false)
            isUpdating.current = false
          }
        } catch (e) {
          setUpdating(false)
          isUpdating.current = false
          console.error('👋 op, the expo update failed', e)
        }
      }
      update()
    }
  }, [currentAppState])

  return {
    updating,
  }
}
