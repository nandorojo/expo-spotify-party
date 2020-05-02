import React from 'react'
import dynamic from 'next/dynamic'
const Sheet = dynamic(() => import('../src/views/Sheet'), {
  ssr: false,
})

export default function SheetPage() {
  // @ts-ignore
  return <Sheet />
}
