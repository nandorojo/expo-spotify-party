import { useEffect, useState, useRef } from 'react'
import { empty } from '../helpers/empty'

const defaultOptions = {
  cancelOnUnmount: true,
}

/**
 * An async-utility hook that accepts a callback function and a delay time (in milliseconds), then repeats the
 * execution of the given function by the defined milliseconds.
 */
const useInterval = (
  fn: Function,
  milliseconds: number,
  options = defaultOptions
) => {
  const opts = { ...defaultOptions, ...(options || empty.object) }
  const timeout = useRef<number>()
  const callback = useRef(fn)
  const [isCleared, setIsCleared] = useState(false)

  // the clear method
  const clear = useRef(() => {
    if (timeout.current) {
      clearInterval(timeout.current)
      setIsCleared(true)
    }
  })

  // if the provided function changes, change its reference
  useEffect(() => {
    if (typeof fn === 'function') {
      callback.current = fn
    }
  }, [fn])

  // when the milliseconds change, reset the timeout
  useEffect(() => {
    if (typeof milliseconds === 'number') {
      timeout.current = setInterval(() => {
        callback.current()
      }, milliseconds)
    }
  }, [milliseconds])

  // when component unmount clear the timeout
  const { cancelOnUnmount = true } = opts
  useEffect(
    () => () => {
      if (cancelOnUnmount) {
        clear.current()
      }
    },
    [cancelOnUnmount]
  )

  return [isCleared, clear]
}

export default useInterval
