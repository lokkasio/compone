import { ATTRIBUTE } from "./const.js"
import { connect, disconnect } from "./core.js"
import { observe } from "./observer.js"

const deferred = {}
const registry = {}

const toLowerCase = (str) => str && str.toLowerCase()

/** @param { HTMLElement } element */
const mount = (element) => {
  const name = toLowerCase(element.getAttribute(ATTRIBUTE))
  if (name) {
    if (registry[name]) {
      connect(element, registry[name])
    } else {
      if (!deferred[name]) {
        deferred[name] = []
      }
      deferred[name].push(element)
    }
  }
}

/**
 * @param { string } name
 * @param { (host: HTMLElement) => unknown } connectedCb
 */
export const define = (name, connectedCb) => {
  name = toLowerCase(name)
  if (name && !registry[name]) {
    registry[name] = connectedCb
    if (deferred[name]) {
      deferred[name].forEach(mount)
      delete deferred[name]
    }
  }
}

observe(mount, disconnect)
