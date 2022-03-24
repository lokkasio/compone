import { ATTRIBUTE } from "./const.js"
import { connect, disconnect } from "./core.js"
import { observe } from "./observer.js"

const deferred = {}
const registry = {}

/** @param { string } str */
const toLowerCase = (str) => str && str.toLowerCase()

/** @param { Element } element */
const mount = (element) => {
  const identifier = toLowerCase(element.getAttribute(ATTRIBUTE))
  if (identifier) {
    if (registry[identifier]) {
      connect(element, registry[identifier], identifier)
    } else {
      if (!deferred[identifier]) {
        deferred[identifier] = []
      }
      deferred[identifier].push(element)
    }
  }
}

/**
 * @template API public api
 * @param { string } identifier
 * @param { (host: Element) => API } connectedCb
 */
export const define = (identifier, connectedCb) => {
  identifier = toLowerCase(identifier)
  if (identifier && !registry[identifier]) {
    registry[identifier] = connectedCb
    if (deferred[identifier]) {
      deferred[identifier].forEach(mount)
      delete deferred[identifier]
    }
  }
}

if (typeof document !== "undefined") {
  observe(mount, disconnect)
}
