import { ATTRIBUTE, C1_PROPERTY, IDENTIFIER_PROPERTY } from "../const.js"
import { _qsaClosest } from "./querySelector.js"

/** @param { Element } host */
export const _refs = (host) => {
  const identifier = host[C1_PROPERTY][IDENTIFIER_PROPERTY]
  const qsaClosest = _qsaClosest(host)

  /** @param { string } name */
  return (name) => qsaClosest(`[${ATTRIBUTE}-ref~="${identifier}.${name}"]`)
}

/** @param { Element } host */
export const _ref = (host) => {
  const refs = _refs(host)

  /** @param { string } name */
  return (name, root = host) => refs(name, root)[0]
}
