import { ON_DISCONNECT_PROPERTY } from "../const.js"

/** @param { HTMLElement } host */
export const _onDisconnect =
  (host) =>
  /** @param { () => void } disconnectedCallback */
  (disconnectedCallback) => {
    host[ON_DISCONNECT_PROPERTY]?.push(disconnectedCallback)
  }
