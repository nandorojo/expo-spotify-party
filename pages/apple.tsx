import React from 'react'
import dynamic from 'next/dynamic'
const AppleMusic = dynamic(() => import('../src/views/Apple-Music'), {
  ssr: false,
})

export default function Apple() {
  // @ts-ignore
  return <AppleMusic />
}
