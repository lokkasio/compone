import {
  C1_PROPERTY,
  ON_DISCONNECT_PROPERTY,
  IDENTIFIER_PROPERTY,
  SELECTOR_PROPERTY,
} from "./const.js"

/**
 * @template { unknown } API public api
 * @param { Element } element
 * @param { (element: Element) => API } connectedCb
 * @param { String } identifier
 * @param { String } selector
 * @returns { Promise<API> }
 */
export const connect = (element, connectedCb, identifier, selector) =>
  (element[C1_PROPERTY] ??= Object.assign(
    new Promise((resolve) => setTimeout(() => resolve(connectedCb(element)))),
    {
      [IDENTIFIER_PROPERTY]: identifier,
      [SELECTOR_PROPERTY]: selector,
    }
  )).catch((error) => console.error(error, element))

/** @param { Element } element */
export const disconnect = (element) => {
  element[C1_PROPERTY]?.[ON_DISCONNECT_PROPERTY]?.forEach((disconnectedCb) =>
    disconnectedCb()
  )
  delete element[C1_PROPERTY]
}
