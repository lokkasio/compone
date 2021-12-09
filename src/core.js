import { C1_PROPERTY, ON_DISCONNECT_PROPERTY } from "./const.js"

/**
 * @template { unknown } API public api
 * @param { Element } element
 * @param { (element: Element) => API } connectedCb
 * @returns { Promise<API> }
 */
export const connect = (element, connectedCb) =>
  (element[C1_PROPERTY] ??= Object.assign(
    new Promise((resolve) => setTimeout(() => resolve(connectedCb(element)))),
    connectedCb
  ))

/** @param { Element } element */
export const disconnect = (element) => {
  element[C1_PROPERTY]?.[ON_DISCONNECT_PROPERTY]?.forEach((disconnectedCb) =>
    disconnectedCb()
  )
  delete element[C1_PROPERTY]
}
