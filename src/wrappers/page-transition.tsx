import React from 'react'
// @ts-ignore
import { PageTransition } from 'next-page-transitions'

type Props = {
  children: React.ReactNode
}

const Transition = (props: Props) => {
  const { children } = props
  return children
  return (
    <>
      <PageTransition timeout={200} classNames="page-transition">
        {children}
      </PageTransition>
      <style jsx global>{`
        .page-transition-enter {
          opacity: 0;
        }
        .page-transition-enter-active {
          opacity: 1;
          transition: opacity 200ms;
        }
        .page-transition-exit {
          opacity: 1;
        }
        .page-transition-exit-active {
          opacity: 0;
          transition: opacity 200ms;
        }
        /* REACT NATIVE WEB RESET */
        [class^='page-transition'] {
          width: 100%;
          /* To smooth any scrolling behavior */
          -webkit-overflow-scrolling: touch;
          margin: 0px;
          padding: 0px;
          /* Allows content to fill the viewport and go beyond the bottom */
          min-height: 100%;

          flex-shrink: 0;
          flex-basis: auto;
          flex-direction: column;
          flex-grow: 1;
          display: flex;
          flex: 1;
        }
      `}</style>
    </>
  )
}

export default Transition
