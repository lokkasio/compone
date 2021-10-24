import { API_PROPERTY, ON_DISCONNECT_PROPERTY } from "./const.js"

/**
 * @param { HTMLElement } element
 * @param { (element: HTMLElement) => unknown } connectedCb
 * @param { string | symbol } [apiProp]
 */
export const connect = (element, connectedCb, apiProp = API_PROPERTY) => {
  element[ON_DISCONNECT_PROPERTY] ??= []
  element[apiProp] ??= Promise.resolve(connectedCb(element))
}

/**
 * @param { HTMLElement } element
 * @param { string | symbol } [apiProp]
 */
export const disconnect = (element, apiProp = API_PROPERTY) => {
  element[ON_DISCONNECT_PROPERTY]?.forEach((disconnectedCb) => disconnectedCb())
  delete element[ON_DISCONNECT_PROPERTY]
  delete element[apiProp]
}
