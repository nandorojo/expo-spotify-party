import { useRef, useEffect } from 'react'
import { ValueOf } from '../types/value-of'

// Hook
// https://usehooks.com/useWhyDidYouUpdate/
export function useWhyDidYouUpdate<P>(name: string, props: P) {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef<P | null>(null)

  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys: (keyof P)[] = Object.keys({
        ...previousProps.current,
        ...props,
      }) as (keyof P)[]
      // Use this object to keep track of changed props
      const changesObj: {
        [k in keyof P]?: { from?: ValueOf<P>; to?: ValueOf<P> }
      } = {}
      // Iterate through keys
      allKeys.forEach(key => {
        // If previous is different from current
        if (previousProps.current?.[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current?.[key],
            to: props[key],
          }
        }
      })

      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log('[why-did-you-update]', name, changesObj)
      }
    }

    // Finally update previousProps with current props for next hook call
    previousProps.current = props
  })
}
