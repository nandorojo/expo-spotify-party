import { Server } from './server'
import { fuego } from './fuego'
import { empty } from '../helpers/empty'

export class User {
  static collection = 'users'
  static async create({ handle }: { handle: string }) {
    return Server.post('createUser', {
      handle,
    })
  }
  static async get() {
    // try {
    const document = await fuego.db
      .doc(`${User.collection}/${fuego.auth().currentUser.uid}`)
      .get()
    const data: { has_auth: boolean; handle?: string } =
      document.data() ?? empty.object
    return {
      ...data,
      id: document.id,
      exists: document.exists,
    }
    // } catch (e) {
    //   return console.error(`User.hasOnboarded: ${e}`)
    // }
  }
}
