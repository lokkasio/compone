import { C1_PROPERTY, IDENTIFIER_PROPERTY } from "../const.js"

/** @param { Element } host */
export const _closest = (host) => {
  const identifier = host[C1_PROPERTY][IDENTIFIER_PROPERTY]

  /** @param { Element } element */
  return (element) => {
    while ((element = element.parentElement)) {
      if (element?.[C1_PROPERTY][IDENTIFIER_PROPERTY] === identifier) {
        return element === host && element
      }
    }
  }
}

/** @param { Element } host */
export const _qs =
  (host) =>
  /** @param { string} selector */
  (selector, root = host) =>
    root.querySelector(selector)

/** @param { Element } host */
export const _qsClosest = (host) => {
  const closest = _closest(host)

  /** @param { string} selector */
  return (selector, root = host) => {
    return closest(root.querySelector(selector)) || null
  }
}

/** @param { Element } host */
export const _qsa =
  (host) =>
  /** @param { string } selector */
  (selector, root = host) =>
    Array.from(root.querySelectorAll(selector))

/** @param { Element } host */
export const _qsaClosest = (host) => {
  const qsa = _qsa(host)
  const closest = _closest(host)

  /** @param { string } selector */
  return (selector, root = host) => qsa(selector, root).filter(closest)
}
