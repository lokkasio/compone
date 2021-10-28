import { ATTRIBUTE, SELECTOR_PROPERTY, IDENTIFIER_PROPERTY } from "../const.js"
import { _qs, _qsa } from "./querySelector.js"

/** @param { Element } host */
const refSelector =
  (host) =>
  /** @param { string } name */
  (name) =>
    `[${ATTRIBUTE}-ref~="${host[IDENTIFIER_PROPERTY]}.${name}"]`.toLowerCase()

/**
 * @param { Element } host
 * @param { Element } ref
 */
const closestRef = (host, ref) =>
  ref.closest(host[SELECTOR_PROPERTY]) === host ? ref : undefined

/** @param { Element } host */
export const _refs = (host) => {
  const qsa = _qsa(host)
  const selector = refSelector(host)

  /** @param { string } name */
  return (name, root = host) =>
    qsa(selector(name), root).filter((ref) => closestRef(host, ref))
}

/** @param { Element } host */
export const _ref = (host) => {
  const qs = _qs(host)
  const selector = refSelector(host)

  /** @param { string } name */
  return (name, root = host) => closestRef(host, qs(selector(name), root))
}
