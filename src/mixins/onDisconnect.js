import { C1_PROPERTY, ON_DISCONNECT_PROPERTY } from "../const.js"

/** @param { Element } host */
export const _onDisconnect = (host) => {
  host[C1_PROPERTY][ON_DISCONNECT_PROPERTY] ??= []

  /** @param { () => void } disconnectedCallback */
  return (disconnectedCallback) => {
    host[C1_PROPERTY][ON_DISCONNECT_PROPERTY].push(disconnectedCallback)
  }
}
