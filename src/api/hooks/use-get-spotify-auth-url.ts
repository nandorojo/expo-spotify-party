import { Spotify } from '../spotify'
import { useState, useEffect } from 'react'

export const useGetSpotifyAuthUrl = () => {
  console.log('hook')
  const [result, setResult] = useState<{
    url: string
    has_auth?: boolean
  } | null>(null)
  const [status, setStatus] = useState<
    'loading' | 'error' | 'none' | 'success'
  >('none')
  useEffect(() => {
    ;(async () => {
      setStatus('loading')
      try {
        const {
          success,
          url,
          has_auth,
          message,
        } = await Spotify.createAuthEndpointAsync()
        setResult({ url, has_auth })

        if (success) setStatus('success')
        else throw new Error(message)
      } catch (e) {
        console.error('use-get-spotify-auth-url', e)
        setStatus('error')
      }
    })()
  }, [])
  // const { result, loading, error } = useAsync(
  //   Spotify.createAuthEndpointAsync,
  //   []
  // )
  return {
    result,
    loading: status === 'loading',
  }
}
