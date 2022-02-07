import {
  ATTRIBUTE,
  C1_PROPERTY,
  IDENTIFIER_PROPERTY,
  SELECTOR_PROPERTY,
} from "../const.js"
import { _qsa } from "./querySelector.js"

/** @param { Element } host */
export const _refs = (host) => {
  const qsa = _qsa(host)

  /** @param { string } name */
  return (name, root = host) =>
    qsa(
      `[${ATTRIBUTE}-ref~="${host[C1_PROPERTY][IDENTIFIER_PROPERTY]}.${name}"]`.toLowerCase(),
      root
    ).filter(
      (ref) => ref.closest(host[C1_PROPERTY][SELECTOR_PROPERTY]) === host
    )
}

/** @param { Element } host */
export const _ref = (host) => {
  const refs = _refs(host)

  /** @param { string } name */
  return (name, root = host) => refs(name, root)[0]
}
