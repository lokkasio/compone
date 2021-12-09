import { C1_PROPERTY } from "./const.js"

/**
 * @param { Element } element
 * @returns { Promise<unknown> }
 */
export const whenConnected = (element) => {
  const defineProperty = (descriptor) =>
    Object.defineProperty(
      element,
      C1_PROPERTY,
      Object.assign({ configurable: true }, descriptor)
    )
  return new Promise((resolve) => {
    if (element[C1_PROPERTY]) {
      resolve(element[C1_PROPERTY])
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
