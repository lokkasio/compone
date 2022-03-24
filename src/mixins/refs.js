import { ATTRIBUTE, C1_PROPERTY, IDENTIFIER_PROPERTY } from "../const.js"
import { _qsaClosest } from "./querySelector.js"

/** @param { Element } host */
export const _refs = (host) => {
  const identifier = host[C1_PROPERTY][IDENTIFIER_PROPERTY]
  const attrName = `${ATTRIBUTE}-${identifier}-ref`

  return _qsaClosest(host)(`[${attrName}]`).reduce((refs, element) => {
    const refName = element.getAttribute(attrName)
    refs[refName] ??= []
    refs[refName].push(element)
    return refs
  }, {})
}
