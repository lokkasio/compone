import { ATTRIBUTE } from "../const.js"
import { _qsa } from "./querySelector.js"

/** @param { HTMLElement } host */
export const _refs = (host) => {
  const identifier = host.getAttribute(ATTRIBUTE)
  const qsa = _qsa(host)

  /** @param { string } name */
  return (name, root = host) =>
    qsa(
      `[${ATTRIBUTE}-ref~="${identifier}.${name}"]`.toLowerCase(),
      root
    ).filter((ref) => ref.closest(`[${ATTRIBUTE}="${identifier}"]`) === host)
}

/** @param { HTMLElement } host */
export const _ref = (host) => {
  const refs = _refs(host)
  /** @param { string } name */
  return (name, root = host) => refs(name, root)[0]
}
