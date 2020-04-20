import { Server } from './server'
import { fuego } from './fuego'
import * as AuthSession from 'expo-auth-session'
import { Linking } from 'expo'
import { Platform } from 'react-native'

export class Spotify {
  static get authEndpoint() {
    return `${Server.endpoint}/spotifyAuth/${fuego.auth().currentUser.uid}`
  }
  static async createAuthEndpointAsync() {
    // await startAsync({
    //   returnUrl: getRedirectUrl()
    // })
    const redirectUri =
      Platform.OS === 'web' ? AuthSession.getRedirectUrl() : Linking.makeUrl()
    // const redirectUri = getRedirectUrl()
    console.log('will request endpoint', { redirectUri })
    return Server.post('createSpotifyAuthUrl', {
      redirectUri,
    })
  }
  static hasUserLinkedSpotify = async ({ uid }: { uid: string }) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true, uid })
      }, 1500)
    })
  }
  static AuthScopes = [
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-read-playback-state',
    'user-library-modify',
    'user-library-read',
    'playlist-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-modify-private',
    'user-read-recently-played',
    'user-top-read',
  ]
}
