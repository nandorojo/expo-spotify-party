import React, { ReactNode, ComponentPropsWithoutRef } from 'react'
import { NextSeo } from 'next-seo'
import { empty } from '../../helpers/empty'

type Props = {
  children: ReactNode
  seo?: ComponentPropsWithoutRef<typeof NextSeo>
}

const Page = ({ children, seo = empty.object }: Props) => {
  return (
    <>
      <NextSeo {...seo} />
      {children}
    </>
  )
}

export default Page
