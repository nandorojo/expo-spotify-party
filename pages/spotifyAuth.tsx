import dynamic from 'next/dynamic'
import React, { ComponentType } from 'react'
// export { default } from '../src/views/Authenticate-Spotify'
const Page = dynamic(() => import('../src/views/Authenticate-Spotify'), {
  ssr: false,
  loading: () => <div>Hi</div>,
})
// console.log('okkk', process.browser)
// let Page: ComponentType
// if (process.browser) {
//   Page = require('../src/views/Authenticate-Spotify').default
//   console.log({ Page })
// } else {
//   Page = () => null
// }
console.log('who there')
export default () => {
  console.log('nice')
  // return null
  return <Page />
}
