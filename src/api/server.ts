// conditional types for typescript help
// https://artsy.github.io/blog/2018/11/21/conditional-types-in-typescript/
// 😱f typescript for the way this code looks

import { fuego } from './fuego'

type ActionOptions =
  | 'createUser'
  | 'createSpotifyAuthUrl'
  | 'makeDJ'
  | 'endDJ'
  | 'subscribe'
  | 'unsubscribe'
  | 'isDJ'
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

type MakeDJ = ActionCreator<'makeDJ'>

type CreateSpotifyAuthUrl = ActionCreator<'createSpotifyAuthUrl'> & {
  redirectUri: string
}

type EndDJ = ActionCreator<'endDJ'>

type Subscribe = ActionCreator<'subscribe'> & {
  handle: string
}

type Unsubscribe = ActionCreator<'unsubscribe'>

type IsDJ = ActionCreator<'isDJ'> & {
  handle: string
}

type Req =
  | CreateUser
  | CreateSpotifyAuthUrl
  | MakeDJ
  | EndDJ
  | Subscribe
  | Unsubscribe
  | IsDJ

type ResponseModel<Res = {}> = Res & {
  message?: string
  success: boolean
}

// this is super messy, but...
// this tells us what the response of the server call is, based on the request action
type Res<A extends ActionOptions> = A extends CreateUser['action']
  ? ResponseModel<{ uid: string }>
  : A extends CreateSpotifyAuthUrl['action']
  ? ResponseModel<{ url: string; has_auth?: boolean }>
  : A extends Subscribe['action']
  ? ResponseModel<{ uid: string }>
  : A extends IsDJ['action']
  ? ResponseModel<{ uid: string; is_dj: boolean; handle: string }>
  : A extends MakeDJ['action']
  ? ResponseModel<{ handle: string }>
  : ResponseModel // <- general response { success, message }

export class Server {
  static endpoint = 'https://spotify-dj-1.herokuapp.com'
  static apiEndpoint = `${Server.endpoint}/api`

  static async post<A extends ActionOptions>(
    action: A,
    body: ExtractActionParameters<Req, A>
  ): Promise<Res<A>> {
    const token = await fuego.auth().currentUser?.getIdToken()
    if (!token) console.warn('missing token for request')
    return fetch(Server.apiEndpoint, {
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
