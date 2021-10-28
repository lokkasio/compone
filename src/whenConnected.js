import { API_PROPERTY } from "./const.js"

/**
 * @param {Element} element
 * @param { string | symbol } [apiProp]
 * @returns { Promise<unknown> }
 */
export const whenConnected = (element, apiProp = API_PROPERTY) => {
  const defineProperty = (descriptor) =>
    Object.defineProperty(
      element,
      apiProp,
      Object.assign({ configurable: true }, descriptor)
    )
  return new Promise((resolve) => {
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
}
