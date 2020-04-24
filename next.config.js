/* eslint-disable @typescript-eslint/no-var-requires */
const { withExpo } = require('@expo/next-adapter')
const withFonts = require('next-fonts')
const withImages = require('next-images')
const withTM = require('next-transpile-modules')([
  'expo-next-react-navigation',
  'react-native-doorman',
  '@nandorojo/fuego',
  '@nandorojo/swr-firestore',
  // 'react-native-reanimated',
  '@nandorojo/bootstrap',
  '@expo/react-native-action-sheet',
  'expo',
])
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins(
  [withTM, withFonts, withImages, [withExpo, { projectRoot: __dirname }]],
  {
    // ...
  }
)
