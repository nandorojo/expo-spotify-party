import { Server } from './server'
import { Linking } from 'expo'

export class Party {
  static create() {
    return Server.post('makeDJ', {})
  }
  static end() {
    return Server.post('endDJ', {})
  }
  static unsubscribe() {
    return Server.post('unsubscribe', {})
  }

  public handle: string
  constructor({ handle }: { handle: string }) {
    this.handle = handle
  }
  subscribe() {
    return Server.post('subscribe', {
      handle: this.handle,
    })
  }
  /**
   * The handle field checks if the UID or handle exists. `handle` can be either UID or handle
   */
  async checkIfExists() {
    const { is_dj: exists, uid: id, ...response } = await Server.post('isDJ', {
      handle: this.handle,
    })
    return {
      exists,
      id,
      ...response,
    }
  }
  static shareUrl({ id }: { id: string }) {
    return Linking.makeUrl(`/party?id=${id}`)
  }
}
