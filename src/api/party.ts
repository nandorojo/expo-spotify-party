import { Server } from './server'

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

  public id: string
  constructor({ id }: { id: string }) {
    this.id = id
  }
  subscribe() {
    return Server.post('subscribe', {
      handle: this.id,
    })
  }
}
