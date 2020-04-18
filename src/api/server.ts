// conditional types for typescript help
// https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/
// 😱fuck type script for the way this code looks

import { fuego } from './fuego'

type ActionOptions = 'createUser'
type ActionCreator<A extends ActionOptions> = { action: A }

// See  https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/
// this lets us change ({ action: string, ... }) to (action, { ... }) dynamically
type ExcludeActionKey<K> = K extends 'action' ? never : K
type ExcludeActionField<A> = { [K in ExcludeActionKey<keyof A>]: A[K] }
type ExtractActionParameters<A, T> = A extends { action: T }
  ? ExcludeActionField<A>
  : never

type CreateUser = ActionCreator<'createUser'> & {
  handle: string
}

type Req = CreateUser

type ResponseModel<Res = {}> = Res & {
  message?: string
  success: boolean
}

type Res<A extends ActionOptions> = A extends 'createUser'
  ? ResponseModel<{ uid: string }>
  : ResponseModel

export class Server {
  static endpoint = 'https://spotify-dj-1.herokuapp.com/api'

  static async post<A extends ActionOptions>(
    action: A,
    body: ExtractActionParameters<Req, A>
  ): Promise<Res<A>> {
    const token = await fuego.auth().currentUser?.getIdToken()
    return fetch(Server.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...body,
        action,
        token,
      }),
    }).then(r => r.json())
  }
}
