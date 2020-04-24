import { Server } from './server'
import { fuego } from './fuego'
import { empty } from '../helpers/empty'
import { UserSchema } from '../schema/user-schema'
import { mutate } from 'swr'

export class User {
  static collection = 'users'
  static async create({ handle }: { handle: string }) {
    return Server.post('createUser', {
      handle,
    })
  }
  static hasOnboarded(user?: UserSchema) {
    return !!user?.handle
  }
  static hasSpotifyAccountLinked(user?: UserSchema | null) {
    return !!user?.has_auth
  }
  /**
   * Make this a non-static method, and replace `User.get()` with `User.me.get()`.
   */
  static async get() {
    const document = await fuego.db
      .doc(`${User.collection}/${User.me.id}`)
      .get()
    const data: UserSchema = document.data() ?? empty.object
    return {
      ...data,
      id: document.id,
      exists: document.exists,
    }
  }
  static get me() {
    const id = fuego.auth().currentUser?.uid
    if (!id) {
      console.warn(
        '[User.me]: tried to get the current user UID, but it does not exist.'
      )
    }
    return new User({ id })
  }

  public id: string
  constructor({ id }: { id: string }) {
    this.id = id
  }

  get path() {
    return `${User.collection}/${this.id}`
  }
  editHandle({ handle }: Pick<UserSchema, 'handle'>) {
    // don't use set()
    // why? it should fail if it doesn't exist, not create a new doc.
    // If the doc shouldn't exist yet, use `User.create` instead.
    return fuego.db.doc(`${User.collection}/${this.id}`).update({ handle })
  }
  /**
   *
   * @param updatedUser Partial user dictionary with fields to update.
   * @param shouldRevalidate
   */
  mutate(updatedUser: Partial<UserSchema>, shouldRevalidate = false) {
    /**
     * 🚨 TODO update the `@nandorojo/swr-firestore` library to not include `listen` in the key.
     *
     * Whether or not it's a listener shouldn't affect the query. Hmm....Ref object?
     */
    const withListener = mutate(
      [this.path, true],
      (user: Partial<UserSchema> = empty.object) => {
        return {
          ...user,
          ...updatedUser,
        }
      },
      shouldRevalidate
    )
    const noListener = mutate(
      [this.path, false],
      (user: Partial<UserSchema> = empty.object) => {
        return {
          ...user,
          ...updatedUser,
        }
      },
      shouldRevalidate
    )
    return Promise.all([withListener, noListener])
  }
}
