import { _onDisconnect } from "./onDisconnect.js"

/** @param { HTMLElement } host */
export const _on = (host) => {
  const onDisconnect = _onDisconnect(host)
  /**
   * @param { HTMLElement } element
   * @param { string } type
   * @param { EventListener } listener
   * @param { boolean | AddEventListenerOptions } [options]
   */
  return (element, type, listener, options) => {
    const off = () => element.removeEventListener(type, listener, options)
    element.addEventListener(type, listener, options)
    onDisconnect(off)
    return off
  }
}
