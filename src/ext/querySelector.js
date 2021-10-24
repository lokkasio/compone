/** @param { HTMLElement } host */
export const _qs =
  (host) =>
  /** @param { string} selector */
  (selector, root = host) =>
    root.querySelector(selector)

/** @param {HTMLElement} host */
export const _qsa =
  (host) =>
  /** @param {string} selector */
  (selector, root = host) =>
    Array.from(root.querySelectorAll(selector))
