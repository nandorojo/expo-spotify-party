import { useEffect } from 'react'

import { Linking } from 'expo'
import * as NavigationService from '../navigation/navigation-service'
import { NavigationRoutes } from '../navigation/routes'

export const useDeepLinking = () => {
  useEffect(() => {
    const callback = ({ url }: { url: string }) => {
      const { path, queryParams } = Linking.parse(url)
      handle(path ?? '', queryParams)
    }

    const handle = (
      path: string | null,
      queryParams: { id?: string } | null
    ) => {
      console.log('[main-tabs][useDeepLinking][handle]', { path, queryParams })
      if (path?.includes('/party')) {
        const id = path.split('/party/')?.[1] || queryParams?.id
        NavigationService.navigate(NavigationRoutes.party, {
          id,
        })
      }
    }

    const get = async () => {
      try {
        const { path, queryParams } = await Linking.parseInitialURLAsync()
        handle(path, queryParams)
      } catch (e) {
        console.error('linking failed', e)
      }
    }
    get()

    Linking.addEventListener('url', callback)
    return () => {
      Linking.removeEventListener('url', callback)
    }
  }, [])
}
