import { API_PROPERTY } from "./const.js"

/**
 * @param {HTMLElement} element
 * @param { string | symbol } [apiProp]
 * @returns { Promise<unknown> }
 */
export const whenDefined = (element, apiProp = API_PROPERTY) => {
  const defineProperty = (descriptor) =>
    Object.defineProperty(
      element,
      apiProp,
      Object.assign({ configurable: true }, descriptor)
    )
  const promise = new Promise((resolve) => {
    if (element[apiProp]) {
      resolve(element[apiProp])
    } else {
      defineProperty({
        set(value) {
          defineProperty({ value })
          resolve(value)
        },
      })
    }
  })
  return promise
}
