import { Server } from './server'
import { fuego } from './fuego'
import * as AuthSession from 'expo-auth-session'
import { Linking } from 'expo'
import { Platform } from 'react-native'
import { User } from './user'
import { mutate } from 'swr'
import { UserSchema } from '../schema/user-schema'
import { empty } from '../helpers/empty'

export class Spotify {
  static get authEndpoint() {
    return `${Server.endpoint}/spotifyAuth/${User.me.id}`
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
  static removeAccount() {
    const { id, path } = User.me
    if (!id) return console.error('Spotify.removeAccount error. no UID.')
    const local = mutate(
      path,
      (user: Partial<UserSchema> = empty.object): UserSchema => {
        return {
          ...user,
          has_auth: false,
        }
      },
      false
    )
    const remote = fuego.db.doc(path).set({ has_auth: false }, { merge: true })
    return Promise.all([local, remote])
  }
}
