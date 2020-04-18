const { withExpo } = require('@expo/next-adapter')
const withFonts = require('next-fonts')
const withImages = require('next-images')
const withTM = require('next-transpile-modules')([
  'react-native-reanimated',
  'expo-next-react-navigation',
  'react-native-doorman',
  '@nandorojo/fuego',
])
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins(
  [withTM, withFonts, withImages, [withExpo, { projectRoot: __dirname }]],
  {
    // ...
  }
)
