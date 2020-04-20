import React from 'react'
import { NextPage } from 'next'
import Page from '../../src/wrappers/Page'
import dynamic from 'next/dynamic'
const Party = dynamic(() => import('../../src/views/Party'))

type Props = { name: string; title: string }

const PartyPage: NextPage<Props> = props => {
  const { title } = props

  return (
    <Page
      seo={{
        title: title,
        description: 'Listen to Spotify with friends in real-time. 🎧',
      }}
    >
      <Party />
    </Page>
  )
}

PartyPage.getInitialProps = async ({ req, query }) => {
  // fetch the party name here
  const host = await new Promise(resolve => resolve(`Host's name`))
  const name: string = await new Promise(resolve => resolve('Big party'))

  let title = `Join the ${name} Spotify party`
  if (!name) title = `Join ${host}'s Spotify party`

  return { name, title }
}

export default PartyPage