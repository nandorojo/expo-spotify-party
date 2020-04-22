import { Server } from './server'
import { fuego } from './fuego'
import { empty } from '../helpers/empty'
import { UserSchema } from '../schema/user-schema'

export class User {
  static collection = 'users'
  static async create({ handle }: { handle: string }) {
    return Server.post('createUser', {
      handle,
    })
  }
  static hasOnboarded(user: UserSchema) {
    return !!user.handle
  }
  static hasSpotifyAccountLinked(user: UserSchema) {
    return !!user.has_auth
  }
  static async get() {
    // try {
    const document = await fuego.db
      .doc(`${User.collection}/${fuego.auth().currentUser.uid}`)
      .get()
    const data: UserSchema = document.data() ?? empty.object
    return {
      ...data,
      id: document.id,
      exists: document.exists,
    }
    // } catch (e) {
    //   return console.error(`User.hasOnboarded: ${e}`)
    // }
  }

  public id: string
  constructor({ id }: { id: string }) {
    this.id = id
  }
  editHandle({ handle }: Pick<UserSchema, 'handle'>) {
    // don't use set(), because it should fail if it doesn't exist, not create a new doc.
    return fuego.db.doc(`${User.collection}/${this.id}`).update({ handle })
  }
}
