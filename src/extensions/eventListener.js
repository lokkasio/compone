import { _onDisconnect } from "./onDisconnect.js"

/** @param { Element } host */
export const _on = (host) => {
  const onDisconnect = _onDisconnect(host)
  /**
   * @param { Element } element
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
